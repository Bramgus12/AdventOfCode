import * as fs from "fs";

export function readFileAsString(filePath: string): string {
    return fs.readFileSync(filePath).toString("utf-8");
}
