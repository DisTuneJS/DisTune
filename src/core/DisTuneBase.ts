import type { Client } from "discord.js";
import type {
  DisTune,
  DisTuneEvents,
  DisTuneHandler,
  DisTunePlugin,
  DisTuneVoiceManager,
  Options,
  Queue,
  QueueManager,
  Song,
} from "..";

export abstract class DisTuneBase {
  distune: DisTune;
  constructor(distune: DisTune) {
    /**
     * DisTune
     */
    this.distune = distune;
  }
  /**
   * Emit the {@link DisTune} of this base
   * @param eventName - Event name
   * @param args      - arguments
   */
  emit(eventName: keyof DisTuneEvents, ...args: any): boolean {
    return this.distune.emit(eventName, ...args);
  }
  /**
   * Emit error event
   * @param error   - error
   * @param queue   - The queue encountered the error
   * @param song    - The playing song when encountered the error
   */
  emitError(error: Error, queue: Queue, song?: Song) {
    this.distune.emitError(error, queue, song);
  }
  /**
   * Emit debug event
   * @param message - debug message
   */
  debug(message: string) {
    this.distune.debug(message);
  }
  /**
   * The queue manager
   */
  get queues(): QueueManager {
    return this.distune.queues;
  }
  /**
   * The voice manager
   */
  get voices(): DisTuneVoiceManager {
    return this.distune.voices;
  }
  /**
   * Discord.js client
   */
  get client(): Client {
    return this.distune.client;
  }
  /**
   * DisTune options
   */
  get options(): Options {
    return this.distune.options;
  }
  /**
   * DisTune handler
   */
  get handler(): DisTuneHandler {
    return this.distune.handler;
  }
  /**
   * DisTune plugins
   */
  get plugins(): DisTunePlugin[] {
    return this.distune.plugins;
  }
}
