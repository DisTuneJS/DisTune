import { DisTuneError, formatDuration, isMemberInstance } from "..";
import type { GuildMember } from "discord.js";
import type { AlbumInfo, ResolveOptions, Song } from "..";

/**
 * Class representing an album.
 */
export class Album<T = unknown> implements AlbumInfo {
  /**
   * Album source.
   */
  source: string;
  /**
   * Songs in the album.
   */
  songs: Song[];
  /**
   * Album ID.
   */
  id?: string;
  /**
   * Album name.
   */
  name?: string;
  /**
   * Album URL.
   */
  url?: string;
  /**
   * Album cover art / thumbnail.
   */
  thumbnail?: string;
  /**
   * Album artist name.
   */
  artist?: string;
  /**
   * Album artist ID.
   */
  artistId?: string;
  /**
   * Album release year.
   */
  year?: number;
  ageRestricted?: boolean;
  /**
   * Album genre.
   */
  genre?: string;
  #metadata!: T;
  #member?: GuildMember;
  /**
   * Create an Album
   * @param album     - Raw album info
   * @param options   - Optional data
   */
  constructor(album: AlbumInfo, { member, metadata }: ResolveOptions<T> = {}) {
    if (!Array.isArray(album.songs) || !album.songs.length) throw new DisTuneError("EMPTY_ALBUM");

    this.source = album.source.toLowerCase();
    this.songs = album.songs;
    this.name = album.name;
    this.id = album.id;
    this.url = album.url;
    this.thumbnail = album.thumbnail;
    this.artist = album.artist;
    this.artistId = album.artistId;
    this.year = album.year;
    this.genre = album.genre;
    this.member = member;
    this.songs.forEach(s => (s.album = this));
    this.metadata = metadata as T;
  }

  /**
   * Album duration in seconds.
   */
  get duration() {
    return this.songs.reduce((prev, next) => prev + next.duration, 0);
  }

  /**
   * Formatted duration string `hh:mm:ss`.
   */
  get formattedDuration() {
    return formatDuration(this.duration);
  }

  /**
   * User requested.
   */
  get member() {
    return this.#member;
  }

  set member(member: GuildMember | undefined) {
    if (!isMemberInstance(member)) return;
    this.#member = member;
    this.songs.forEach(s => (s.member = this.member));
  }

  /**
   * User requested.
   */
  get user() {
    return this.member?.user;
  }

  /**
   * Optional metadata that can be used to identify the album.
   */
  get metadata() {
    return this.#metadata;
  }

  set metadata(metadata: T) {
    this.#metadata = metadata;
    this.songs.forEach(s => (s.metadata = metadata));
  }

  toString() {
    return this.name || this.url || this.id || "Unknown Album";
  }
}
