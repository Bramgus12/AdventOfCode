import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";
import isUpdateCorrect from "../../utils/day5/getIsUpdateCorrect.ts";

function sortUpdateByRules(update: number[], orderingRules: Array<Array<number>>) {
    return update.sort((a, b) => {
        for (const [before, after] of orderingRules) {
            if (a === before && b === after) return -1;
            if (a === after && b === before) return 1;
        }
        return 0;
    });
}

export default function day5_2() {
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

    const incorrectPrintUpdates = printUpdates.filter(
        (update) =>
            !isUpdateCorrect(update, orderingRulesBefore, orderingRulesAfter),
    );

    const correctedMiddleSum = incorrectPrintUpdates
        .map((update) => {
            const sortedUpdate = sortUpdateByRules(update, orderingRules);
            const middleIndex = Math.floor((sortedUpdate.length - 1) / 2);
            return sortedUpdate[middleIndex];
        })
        .reduce((acc, value) => acc + value, 0);

    console.log(`The corrected solution is: ${correctedMiddleSum}`);
}
