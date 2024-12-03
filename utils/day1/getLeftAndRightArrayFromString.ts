export default function getLeftAndRightArrayFromString(input: string): {
    leftArray: Array<number>;
    rightArray: Array<number>;
} {
    const splitFile = input.split("\n");

    return splitFile.reduce<{
        leftArray: Array<number>;
        rightArray: Array<number>;
    }>(
        (acc, item) => {
            const splitItem = item.split("   ");

            const mappedLeftItem = parseInt(splitItem[0]);
            const mappedRightItem = parseInt(splitItem[1]);

            const leftArray = [...acc.leftArray];
            const rightArray = [...acc.rightArray];

            if (!Number.isNaN(mappedLeftItem)) {
                leftArray.push(mappedLeftItem);
            }

            if (!Number.isNaN(mappedRightItem)) {
                rightArray.push(mappedRightItem);
            }

            return { leftArray, rightArray };
        },
        { leftArray: [], rightArray: [] },
    );
}
