import { Grid } from "@project-gauntlet/api/components";
import React, { ReactNode, useState } from "react";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import {
  GroupedBy,
  BaseEmoji,
  getEmojis,
  getEmojisGroupedBy,
} from "unicode-emoji";

// @ts-expect-error gauntlet uses deno and not node
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const denoCore: DenoCore = Deno[Deno.internal].core;

export default function EmojiPicker(): ReactNode | undefined {
  const [searchText, setSearchText] = useState<string | undefined>("");

  let emojiList: BaseEmoji[] | Record<GroupedBy, BaseEmoji[]>;
  let isCategory = null;
  if (searchText) {
    emojiList = getEmojis().filter((emoji) =>
      emoji.keywords.some((keyword) => keyword.includes(searchText)),
    );
    isCategory = false;
  } else {
    emojiList = getEmojisGroupedBy("category");
    isCategory = true;
  }

  return (
    <Grid>
      <Grid.SearchBar
        placeholder={"Search for an emoji"}
        value={searchText}
        onChange={setSearchText}
      />
      {isCategory
        ? Object.entries(emojiList).map(([category, emojis]) => (
            <Grid.Section key={category} title={category}>
              {emojis.map((emoji: BaseEmoji) => (
                <Grid.Item
                  key={emoji.emoji}
                  title={emoji.emoji}
                  subtitle={emoji.keywords.join(", ")}
                  onClick={async () => {
                    console.log(emoji);
                    await Clipboard.writeText(emoji.emoji);
                    showHud(`${emoji.emoji} copied to clipboard`);
                  }}
                />
              ))}
            </Grid.Section>
          ))
        : (emojiList as BaseEmoji[]).map((emoji: BaseEmoji) => (
            <Grid.Item
              key={emoji.emoji}
              title={emoji.emoji}
              subtitle={emoji.keywords.join(", ")}
              onClick={async () => {
                console.log(emoji);
                await Clipboard.writeText(emoji.emoji);
                showHud(`${emoji.emoji} copied to clipboard`);
              }}
            />
          ))}
    </Grid>
  );
}
