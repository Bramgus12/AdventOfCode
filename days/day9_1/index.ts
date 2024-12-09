import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

function checkIfDataIsNotCompacted(data: Array<number>) {
    // Check if the last part of the data is only -1 and the first of the data completely not -1
    const lastData = data.slice(data.indexOf(-1));

    return lastData.some((value) => value !== -1);
}

export default function day9_1() {
    const dataString = readFileAsString(
        path.join(import.meta.dirname, "dayNineInput.txt"),
    );

    const splitData = dataString.split("").map(Number);

    const data: Array<number> = splitData.reduce<{
        prevData: Array<number>;
        isPrevValueData: boolean;
        prevDataId: number;
    }>(
        (acc, value) => {
            const newData = [...acc.prevData];
            if (!acc.isPrevValueData) {
                const dataPiece = Array.from({ length: value }).map(
                    () => acc.prevDataId,
                );

                newData.push(...dataPiece);

                return {
                    prevData: newData,
                    isPrevValueData: !acc.isPrevValueData,
                    prevDataId: acc.prevDataId + 1,
                };
            } else {
                const emptyPiece = Array.from({ length: value }).map(() => -1);

                newData.push(...emptyPiece);

                return {
                    prevData: newData,
                    isPrevValueData: !acc.isPrevValueData,
                    prevDataId: acc.prevDataId,
                };
            }
        },
        { isPrevValueData: false, prevData: [], prevDataId: 0 },
    ).prevData;

    const newData = [...data];

    while (checkIfDataIsNotCompacted(newData)) {
        const firstEmptySpaceIndex = newData.findIndex((value) => value === -1);

        const lastDataIndex = newData.findLastIndex((value) => value !== -1);

        newData.splice(firstEmptySpaceIndex, 1, newData[lastDataIndex]);
        newData.splice(lastDataIndex, 1, -1);
    }

    const solution = newData.reduce((acc, value, index) => {
        if (value === -1) {
            return acc;
        }

        return acc + value * index;
    }, 0);

    console.log(newData);

    console.log(`The solution is: ${solution}`);
}
