import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";
import getReportArrays from "../../utils/day2/getReportArrays.ts";

function isSafe(report: Array<number>): boolean {
    const increasing = report.every(
        (_, i, arr) => i === 0 || (arr[i] > arr[i - 1] && arr[i] - arr[i - 1] <= 3),
    );
    const decreasing = report.every(
        (_, i, arr) => i === 0 || (arr[i] < arr[i - 1] && arr[i - 1] - arr[i] <= 3),
    );
    return increasing || decreasing;
}

function canBecomeSafeWithOneRemoval(report: Array<number>): boolean {
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isSafe(modifiedReport)) {
            return true;
        }
    }
    return false;
}

export default function day2_2() {
    const fileString = readFileAsString(
        path.join(import.meta.dirname, "dayTwoInput.txt"),
    );

    const reportArray = getReportArrays(fileString);

    const amountOfSafeReports = reportArray.reduce<number>((acc, report) => {
        if (isSafe(report) || canBecomeSafeWithOneRemoval(report)) {
            return acc + 1;
        }
        return acc;
    }, 0);

    console.info(`The amount of safe reports is: ${amountOfSafeReports}`);
}
