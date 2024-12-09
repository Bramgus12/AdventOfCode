import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

function findFreeSegments(data: number[]): Array<{ start: number; length: number }> {
    const segments: Array<{ start: number; length: number }> = [];
    let currentStart = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === -1) {
            if (currentStart === -1) {
                currentStart = i;
            }
        } else {
            if (currentStart !== -1) {
                segments.push({ start: currentStart, length: i - currentStart });
                currentStart = -1;
            }
        }
    }

    if (currentStart !== -1) {
        segments.push({ start: currentStart, length: data.length - currentStart });
    }

    return segments;
}

function moveFileIfPossible(data: number[], fileId: number, fileIndices: number[]) {
    const fileLength = fileIndices.length;
    const fileStart = Math.min(...fileIndices);

    const freeSegments = findFreeSegments(data).filter(
        (segment) => segment.start + segment.length <= fileStart,
    );

    const suitableSegment = freeSegments.find((seg) => seg.length >= fileLength);

    if (suitableSegment) {
        for (const idx of fileIndices) {
            // eslint-disable-next-line no-param-reassign
            data[idx] = -1;
        }

        for (let i = 0; i < fileLength; i++) {
            // eslint-disable-next-line no-param-reassign
            data[suitableSegment.start + i] = fileId;
        }
    }
}

function computeChecksum(data: number[]): number {
    return data.reduce((acc, value, index) => {
        if (value === -1) {
            return acc;
        }
        return acc + value * index;
    }, 0);
}

export default function day9_2() {
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

    const fileIds = Array.from(new Set(data.filter((v) => v !== -1))).sort(
        (a, b) => a - b,
    );
    const maxFileId = Math.max(...fileIds);

    for (let fileId = maxFileId; fileId >= 0; fileId--) {
        const fileIndices = data
            .map((val, idx) => (val === fileId ? idx : -1))
            .filter((idx) => idx !== -1);
        if (fileIndices.length === 0) {
            continue;
        }

        moveFileIfPossible(data, fileId, fileIndices);
    }

    const solution = computeChecksum(data);

    console.log(`The solution is: ${solution}`);
}
