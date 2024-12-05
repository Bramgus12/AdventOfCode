import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";
import isUpdateCorrect from "../../utils/day5/getIsUpdateCorrect.ts";

export default function day5_1() {
    const input = readFileAsString(
        path.join(import.meta.dirname, "dayFiveInput.txt"),
    );

    const splitInput = input.split("\n\n");
    const orderingRules = splitInput[0]
        .split("\n")
        .map((rule) => rule.split("|").map(Number));
    const orderingRulesBefore = orderingRules.map((rule) => rule[0]);
    const orderingRulesAfter = orderingRules.map((rule) => rule[1]);
    const printUpdates = splitInput[1]
        .split("\n")
        .map((update) => update.split(",").map(Number))
        .filter((update) => update.length > 1);

    const correctPrintUpdates = printUpdates.filter((update) =>
        isUpdateCorrect(update, orderingRulesBefore, orderingRulesAfter),
    );

    const solution = correctPrintUpdates
        .map((update) => {
            const middleIndex = (update.length - 1) / 2;
            return update[middleIndex];
        })
        .reduce((acc, value) => acc + value, 0);

    console.log(`The correct solution is: ${solution}`);
}
