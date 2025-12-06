import type { Awaitable, DisTune, PluginType, Song } from "..";

/**
 * DisTune Plugin
 */
export abstract class Plugin {
  /**
   * Type of the plugin
   */
  abstract readonly type: PluginType;
  /**
   * DisTune
   */
  distune!: DisTune;
  init(distune: DisTune) {
    this.distune = distune;
  }
  /**
   * Get related songs from a supported url.
   * @param song - Input song
   */
  abstract getRelatedSongs(song: Song): Awaitable<Song[]>;
}
