import { jsxs, jsx } from 'react/jsx-runtime';
import { Inline, ActionPanel, Action, Content, Icons } from '@project-gauntlet/api/components';
import { Clipboard, showHud } from '@project-gauntlet/api/helpers';
import { g as getEmojis } from './vendor.js';

// @ts-expect-error
Deno[Deno.internal].core;
function EmojiPicker(props) {
    const text = props.text.trim();
    if (text.length < 3) {
        return undefined;
    }
    const emoji = getEmojis().find(emoji => emoji.keywords.includes(text));
    if (!emoji) {
        return undefined;
    }
    return (jsxs(Inline, { actions: jsx(ActionPanel, { children: jsx(Action, { label: `Copy ${emoji.emoji} to clipboard`, onAction: async () => {
                    console.log(emoji.emoji);
                    await Clipboard.writeText(emoji.emoji);
                    showHud(`${emoji.emoji} copied to clipboard`);
                } }) }), children: [jsx(Inline.Left, { children: jsx(Content.H3, { children: text }) }), jsx(Inline.Separator, { icon: Icons.ArrowRight }), jsx(Inline.Right, { children: jsx(Content.H3, { children: emoji.emoji }) })] }));
}

export { EmojiPicker as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamlwaWNrZXIuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
