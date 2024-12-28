const getOpenCommand = (platform: typeof Deno.build.os): string => {
  const commands = {
    windows: "start",
    darwin: "open",
    linux: "xdg-open",
    freebsd: "xdg-open",
    netbsd: "xdg-open",
    android: "open",
    solaris: "firefox", //FIXME - use a different command that doesn't force a specific browser
    aix: "firefox",
    illumos: "firefox",
  } as const;
  return commands[platform] || commands.linux;
};

/**
 * Open a URL in the user's configured default browser
 * @param url The url you want to open in the default browser
 * @returns Promise<Deno.CommandStatus> The status of the command
 */
const open = async (url: string) => {
  // Yes, this function uses Deno. Yes, this repository uses Node.js for tooling.
  // Gauntlet runs loaded plugins in a Deno runtime, so this works fine.
  // Hop off Copilot I know this isn't using Node.js APIs
  const platform = Deno.build.os;
  const cmd = getOpenCommand(platform);
  const process = new Deno.Command(cmd, {
    args: [url],
    env: {
      // https://github.com/project-gauntlet/gauntlet/issues/28
      LD_LIBRARY_PATH: "",
    },
  });
  const child = process.spawn();
  return await child.status;
};

export default open;
