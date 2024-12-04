import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

export default function day4_2() {
    const fileAsString = readFileAsString(
        path.join(import.meta.dirname, "dayFourInput.txt"),
    );

    const linesWithSeparatedChars = fileAsString
        .split("\n")
        .map((line) => line.split(""));

    let foundXs = 0;

    for (
        let lineIndex = 0;
        lineIndex < linesWithSeparatedChars.length - 2;
        lineIndex++
    ) {
        for (
            let charIndex = 0;
            charIndex < linesWithSeparatedChars[lineIndex].length - 2;
            charIndex++
        ) {
            const topLeft = linesWithSeparatedChars[lineIndex][charIndex];
            const middle = linesWithSeparatedChars[lineIndex + 1][charIndex + 1];
            const bottomRight =
                linesWithSeparatedChars[lineIndex + 2][charIndex + 2];

            const topRight = linesWithSeparatedChars[lineIndex][charIndex + 2];
            const bottomLeft = linesWithSeparatedChars[lineIndex + 2][charIndex];

            // Check down right
            const downRight = [topLeft, middle, bottomRight].join("");
            if (downRight !== "MAS" && downRight !== "SAM") {
                continue;
            }

            // Check down left
            const downLeft = [topRight, middle, bottomLeft].join("");
            if (downLeft !== "MAS" && downLeft !== "SAM") {
                continue;
            }

            foundXs++;
        }
    }

    console.log(`XMAS has been found this amount of times: ${foundXs}`);
}
