import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

export default function day4_1() {
    const fileAsString = readFileAsString(
        path.join(import.meta.dirname, "dayFourInput.txt"),
    );

    const linesWithSeparatedChars = fileAsString
        .split("\n")
        .map((line) => line.split(""));

    let foundChristmases = 0;

    for (
        let lineIndex = 0;
        lineIndex < linesWithSeparatedChars.length;
        lineIndex++
    ) {
        for (
            let charIndex = 0;
            charIndex < linesWithSeparatedChars[lineIndex].length;
            charIndex++
        ) {
            const currentLetter = linesWithSeparatedChars[lineIndex][charIndex];
            if (currentLetter !== "X") {
                continue;
            }

            // Check horizontally right
            const nextFourChars = linesWithSeparatedChars[lineIndex].slice(
                charIndex,
                charIndex + 4,
            );

            if (nextFourChars.join("") === "XMAS") {
                foundChristmases++;
            }

            // Check horizontally left
            if (charIndex > 2) {
                const previousFourChars = linesWithSeparatedChars[lineIndex]
                    .slice(charIndex - 3, charIndex + 1)
                    .reverse();
                if (previousFourChars.join("") === "XMAS") {
                    foundChristmases++;
                }
            }

            // Check vertically down
            if (lineIndex < linesWithSeparatedChars.length - 3) {
                const fourCharsDown = [
                    linesWithSeparatedChars[lineIndex][charIndex],
                    linesWithSeparatedChars[lineIndex + 1][charIndex],
                    linesWithSeparatedChars[lineIndex + 2][charIndex],
                    linesWithSeparatedChars[lineIndex + 3][charIndex],
                ];
                if (fourCharsDown.join("") === "XMAS") {
                    foundChristmases++;
                }
            }

            // Check vertically up
            if (lineIndex > 2) {
                const fourCharsUp = [
                    linesWithSeparatedChars[lineIndex][charIndex],
                    linesWithSeparatedChars[lineIndex - 1][charIndex],
                    linesWithSeparatedChars[lineIndex - 2][charIndex],
                    linesWithSeparatedChars[lineIndex - 3][charIndex],
                ];
                if (fourCharsUp.join("") === "XMAS") {
                    foundChristmases++;
                }
            }

            // Check diagonally down right
            if (
                lineIndex < linesWithSeparatedChars.length - 3 &&
                charIndex < linesWithSeparatedChars[lineIndex].length - 3
            ) {
                const fourCharsDiagonallyDownRight = [
                    linesWithSeparatedChars[lineIndex][charIndex],
                    linesWithSeparatedChars[lineIndex + 1][charIndex + 1],
                    linesWithSeparatedChars[lineIndex + 2][charIndex + 2],
                    linesWithSeparatedChars[lineIndex + 3][charIndex + 3],
                ];
                if (fourCharsDiagonallyDownRight.join("") === "XMAS") {
                    foundChristmases++;
                }
            }

            // Check diagonally down left
            if (lineIndex < linesWithSeparatedChars.length - 3 && charIndex > 2) {
                const fourCharsDiagonallyDownLeft = [
                    linesWithSeparatedChars[lineIndex][charIndex],
                    linesWithSeparatedChars[lineIndex + 1][charIndex - 1],
                    linesWithSeparatedChars[lineIndex + 2][charIndex - 2],
                    linesWithSeparatedChars[lineIndex + 3][charIndex - 3],
                ];
                if (fourCharsDiagonallyDownLeft.join("") === "XMAS") {
                    foundChristmases++;
                }
            }

            // Check diagonally up right
            if (
                lineIndex > 2 &&
                charIndex < linesWithSeparatedChars[lineIndex].length - 3
            ) {
                const fourCharsDiagonallyUpRight = [
                    linesWithSeparatedChars[lineIndex][charIndex],
                    linesWithSeparatedChars[lineIndex - 1][charIndex + 1],
                    linesWithSeparatedChars[lineIndex - 2][charIndex + 2],
                    linesWithSeparatedChars[lineIndex - 3][charIndex + 3],
                ];
                if (fourCharsDiagonallyUpRight.join("") === "XMAS") {
                    foundChristmases++;
                }
            }

            // Check diagonally up left
            if (lineIndex > 2 && charIndex > 2) {
                const fourCharsDiagonallyUpLeft = [
                    linesWithSeparatedChars[lineIndex][charIndex],
                    linesWithSeparatedChars[lineIndex - 1][charIndex - 1],
                    linesWithSeparatedChars[lineIndex - 2][charIndex - 2],
                    linesWithSeparatedChars[lineIndex - 3][charIndex - 3],
                ];
                if (fourCharsDiagonallyUpLeft.join("") === "XMAS") {
                    foundChristmases++;
                }
            }
        }
    }

    console.log(`XMAS has been found this amount of times: ${foundChristmases}`);
}
