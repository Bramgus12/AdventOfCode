import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

type Operators = Array<"*" | "+" | "||"> | undefined;

const numberToOperatorMapping = {
    0: "+",
    1: "*",
    2: "||",
} as const;

const operatorToNumberMapping = {
    "+": 0,
    "*": 1,
    "||": 2,
} as const;

function getNextOperatorStringUsingBinary(operators: Operators): Operators {
    if (operators == null) {
        return ["+"];
    }

    const binaryString = operators
        .map((operator) => operatorToNumberMapping[operator])
        .join("");

    const binaryNumber = parseInt(binaryString, 3) + 1;

    const newBinaryString = binaryNumber.toString(3).split("");

    if (newBinaryString.length < operators.length) {
        const missingZeros = Array.from({
            length: operators.length - newBinaryString.length,
        }).map(() => "0");
        newBinaryString.unshift(...missingZeros);
    }

    return newBinaryString.map(
        (value) =>
            numberToOperatorMapping[
                Number(value) as keyof typeof numberToOperatorMapping
            ],
    );
}

function calculateNumberUsingOperators(
    remainingNumbers: Array<number>,
    operators: Exclude<Operators, undefined>,
) {
    let result = remainingNumbers[0];
    for (let i = 0; i < operators.length; i++) {
        switch (operators[i]) {
            case "*":
                result *= remainingNumbers[i + 1];
                break;
            case "+":
                result += remainingNumbers[i + 1];
                break;
            case "||":
                result = parseInt(
                    `${result.toString()}${remainingNumbers[i + 1].toString()}`,
                );
                break;
        }
    }

    return result;
}

function checkRemainingNumbersAsync(
    testValue: number,
    remainingNumbers: Array<number>,
    previousOperators: Operators,
    callback: (result: boolean) => void,
): void {
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
        callback(false);
        return;
    }

    const result = calculateNumberUsingOperators(remainingNumbers, filledOperators);

    if (result === testValue) {
        callback(true);
        return;
    }

    setImmediate(() => {
        checkRemainingNumbersAsync(
            testValue,
            remainingNumbers,
            newOperators,
            callback,
        );
    });
}

// Usage example in the main function
export default function day7_2() {
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

    let solution = 0;
    let processed = 0;

    function processNextLine() {
        if (processed >= splitLines.length) {
            console.log(`Solution: ${solution}`);
            return;
        }

        const [testValue, remainingNumbers] = splitLines[processed];
        console.log({ testValue, remainingNumbers });

        checkRemainingNumbersAsync(
            testValue,
            remainingNumbers,
            undefined,
            (isSolution) => {
                if (isSolution) {
                    solution += testValue;
                }
                processed++;
                processNextLine(); // Process the next line asynchronously
            },
        );
    }

    processNextLine(); // Start processing
}
