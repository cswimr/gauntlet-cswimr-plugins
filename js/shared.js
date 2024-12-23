import { jsxs, jsx } from 'react/jsx-runtime';
import { Inline, ActionPanel, Action, Content, Icons, Grid } from '@project-gauntlet/api/components';
import { Clipboard, showHud } from '@project-gauntlet/api/helpers';
import { g as getEmojis, a as getEmojisGroupedBy } from './vendor.js';
import { useState } from 'react';

// @ts-expect-error gauntlet uses deno and not node
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Deno[Deno.internal].core;
function EmojiPicker$1(props) {
    const text = props.text.trim();
    if (text.length < 3) {
        return undefined;
    }
    const emoji = getEmojis().find((emoji) => emoji.keywords.includes(text));
    if (!emoji) {
        return undefined;
    }
    return (jsxs(Inline, { actions: jsx(ActionPanel, { children: jsx(Action, { label: `Copy ${emoji.emoji} to clipboard`, onAction: async () => {
                    console.log(emoji);
                    await Clipboard.writeText(emoji.emoji);
                    showHud(`${emoji.emoji} copied to clipboard`);
                } }) }), children: [jsx(Inline.Left, { children: jsx(Content.H3, { children: text }) }), jsx(Inline.Separator, { icon: Icons.ArrowRight }), jsx(Inline.Right, { children: jsx(Content.Paragraph, { children: emoji.emoji }) })] }));
}

// @ts-expect-error gauntlet uses deno and not node
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Deno[Deno.internal].core;
function EmojiPicker() {
    const [searchText, setSearchText] = useState("");
    let emojiList;
    let isCategory = null;
    if (searchText) {
        emojiList = getEmojis().filter((emoji) => emoji.keywords.some((keyword) => keyword.includes(searchText)));
        isCategory = false;
    }
    else {
        emojiList = getEmojisGroupedBy("category");
        isCategory = true;
    }
    return (jsxs(Grid, { children: [jsx(Grid.SearchBar, { placeholder: "Search for an emoji", value: searchText, onChange: setSearchText }), isCategory
                ? Object.entries(emojiList).map(([category, emojis]) => (jsx(Grid.Section, { title: category, children: emojis.map((emoji) => (jsx(Grid.Item, { title: emoji.emoji, subtitle: emoji.keywords.join(", "), onClick: async () => {
                            console.log(emoji);
                            await Clipboard.writeText(emoji.emoji);
                            showHud(`${emoji.emoji} copied to clipboard`);
                        } }, emoji.emoji))) }, category)))
                : emojiList.map((emoji) => (jsx(Grid.Item, { title: emoji.emoji, subtitle: emoji.keywords.join(", "), onClick: async () => {
                        console.log(emoji);
                        await Clipboard.writeText(emoji.emoji);
                        showHud(`${emoji.emoji} copied to clipboard`);
                    } }, emoji.emoji)))] }));
}

export { EmojiPicker$1 as E, EmojiPicker as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlcyI6W10sInNvdXJjZXNDb250ZW50IjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
