import {
  Action,
  ActionPanel,
  Content,
  Icons,
  Inline,
} from "@project-gauntlet/api/components";
import React, { ReactNode } from "react";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import * as UnicodeEmoji from "unicode-emoji";

// @ts-expect-error gauntlet uses deno and not node
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const denoCore: DenoCore = Deno[Deno.internal].core;

export default function EmojiPicker(props: {
  text: string;
}): ReactNode | undefined {
  const text = props.text.trim();

  if (text.length < 3) {
    return undefined;
  }

  const emoji = UnicodeEmoji.getEmojis().find((emoji) =>
    emoji.keywords.includes(text),
  );
  if (!emoji) {
    return undefined;
  }

  return (
    <Inline
      actions={
        <ActionPanel>
          <Action
            label={`Copy ${emoji.emoji} to clipboard`}
            onAction={async () => {
              console.log(emoji.emoji);
              await Clipboard.writeText(emoji.emoji);
              showHud(`${emoji.emoji} copied to clipboard`);
            }}
          />
        </ActionPanel>
      }
    >
      <Inline.Left>
        <Content.H3>{text}</Content.H3>
      </Inline.Left>
      <Inline.Separator icon={Icons.ArrowRight} />
      <Inline.Right>
        <Content.Paragraph>{emoji.emoji}</Content.Paragraph>
      </Inline.Right>
    </Inline>
  );
}
