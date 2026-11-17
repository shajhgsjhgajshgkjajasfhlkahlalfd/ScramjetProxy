
import { cp, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";

const require = createRequire(import.meta.url);

const docs = path.resolve("docs");

const dirOf = (specifier) =>
    path.dirname(require.resolve(specifier));

await mkdir(docs, { recursive: true });

const assets = [
    [scramjetPath, "scram"],
    [dirOf("@mercuryworkshop/scramjet-controller"), "controller"],
    [dirOf("@mercuryworkshop/scramjet-utils"), "utils"],
    [dirOf("@mercuryworkshop/libcurl-transport"), "libcurl"],
    [dirOf("@mercuryworkshop/epoxy-transport"), "epoxy"]
];

for (const [source, destination] of assets) {
    await cp(source, path.join(docs, destination), {
        recursive: true,
        force: true
    });

    console.log(`Copied ${destination}`);
}

console.log("Scramjet assets copied successfully.");
