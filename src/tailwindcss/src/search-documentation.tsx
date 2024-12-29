import { List } from "@project-gauntlet/api/components";
import React, { ReactElement, useState } from "react";
import documentation from "./documentation/tailwind-css";
import open from "../../../utils/open-url";

export default function SearchDocumentation(): ReactElement {
  const [searchText, setSearchText] = useState<string | undefined>("");

  //TODO - Migrate this to an Action, so that we can also have a copy to clipboard feature
  const onClick = async (url: string) => {
    await open(url);
  };

  return (
    <List>
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
                item.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item: { title: string; url: string }) => (
                <List.Item
                  key={item.title}
                  icon={{ asset: "tailwindcss/list-icon.png" }}
                  title={item.title}
                  onClick={() => onClick(item.url)}
                />
              ))
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
