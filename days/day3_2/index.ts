import path from "node:path";
import { readFileAsString } from "../../utils/readFileAsString.ts";

export default function day3_2() {
    const fileAsString = readFileAsString(
        path.join(import.meta.dirname, "dayThreeInput.txt"),
    );

    const lines = fileAsString.split("\n");
    const fullText = lines.join("");

    const matchedText = fullText.match(
        /mul\(([0-9]{1,3}),([0-9]{1,3})\)|don't\(\)|do\(\)/g,
    );

    const numberArray = matchedText?.map((text) => {
        if (text === "don't()" || text === "do()") {
            return text !== "don't()";
        }

        return text.replace("mul(", "").replace(")", "").split(",");
    });

    const solution = numberArray
        ?.map((value) => (typeof value === "boolean" ? value : value.map(Number)))
        .reduce<{ num: number; prevCommand: boolean }>(
            (acc, value) => {
                if (typeof value === "boolean") {
                    return { num: acc.num, prevCommand: value };
                }

                const a = value[0];
                const b = value[1];

                if (acc.prevCommand) {
                    return {
                        num: acc.num + a * b,
                        prevCommand: acc.prevCommand,
                    };
                }

                return acc;
            },
            { num: 0, prevCommand: true },
        );

    console.log(`The solution is: ${solution?.num}`);
}
