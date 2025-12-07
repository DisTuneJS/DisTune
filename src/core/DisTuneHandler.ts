import { DisTuneBase } from ".";
import { request } from "undici";
import { Album, DisTuneError, Playlist, PluginType, Song, isURL } from "..";
import type { DisTunePlugin, ResolveOptions } from "..";

const REDIRECT_CODES = new Set([301, 302, 303, 307, 308]);

/**
 * DisTune's Handler
 */
export class DisTuneHandler extends DisTuneBase {
  resolve<T = unknown>(song: Song<T>, options?: Omit<ResolveOptions, "metadata">): Promise<Song<T>>;
  resolve<T = unknown>(song: Playlist<T>, options?: Omit<ResolveOptions, "metadata">): Promise<Playlist<T>>;
  resolve<T = unknown>(song: Album<T>, options?: Omit<ResolveOptions, "metadata">): Promise<Album<T>>;
  resolve<T = unknown>(song: string, options?: ResolveOptions<T>): Promise<Song<T> | Playlist<T> | Album<T>>;
  resolve<T = unknown>(song: Song, options: ResolveOptions<T>): Promise<Song<T>>;
  resolve<T = unknown>(song: Playlist, options: ResolveOptions<T>): Promise<Playlist<T>>;
  resolve<T = unknown>(song: Album, options: ResolveOptions<T>): Promise<Album<T>>;
  resolve(song: string | Song | Playlist | Album, options?: ResolveOptions): Promise<Song | Playlist | Album>;
  /**
   * Resolve a url or a supported object to a {@link Song}, {@link Playlist}, or {@link Album}
   * @throws {@link DisTuneError}
   * @param input   - Resolvable input
   * @param options - Optional options
   * @returns Resolved
   */
  async resolve(
    input: string | Song | Playlist | Album,
    options: ResolveOptions = {},
  ): Promise<Song | Playlist | Album> {
    if (input instanceof Song || input instanceof Playlist || input instanceof Album) {
      if ("metadata" in options) input.metadata = options.metadata;
      if ("member" in options) input.member = options.member;
      return input;
    }
    if (typeof input === "string") {
      if (isURL(input)) {
        const plugin =
          (await this._getPluginFromURL(input)) ||
          (await this._getPluginFromURL((input = await this.followRedirectLink(input))));
        if (!plugin) throw new DisTuneError("NOT_SUPPORTED_URL");
        this.debug(`[${plugin.constructor.name}] Resolving from url: ${input}`);
        return plugin.resolve(input, options);
      }
      try {
        const song = await this.#searchSong(input, options);
        if (song) return song;
      } catch {
        throw new DisTuneError("NO_RESULT", input);
      }
    }
    throw new DisTuneError("CANNOT_RESOLVE_SONG", input);
  }

  async _getPluginFromURL(url: string): Promise<DisTunePlugin | null> {
    for (const plugin of this.plugins) if (await plugin.validate(url)) return plugin;
    return null;
  }

  _getPluginFromSong(song: Song): Promise<DisTunePlugin | null>;
  _getPluginFromSong<T extends PluginType>(
    song: Song,
    types: T[],
    validate?: boolean,
  ): Promise<(DisTunePlugin & { type: T }) | null>;
  async _getPluginFromSong<T extends PluginType>(
    song: Song,
    types?: T[],
    validate = true,
  ): Promise<(DisTunePlugin & { type: T }) | null> {
    if (!types || types.includes(<T>song.plugin?.type)) return song.plugin as DisTunePlugin & { type: T };
    if (!song.url) return null;
    for (const plugin of this.plugins) {
      if ((!types || types.includes(<T>plugin?.type)) && (!validate || (await plugin.validate(song.url)))) {
        return plugin as DisTunePlugin & { type: T };
      }
    }
    return null;
  }

  async #searchSong(query: string, options: ResolveOptions = {}, getStreamURL = false): Promise<Song | null> {
    const plugins = this.plugins.filter(p => p.type === PluginType.EXTRACTOR);
    if (!plugins.length) throw new DisTuneError("NO_EXTRACTOR_PLUGIN");
    for (const plugin of plugins) {
      this.debug(`[${plugin.constructor.name}] Searching for song: ${query}`);
      const result = await plugin.searchSong(query, options);
      if (result) {
        if (getStreamURL && result.stream.playFromSource) result.stream.url = await plugin.getStreamURL(result);
        return result;
      }
    }
    return null;
  }

  /**
   * Get {@link Song}'s stream info and attach it to the song.
   * @param song - A Song
   */
  async attachStreamInfo(song: Song) {
    if (song.stream.playFromSource) {
      if (song.stream.url) return;
      this.debug(`[DisTuneHandler] Getting stream info: ${song}`);
      const plugin = await this._getPluginFromSong(song, [PluginType.EXTRACTOR, PluginType.PLAYABLE_EXTRACTOR]);
      if (!plugin) throw new DisTuneError("NOT_SUPPORTED_SONG", song.toString());
      this.debug(`[${plugin.constructor.name}] Getting stream URL: ${song}`);
      song.stream.url = await plugin.getStreamURL(song);
      if (!song.stream.url) throw new DisTuneError("CANNOT_GET_STREAM_URL", song.toString());
    } else {
      if (song.stream.song?.stream?.playFromSource && song.stream.song.stream.url) return;
      this.debug(`[DisTuneHandler] Getting stream info: ${song}`);
      const plugin = await this._getPluginFromSong(song, [PluginType.INFO_EXTRACTOR]);
      if (!plugin) throw new DisTuneError("NOT_SUPPORTED_SONG", song.toString());
      this.debug(`[${plugin.constructor.name}] Creating search query for: ${song}`);
      const query = await plugin.createSearchQuery(song);
      if (!query) throw new DisTuneError("CANNOT_GET_SEARCH_QUERY", song.toString());
      const altSong = await this.#searchSong(query, { metadata: song.metadata, member: song.member }, true);
      if (!altSong || !altSong.stream.playFromSource) throw new DisTuneError("NO_RESULT", query || song.toString());
      song.stream.song = altSong;
    }
  }

  async followRedirectLink(url: string, maxRedirect = 5): Promise<string> {
    if (maxRedirect === 0) return url;

    const res = await request(url, {
      method: "HEAD",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/129.0.0.0 Safari/537.3",
      },
    });

    if (REDIRECT_CODES.has(res.statusCode ?? 200)) {
      let location = res.headers.location;
      if (typeof location !== "string") location = location?.[0] ?? url;
      return this.followRedirectLink(location, --maxRedirect);
    }

    return url;
  }
}
