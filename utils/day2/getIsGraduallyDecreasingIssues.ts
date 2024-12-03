export default function getIsGraduallyDecreasingIssues(report: Array<number>) {
    let prevValue: number | undefined;
    let issues = 0;

    report.forEach((value) => {
        if (prevValue === undefined) {
            prevValue = value;
            return;
        }

        if (prevValue <= value) {
            issues += 1;
            prevValue = value;
            return;
        }

        const difference = prevValue - value;

        if (difference < 1 || difference > 3) {
            issues += 1;
        }

        prevValue = value;
    });

    return issues;
}
