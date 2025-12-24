# DisTune FAQ

## Why do my searches not return any results?

You might not have installed any extractor plugins that support searching.\
Please install an extractor plugin that supports searching, you can check the [Projects Hub](./Projects-Hub.md#official-plugins) for available plugins.

## Why is there no plugin for [x site]?

There could be a few reasons for this.

YouTube for example is a pretty complex and risky platform to support. Ignoring the legal issues, most of the JavaScript libraries for YouTube extraction are currently broken.\
YouTube can still be used using direct links though, using the [@distune/plugin-yt-dlp](https://www.npmjs.com/package/@distune/plugin-yt-dlp) plugin.

Spotify is also difficult to support, as even though it does have an official playback SDK, it requires a premium account to use it and only one device/server can play at a time.\
And it is very much against their TOS \:)

Some sites however are relatively simple to support, but no one has created a plugin for it yet.\
You can either create one yourself, or request one using the [issues feature on Github](https://github.com/DisTuneJS/plugins/issues).

## FFMPEG_NOT_INSTALLED

### Reason

- FFmpeg is not installed

### Solution

- Install FFmpeg on: [Windows](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/) - [Linux (Ubuntu, Mint,...)](https://www.tecmint.com/install-ffmpeg-in-linux/)
  > Download FFmpeg from [this repo](https://github.com/BtbN/FFmpeg-Builds/releases) if the download links are not available
- If you want to run FFmpeg from a custom path, or `ffmpeg-static`.path, e.t.c., you can use [`ffmpeg.path`](https://DisTune.js.org/types/DisTuneOptions.html) option.

## The song ends instantly without any errors

### Reason

- This is likely due to an error with FFmpeg.

### Solution:

- Check the FFmpeg log to check why it happens with [`ffmpegDebug`](https://DisTune.js.org/classes/DisTune.html#ffmpegDebug) event

```ts
import { Events } from "DisTune";
DisTune.on(Events.FFMPEG_DEBUG, console.log);
```

## Error: Cannot find module '@discordjs/opus'

### Reason

- `@discordjs/opus` package is not installed, or you installed `node-opus` or `opusscript` package (which is not stable)

### Solution

- Install `@discordjs/opus` package. Uninstall `node-opus`, `opusscript` if installed

```sh
npm uninstall opusscript node-opus
npm install @discordjs/opus
```
