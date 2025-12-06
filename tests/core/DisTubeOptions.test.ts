import { expect, test } from "vitest";
import { Options, defaultOptions } from "@";

test("Default DisTuneOptions", () => {
  expect(new Options({})).toEqual({
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: true,
    emitNewSongOnly: false,
    ffmpeg: {
      args: {
        global: {},
        input: {},
        output: {},
      },
      path: "ffmpeg",
    },
    joinNewVoiceChannel: true,
    nsfw: false,
    plugins: [],
    savePreviousSongs: true,
  });
});

const typeOfOption = (option: string) => {
  switch (option) {
    case "plugins":
      return "Array<Plugin>";
    default:
      return typeof defaultOptions[option];
  }
};

test("Validate DisTuneOptions", () => {
  expect(() => {
    new Options(<any>NaN);
  }).toThrow("Expected 'object' for 'DisTuneOptions', but got NaN");
  for (const option of Object.keys(defaultOptions)) {
    const options = {};
    options[option] = NaN;
    expect(() => {
      new Options(options);
    }).toThrow(`Expected '${typeOfOption(option)}' for 'DisTuneOptions.${option}', but got NaN`);
  }
  expect(() => {
    new Options({ invalidKey: "an invalid key" } as any);
  }).toThrow("'invalidKey' does not need to be provided in DisTuneOptions");
});
