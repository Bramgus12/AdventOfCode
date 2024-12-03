import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";
import getReportArrays from "../../utils/day2/getReportArrays.ts";
import getIsGraduallyIncreasingIssues from "../../utils/day2/getIsGraduallyInscreasingIssues.ts";
import getIsGraduallyDecreasingIssues from "../../utils/day2/getIsGraduallyDecreasingIssues.ts";

export default function day2_1() {
    const fileString = readFileAsString(
        path.join(import.meta.dirname, "dayTwoInput.txt"),
    );

    const reportArray = getReportArrays(fileString);

    const amountOfSafeReports = reportArray.reduce<number>((acc, report) => {
        const isGraduallyIncreasingIssues = getIsGraduallyIncreasingIssues(report);
        const isGraduallyDecreasingIssues = getIsGraduallyDecreasingIssues(report);

        if (isGraduallyIncreasingIssues === 0 || isGraduallyDecreasingIssues === 0) {
            return acc + 1;
        }

        return acc;
    }, 0);

    console.info(`The amount of safe reports is: ${amountOfSafeReports}`);
}
