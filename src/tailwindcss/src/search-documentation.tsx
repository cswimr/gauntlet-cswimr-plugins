import { List } from "@project-gauntlet/api/components";
import React, { ReactElement, useState } from "react";
import documentation from "./documentation/tailwind-css";
import { Clipboard } from "@project-gauntlet/api/helpers";
import open from "../../../utils/open-url";

// @ts-expect-error gauntlet uses deno and not node
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const denoCore: DenoCore = Deno[Deno.internal].core;

export default function SearchDocumentation(): ReactElement {
  const [searchText, setSearchText] = useState<string | undefined>("");

  const onClick = async (url: string) => {
    await open(url);
    //await Clipboard.writeText(url);
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
      <List.SearchBar
        placeholder={"Search TailwindCSS Documentation..."}
        value={searchText}
        onChange={setSearchText}
      />
      {searchText
        ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(documentation).map(([_section, items]) =>
            items
              .filter((item: { title: string; url: string }) =>
                item.title.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map((item: { title: string; url: string }) => (
                <List.Item
                  key={item.title}
                  icon={{ asset: "tailwindcss/list-icon.png" }}
                  title={item.title}
                  onClick={() => onClick(item.url)}
                />
              )),
          )
        : Object.entries(documentation).map(([section, items]) => (
            <List.Section key={section} title={section}>
              {items.map((item) => (
                <List.Item
                  key={item.title}
                  icon={{ asset: "tailwindcss/list-icon.png" }}
                  title={item.title}
                  onClick={() => onClick(item.url)}
                />
              ))}
            </List.Section>
          ))}
    </List>
  );
}