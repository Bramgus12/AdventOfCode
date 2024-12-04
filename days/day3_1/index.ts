import path from "node:path";
import { readFileAsString } from "../../utils/readFileAsString.ts";

export default function day3_1() {
    const fileAsString = readFileAsString(
        path.join(import.meta.dirname, "dayThreeInput.txt"),
    );

    const lines = fileAsString.split("\n");
    const fullText = lines.join("");

    const matchedText = fullText.match(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);

    const numberArray = matchedText?.map((text) =>
        text.replace("mul(", "").replace(")", "").split(",").map(Number),
    );

    const solution = numberArray?.reduce((acc, [a, b]) => acc + a * b, 0);

    console.log(`The solution is: ${solution}`);
}
