<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/@distune/core" target="_blank"><img src="https://nodei.co/npm/@distune/core.png?downloads=true&downloadRank=true&stars=true"/></a>
  </p>
  <p>
    <a href="https://github.com/DisTuneJS/DisTune/actions" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/DisTuneJS/DisTune/test.yml?branch=main&label=Tests&logo=github&style=flat-square" /></a>
    <a href="https://nodejs.org/" target="_blank"><img alt="node-current" src="https://img.shields.io/node/v/distune?logo=node.js&logoColor=white&style=flat-square"/></a>
    <a href="https://discord.js.org/" target="_blank"><img alt="npm peer dependency version" src="https://img.shields.io/npm/dependency-version/@distune/core/peer/discord.js?label=discord.js&logo=discord&logoColor=white&style=flat-square"/></a>
    <a href="https://app.codecov.io/gh/DisTuneJS/DisTune" target="_blank"><img alt="Codecov branch" src="https://img.shields.io/codecov/c/github/DisTuneJS/DisTune/main?logo=codecov&logoColor=white&style=flat-square&token=WWDYRRSEQW"/></a>
    <br/>
    <a href="https://www.npmjs.com/package/@distune/core" target="_blank"><img alt="npm" src="https://img.shields.io/npm/dt/@distune/core?logo=npm&style=flat-square"/></a>
    <a href="https://github.com/DisTuneJS/DisTune/stargazers" target="_blank"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/DisTuneJS/DisTune?logo=github&logoColor=white&style=flat-square"/></a>
    <a href="https://discord.gg/feaDd9h" target="_blank"><img alt="Discord" src="https://img.shields.io/discord/732254550689316914?logo=discord&logoColor=white&style=flat-square"/></a>
  </p>
</div>

# DisTune

DisTune is a comprehensive Discord music bot library built for Discord.js, offering simplified music commands, effortless playback from diverse sources, and integrated audio filters.

DisTune is a fork of the DisTube project, created to continue its development and add new features.

## 🌟 Features

- **Easy Integration**: Built on top of [discord.js](https://discord.js.org) v14 and [@discordjs/voice](https://discord.js.org)
- **Voice Management**: Robust handling of voice connections and queue management
- **Audio Filters**: Built-in filters (bassboost, echo, karaoke, etc.) and custom filter support
- **Plugin System**: Extensible architecture supporting various music sources through plugins
- **Type Safety**: Written in TypeScript for better development experience
- **Active Community**: Join our [Discord Support Server](https://discord.gg/feaDd9h) for help

## 📋 Requirements

- Node.js 18.17.0 or higher
- [discord.js](https://discord.js.org) v14
- [@discordjs/voice](https://github.com/discordjs/voice)
- [@discordjs/opus](https://github.com/discordjs/opus)
- [FFmpeg](https://www.ffmpeg.org/download.html)

### 🔒 Encryption Libraries

> [!NOTE]
> You only need to install one of these libraries if your system does not support `aes-256-gcm` (verify by running `require('node:crypto').getCiphers().includes('aes-256-gcm')`).

- [@noble/ciphers](https://www.npmjs.com/package/@noble/ciphers)
- [sodium-native](https://www.npmjs.com/package/sodium-native)

## 🚀 Installation

```bash
npm install @distune/core @discordjs/voice @discordjs/opus
```

For FFmpeg installation:

- [Windows Guide](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/)
- [Linux Guide](https://www.tecmint.com/install-ffmpeg-in-linux/)

> [!NOTE]
> Alternative FFmpeg builds available [here](https://github.com/BtbN/FFmpeg-Builds/releases)

## 📚 Documentation

- [API Documentation](https://distune.js.org/) - Detailed API reference
- [DisTune Guide](https://github.com/DisTuneJS/DisTune/wiki) - Step-by-step guide for beginners
- [Plugin List](https://github.com/DisTuneJS/DisTune/wiki/Projects-Hub#plugins) - Available plugins for music sources

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](https://github.com/DisTuneJS/DisTune/blob/main/.github/CONTRIBUTING.md) before submitting a pull request.

## 📄 License

Licensed under [MIT License](https://github.com/DisTuneJS/DisTune/blob/main/LICENSE)
