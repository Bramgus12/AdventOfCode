import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";
import getLeftAndRightArrayFromString from "../../utils/day1/getLeftAndRightArrayFromString.ts";

export default function day1_2() {
    const fileString = readFileAsString(
        path.join(import.meta.dirname, "dayOneInput.txt"),
    );

    const leftAndRightArray = getLeftAndRightArrayFromString(fileString);

    const leftArray = leftAndRightArray.leftArray;
    const rightArray = leftAndRightArray.rightArray;

    const similarityScore = leftArray.reduce<number>((acc, item) => {
        const amountInRightArray = rightArray.filter(
            (rightItem) => rightItem === item,
        ).length;

        return acc + item * amountInRightArray;
    }, 0);

    console.info(`The similarity score is: ${similarityScore}`);
}
