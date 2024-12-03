import path from "node:path";
import { readFileAsString } from "../../utils/readFileAsString.ts";
import getLeftAndRightArrayFromString from "../../utils/day1/getLeftAndRightArrayFromString.ts";

export default function day1_1() {
    const fileString = readFileAsString(
        path.join(import.meta.dirname, "dayOneInput.txt"),
    );

    const leftAndRightArray = getLeftAndRightArrayFromString(fileString);

    const sortedLeftArray = leftAndRightArray.leftArray.toSorted((a, b) => a - b);
    const sortedRightArray = leftAndRightArray.rightArray.toSorted((a, b) => a - b);

    const differences = sortedLeftArray.map((item, index) => {
        const correspondingRightValue = sortedRightArray[index];

        const difference = item - correspondingRightValue;

        if (difference < 0) {
            return -difference;
        }

        return difference;
    });

    const solution = differences.reduce<number>((acc, item) => acc + item, 0);

    console.log(`The solution to day 1, part 1 is: ${solution}`);
}
