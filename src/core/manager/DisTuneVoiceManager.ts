import { GuildIdManager } from ".";
import { DisTuneVoice } from "../DisTuneVoice";
import { DisTuneError, resolveGuildId } from "../..";
import { VoiceConnectionStatus, getVoiceConnection } from "@discordjs/voice";
import type { GuildIdResolvable } from "../..";
import type { VoiceBasedChannel } from "discord.js";

/**
 * Manages voice connections
 */
export class DisTuneVoiceManager extends GuildIdManager<DisTuneVoice> {
  /**
   * Create a {@link DisTuneVoice} instance
   * @param channel - A voice channel to join
   */
  create(channel: VoiceBasedChannel): DisTuneVoice {
    const existing = this.get(channel.guildId);
    if (existing) {
      existing.channel = channel;
      return existing;
    }
    if (
      getVoiceConnection(resolveGuildId(channel), this.client.user?.id) ||
      getVoiceConnection(resolveGuildId(channel))
    ) {
      throw new DisTuneError("VOICE_ALREADY_CREATED");
    }
    return new DisTuneVoice(this, channel);
  }
  /**
   * Join a voice channel and wait until the connection is ready
   * @param channel - A voice channel to join
   */
  join(channel: VoiceBasedChannel): Promise<DisTuneVoice> {
    const existing = this.get(channel.guildId);
    if (existing) return existing.join(channel);
    return this.create(channel).join();
  }
  /**
   * Leave the connected voice channel in a guild
   * @param guild - Queue Resolvable
   */
  leave(guild: GuildIdResolvable) {
    const voice = this.get(guild);
    if (voice) {
      voice.leave();
    } else {
      const connection =
        getVoiceConnection(resolveGuildId(guild), this.client.user?.id) ?? getVoiceConnection(resolveGuildId(guild));
      if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
        connection.destroy();
      }
    }
  }
}
