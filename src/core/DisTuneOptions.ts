import { DisTuneError, checkInvalidKey, defaultOptions } from "..";
import type { DisTuneOptions, DisTunePlugin, FFmpegArgs, FFmpegOptions, Filters } from "..";

export class Options {
  plugins: DisTunePlugin[];
  emitNewSongOnly: boolean;
  savePreviousSongs: boolean;
  customFilters?: Filters;
  nsfw: boolean;
  emitAddSongWhenCreatingQueue: boolean;
  emitAddListWhenCreatingQueue: boolean;
  joinNewVoiceChannel: boolean;
  ffmpeg: FFmpegOptions;
  constructor(options: DisTuneOptions) {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new DisTuneError("INVALID_TYPE", "object", options, "DisTuneOptions");
    }
    const opts = { ...defaultOptions, ...options };
    this.plugins = opts.plugins;
    this.emitNewSongOnly = opts.emitNewSongOnly;
    this.savePreviousSongs = opts.savePreviousSongs;
    this.customFilters = opts.customFilters;
    this.nsfw = opts.nsfw;
    this.emitAddSongWhenCreatingQueue = opts.emitAddSongWhenCreatingQueue;
    this.emitAddListWhenCreatingQueue = opts.emitAddListWhenCreatingQueue;
    this.joinNewVoiceChannel = opts.joinNewVoiceChannel;
    this.ffmpeg = this.#ffmpegOption(options);
    checkInvalidKey(opts, this, "DisTuneOptions");
    this.#validateOptions();
  }

  #validateOptions(options = this) {
    const booleanOptions = new Set([
      "emitNewSongOnly",
      "savePreviousSongs",
      "joinNewVoiceChannel",
      "nsfw",
      "emitAddSongWhenCreatingQueue",
      "emitAddListWhenCreatingQueue",
    ]);
    const numberOptions = new Set();
    const stringOptions = new Set();
    const objectOptions = new Set(["customFilters", "ffmpeg"]);
    const optionalOptions = new Set(["customFilters"]);

    for (const [key, value] of Object.entries(options)) {
      if (value === undefined && optionalOptions.has(key)) continue;
      if (key === "plugins" && !Array.isArray(value)) {
        throw new DisTuneError("INVALID_TYPE", "Array<Plugin>", value, `DisTuneOptions.${key}`);
      } else if (booleanOptions.has(key)) {
        if (typeof value !== "boolean") {
          throw new DisTuneError("INVALID_TYPE", "boolean", value, `DisTuneOptions.${key}`);
        }
      } else if (numberOptions.has(key)) {
        if (typeof value !== "number" || isNaN(value)) {
          throw new DisTuneError("INVALID_TYPE", "number", value, `DisTuneOptions.${key}`);
        }
      } else if (stringOptions.has(key)) {
        if (typeof value !== "string") {
          throw new DisTuneError("INVALID_TYPE", "string", value, `DisTuneOptions.${key}`);
        }
      } else if (objectOptions.has(key)) {
        if (typeof value !== "object" || Array.isArray(value)) {
          throw new DisTuneError("INVALID_TYPE", "object", value, `DisTuneOptions.${key}`);
        }
      }
    }
  }

  #ffmpegOption(opts: DisTuneOptions) {
    const args: FFmpegArgs = { global: {}, input: {}, output: {} };
    if (opts.ffmpeg?.args) {
      if (opts.ffmpeg.args.global) args.global = opts.ffmpeg.args.global;
      if (opts.ffmpeg.args.input) args.input = opts.ffmpeg.args.input;
      if (opts.ffmpeg.args.output) args.output = opts.ffmpeg.args.output;
    }
    const path = opts.ffmpeg?.path ?? "ffmpeg";
    if (typeof path !== "string") {
      throw new DisTuneError("INVALID_TYPE", "string", path, "DisTuneOptions.ffmpeg.path");
    }
    for (const [key, value] of Object.entries(args)) {
      if (typeof value !== "object" || Array.isArray(value)) {
        throw new DisTuneError("INVALID_TYPE", "object", value, `DisTuneOptions.ffmpeg.${key}`);
      }
      for (const [k, v] of Object.entries(value)) {
        if (
          typeof v !== "string" &&
          typeof v !== "number" &&
          typeof v !== "boolean" &&
          !Array.isArray(v) &&
          v !== null &&
          v !== undefined
        ) {
          throw new DisTuneError(
            "INVALID_TYPE",
            ["string", "number", "boolean", "Array<string | null | undefined>", "null", "undefined"],
            v,
            `DisTuneOptions.ffmpeg.${key}.${k}`,
          );
        }
      }
    }
    return { path, args };
  }
}
