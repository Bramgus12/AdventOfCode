import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

type Operators = Array<"*" | "+"> | undefined;

function getNextOperatorStringUsingBinary(operators: Operators): Operators {
    if (operators == null) {
        return ["+"];
    }

    const binaryString = operators
        .map((operator) => (operator === "+" ? "0" : "1"))
        .join("");

    const binaryNumber = parseInt(binaryString, 2) + 1;

    const newBinaryString = binaryNumber.toString(2).split("");

    if (newBinaryString.length < operators.length) {
        const missingZeros = Array.from({
            length: operators.length - newBinaryString.length,
        }).map(() => "0");
        newBinaryString.unshift(...missingZeros);
    }

    return newBinaryString.map((value) => (value === "0" ? "+" : "*"));
}

function calculateNumberUsingOperators(
    remainingNumbers: Array<number>,
    operators: Exclude<Operators, undefined>,
) {
    let result = remainingNumbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += remainingNumbers[i + 1];
        } else {
            result *= remainingNumbers[i + 1];
        }
    }

    return result;
}

function checkRemainingNumbers(
    testValue: number,
    remainingNumbers: Array<number>,
    previousOperators: Operators,
) {
    let newOperators: Operators;
    if (previousOperators == null) {
        newOperators = Array.from({ length: remainingNumbers.length - 1 }).map(
            () => "+",
        );
    } else {
        newOperators = getNextOperatorStringUsingBinary(previousOperators);
    }

    const filledOperators = newOperators as Exclude<Operators, undefined>;

    if (filledOperators.length > remainingNumbers.length - 1) {
        return false;
    }

    const result = calculateNumberUsingOperators(remainingNumbers, filledOperators);

    if (result === testValue) {
        return true;
    }

    return checkRemainingNumbers(testValue, remainingNumbers, newOperators);
}

export default function day7_1() {
    const fileAsString = readFileAsString(
        path.join(import.meta.dirname, "daySevenInput.txt"),
    );

    const lines = fileAsString.split("\n");

    const splitLines = lines
        .filter((value) => value !== "")
        .map<[number, Array<number>]>((line) => {
            const splitLine = line.split(": ");

            const testValue = Number(splitLine[0]);
            const remainingNumbers = splitLine[1].split(" ").map(Number);

            return [testValue, remainingNumbers];
        });

    const solution = splitLines.reduce((acc, [testValue, remainingNumbers]) => {
        const isSolution = checkRemainingNumbers(
            testValue,
            remainingNumbers,
            undefined,
        );

        if (isSolution) {
            return acc + testValue;
        }

        return acc;
    }, 0);

    console.log(`Solution: ${solution}`);
}
