import { Plugin } from ".";
import { PluginType } from "..";
import type { Album, Awaitable, Playlist, ResolveOptions, Song } from "..";

/**
 * This plugin only can extract the info from supported links, but not play song directly from its source
 */
export abstract class InfoExtractorPlugin extends Plugin {
  readonly type = PluginType.INFO_EXTRACTOR;
  /**
   * Check if the url is working with this plugin
   * @param url - Input url
   */
  abstract validate(url: string): Awaitable<boolean>;
  /**
   * Resolve the validated url to a {@link Song}, {@link Playlist}, or {@link Album}.
   * @param url     - URL
   * @param options - Optional options
   */
  abstract resolve<T>(url: string, options: ResolveOptions<T>): Awaitable<Song<T> | Playlist<T> | Album<T>>;

  /**
   * Create a search query to be used in {@link ExtractorPlugin#searchSong}
   * @param song - Input song
   */
  abstract createSearchQuery<T>(song: Song<T>): Awaitable<string>;
}
