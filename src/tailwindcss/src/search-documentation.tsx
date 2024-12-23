import { List } from "@project-gauntlet/api/components";
import React, { ReactElement } from "react";
import documentation from "./documentation/tailwind-css";
//import { Clipboard } from "@project-gauntlet/api/helpers";
import { open } from "@opensrc/deno-open";

export default function SearchDocumentation(): ReactElement {
  const onClick = async (url: string) => {
    await open(url);
  };

  return (
    <List
    //   actions={
    //     <ActionPanel>
    //       <Action
    //         label="Copy URL to Clipboard"
    //         onAction={async () => {
    //           await Clipboard.writeText(item.url);
    //         }}
    //       />
    //     </ActionPanel>
    //   }
    >
      {Object.entries(documentation).map(([section, items]) => (
        <List.Section key={section} title={section}>
          {items.map((item) => (
            <List.Item
              key={item.url}
              //icon="tailwind-icon.png"
              title={item.title}
              onClick={() => onClick(item.url)}
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
