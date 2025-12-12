# DisTune

## 1. FFMPEG_NOT_INSTALLED

### Reason

- FFmpeg is not installed

### Solution

- Install FFmpeg on: [Windows](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/) - [Linux (Ubuntu, Mint,...)](https://www.tecmint.com/install-ffmpeg-in-linux/)
  > Download FFmpeg from [this repo](https://github.com/BtbN/FFmpeg-Builds/releases) if the download links are not available
- If you want to run FFmpeg from a custom path, or `ffmpeg-static`.path, e.t.c., you can use [`ffmpeg.path`](https://DisTune.js.org/types/DisTuneOptions.html) option.

## 2.1 The song ends instantly without any errors<br/>3.2 Error: write EPIPE

### Reason

- This is due to FFmpeg error.

### Solution:

- Check the FFmpeg log to check why it happens with [`ffmpegDebug`](https://DisTune.js.org/classes/DisTune.html#ffmpegDebug) event

```ts
import { Events } from "DisTune";
DisTune.on(Events.FFMPEG_DEBUG, console.log);
```

## 3.1 Error: Cannot find module '@discordjs/opus'<br/>4.2 RangeError: Source is too large<br/>4.3 RangeError: offset is out of bounds

### Reason

- `@discordjs/opus` package is not installed, or you installed `node-opus` or `opusscript` package (which is not stable)

### Solution

- Install `@discordjs/opus` package. Uninstall `node-opus`, `opusscript` if installed

```sh
npm uninstall opusscript node-opus
npm install @discordjs/opus
```

## 4. Error: VOICE_CONNECTION_TIMEOUT

### Reason

- It is due to your hosting/VPS network connection

### Solution

1. Try to join the voice channel with `<DisTune>.voices.join(voiceChannel)` before using `DisTune.play()`.\
   You can retry if this function throws the above error.

2. Use a better network service (like the above VPS)

## 5.1 My bot plays a random song after finishing all the queue<br/>6.2 How to turn off autoplay<br/>6.3 How to change queue's default properties

### Reason

- Autoplay is on by default.

### Solution

- To turn it on/off by a command, use [toggleAutoplay()](https://DisTune.js.org/#/docs/DisTune/main/class/DisTune?scrollTo=toggleAutoplay).
- To change the queue's default setting, use [initQueue](https://DisTune.js.org/#/docs/DisTune/main/class/DisTune?scrollTo=e-initQueue) event.
