import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

type CharacterLocation = { character: string; locations: Array<[number, number]> };

function getAllOtherCellsWithSameCharacter(
    map: Array<Array<string>>,
    character: string,
    firstFoundCharacterLocation: [number, number],
): Array<[number, number]> {
    return map.reduce<Array<[number, number]>>((acc, row, rowIndex) => {
        return row.reduce<Array<[number, number]>>((rowAcc, cell, cellIndex) => {
            // Fix: Correct the condition to exclude only the exact same cell
            if (
                cell === character &&
                rowIndex !== firstFoundCharacterLocation[0] &&
                cellIndex !== firstFoundCharacterLocation[1]
            ) {
                return [...rowAcc, [rowIndex, cellIndex]];
            }
            return rowAcc;
        }, acc);
    }, []);
}

function createAntiNodesForCharacter(
    characterLocation: CharacterLocation,
): Array<[number, number]> {
    return characterLocation.locations.reduce<Array<[number, number]>>(
        (acc, location) => {
            characterLocation.locations.forEach((itemToCheck) => {
                const location1 = location;
                const location2 = itemToCheck;

                if (location1[0] === location2[0] || location1[1] === location2[1]) {
                    return;
                }

                let antiNode1: [number, number] = [NaN, NaN];
                let antiNode2: [number, number] = [NaN, NaN];

                // Fix: Correct anti-node calculations for all cases
                if (location1[0] <= location2[0] && location1[1] < location2[1]) {
                    const antiNodeY1 = location1[0] - (location2[0] - location1[0]);
                    const antiNodeX1 = location1[1] - (location2[1] - location1[1]);
                    antiNode1 = [antiNodeY1, antiNodeX1];

                    const antiNodeY2 = location2[0] + (location2[0] - location1[0]);
                    const antiNodeX2 = location2[1] + (location2[1] - location1[1]);
                    antiNode2 = [antiNodeY2, antiNodeX2];
                }

                if (location1[0] < location2[0] && location1[1] > location2[1]) {
                    const antiNodeY1 = location1[0] - (location2[0] - location1[0]);
                    const antiNodeX1 = location1[1] + (location1[1] - location2[1]);
                    antiNode1 = [antiNodeY1, antiNodeX1];

                    const antiNodeY2 = location2[0] + (location2[0] - location1[0]);
                    const antiNodeX2 = location2[1] - (location1[1] - location2[1]);
                    antiNode2 = [antiNodeY2, antiNodeX2];
                }

                if (location1[0] > location2[0] && location1[1] <= location2[1]) {
                    const antiNodeY1 = location1[0] + (location1[0] - location2[0]);
                    const antiNodeX1 = location1[1] - (location2[1] - location1[1]);
                    antiNode1 = [antiNodeY1, antiNodeX1];

                    const antiNodeY2 = location2[0] - (location1[0] - location2[0]);
                    const antiNodeX2 = location2[1] + (location2[1] - location1[1]);
                    antiNode2 = [antiNodeY2, antiNodeX2];
                }

                if (location1[0] > location2[0] && location1[1] > location2[1]) {
                    const antiNodeY1 = location1[0] + (location1[0] - location2[0]);
                    const antiNodeX1 = location1[1] + (location1[1] - location2[1]);
                    antiNode1 = [antiNodeY1, antiNodeX1];

                    const antiNodeY2 = location2[0] - (location1[0] - location2[0]);
                    const antiNodeX2 = location2[1] - (location1[1] - location2[1]);
                    antiNode2 = [antiNodeY2, antiNodeX2];
                }

                if (
                    Number.isNaN(antiNode1[0]) ||
                    Number.isNaN(antiNode1[1]) ||
                    Number.isNaN(antiNode2[0]) ||
                    Number.isNaN(antiNode2[1])
                ) {
                    return;
                }

                acc.push(antiNode1, antiNode2);
            });

            return acc;
        },
        [],
    );
}

export default function day8_1() {
    const mapString = readFileAsString(
        path.join(import.meta.dirname, "dayEightInput.txt"),
    );

    const map = mapString
        .split("\n")
        .filter((value) => value.trim() !== "") // Fix: Use trim to remove leading/trailing whitespace
        .map((row) => row.split(""));

    const finishedCharacters: Array<string> = [];
    const characterLocations: Array<CharacterLocation> = [];

    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const row = map[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const character = row[columnIndex];
            if (character === "." || finishedCharacters.includes(character)) {
                continue;
            }
            finishedCharacters.push(character);
            const allOtherCellsWithSameCharacter = getAllOtherCellsWithSameCharacter(
                map,
                character,
                [rowIndex, columnIndex],
            );
            allOtherCellsWithSameCharacter.push([rowIndex, columnIndex]);
            characterLocations.push({
                locations: allOtherCellsWithSameCharacter,
                character: character,
            });
        }
    }

    const antiNodes = characterLocations
        .map((item) => createAntiNodesForCharacter(item))
        .flat(1);

    antiNodes.forEach((antiNode) => {
        const currentCharacter = map?.[antiNode[0]]?.[antiNode[1]];

        if (currentCharacter == null) {
            return;
        }

        map[antiNode[0]][antiNode[1]] = "#";
    });

    const solution = map.reduce<number>(
        (acc, row) =>
            row.reduce<number>((rowAcc, character) => {
                if (character === "#") {
                    return rowAcc + 1;
                }
                return rowAcc;
            }, acc),
        0,
    );

    console.log(`Solution is: ${solution}`);
}
