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

function getIsNotOutOfBounds(
    location: [number, number],
    bounds: [number, number],
): boolean {
    return (
        location[0] >= 0 &&
        location[0] < bounds[0] &&
        location[1] >= 0 &&
        location[1] < bounds[1]
    );
}

function createAntiNodesForCharacter(
    characterLocation: CharacterLocation,
    bounds: [number, number],
): Array<[number, number]> {
    return characterLocation.locations.reduce<Array<[number, number]>>(
        (acc, location) => {
            characterLocation.locations.forEach((itemToCheck) => {
                const location1 = location;
                const location2 = itemToCheck;

                if (location1[0] === location2[0] || location1[1] === location2[1]) {
                    return;
                }

                const antiNodes: Array<[number, number]> = [];

                const absoluteY = Math.abs(location1[0] - location2[0]);
                const absoluteX = Math.abs(location1[1] - location2[1]);

                if (location1[0] <= location2[0] && location1[1] < location2[1]) {
                    console.log("top left");
                    let previousAntiNode1: [number, number] = location1;
                    let previousAntiNode2: [number, number] = location2;

                    while (
                        getIsNotOutOfBounds(previousAntiNode1, bounds) ||
                        getIsNotOutOfBounds(previousAntiNode2, bounds)
                    ) {
                        const antiNodeY1 = previousAntiNode1[0] - absoluteY;
                        const antiNodeX1 = previousAntiNode1[1] - absoluteX;
                        previousAntiNode1 = [antiNodeY1, antiNodeX1];
                        antiNodes.push(previousAntiNode1);

                        const antiNodeY2 = previousAntiNode2[0] + absoluteY;
                        const antiNodeX2 = previousAntiNode2[1] + absoluteX;
                        previousAntiNode2 = [antiNodeY2, antiNodeX2];
                        antiNodes.push(previousAntiNode2);

                        console.log({
                            previousAntiNode1,
                            previousAntiNode2,
                            location1,
                            location2,
                            character: characterLocation.character,
                            bounds,
                        });
                    }
                }

                if (location1[0] < location2[0] && location1[1] > location2[1]) {
                    let previousAntiNode1: [number, number] = location1;
                    let previousAntiNode2: [number, number] = location2;

                    while (
                        getIsNotOutOfBounds(previousAntiNode1, bounds) ||
                        getIsNotOutOfBounds(previousAntiNode2, bounds)
                    ) {
                        const antiNodeY1 = previousAntiNode1[0] - absoluteY;
                        const antiNodeX1 = previousAntiNode1[1] + absoluteX;
                        previousAntiNode1 = [antiNodeY1, antiNodeX1];
                        antiNodes.push(previousAntiNode1);

                        const antiNodeY2 = previousAntiNode2[0] + absoluteY;
                        const antiNodeX2 = previousAntiNode2[1] - absoluteX;
                        previousAntiNode2 = [antiNodeY2, antiNodeX2];
                        antiNodes.push(previousAntiNode2);
                    }
                }

                if (location1[0] > location2[0] && location1[1] <= location2[1]) {
                    let previousAntiNode1: [number, number] = location1;
                    let previousAntiNode2: [number, number] = location2;

                    while (
                        getIsNotOutOfBounds(previousAntiNode1, bounds) ||
                        getIsNotOutOfBounds(previousAntiNode2, bounds)
                    ) {
                        const antiNodeY1 = previousAntiNode1[0] + absoluteY;
                        const antiNodeX1 = previousAntiNode1[1] - absoluteX;
                        previousAntiNode1 = [antiNodeY1, antiNodeX1];
                        antiNodes.push(previousAntiNode1);

                        const antiNodeY2 = previousAntiNode2[0] - absoluteY;
                        const antiNodeX2 = previousAntiNode2[1] + absoluteX;
                        previousAntiNode2 = [antiNodeY2, antiNodeX2];
                        antiNodes.push(previousAntiNode2);
                    }
                }

                if (location1[0] > location2[0] && location1[1] > location2[1]) {
                    let previousAntiNode1: [number, number] = location1;
                    let previousAntiNode2: [number, number] = location2;

                    while (
                        getIsNotOutOfBounds(previousAntiNode1, bounds) ||
                        getIsNotOutOfBounds(previousAntiNode2, bounds)
                    ) {
                        const antiNodeY1 = previousAntiNode1[0] + absoluteY;
                        const antiNodeX1 = previousAntiNode1[1] + absoluteX;
                        previousAntiNode1 = [antiNodeY1, antiNodeX1];
                        antiNodes.push(previousAntiNode1);

                        const antiNodeY2 = previousAntiNode2[0] - absoluteY;
                        const antiNodeX2 = previousAntiNode2[1] - absoluteX;
                        previousAntiNode2 = [antiNodeY2, antiNodeX2];
                        antiNodes.push(previousAntiNode2);
                    }
                }

                if (antiNodes.length === 0) {
                    return;
                }

                acc.push(...antiNodes);
            });

            return acc;
        },
        [],
    );
}

export default function day8_2() {
    const mapString = readFileAsString(
        path.join(import.meta.dirname, "dayEightInput.txt"),
    );

    const map = mapString
        .split("\n")
        .filter((value) => value.trim() !== "")
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

    const bounds: [number, number] = [map.length, map[0].length];

    const antiNodes = characterLocations
        .map((item) => createAntiNodesForCharacter(item, bounds))
        .flat(1);

    antiNodes.forEach((antiNode) => {
        const currentCharacter = map?.[antiNode[0]]?.[antiNode[1]];

        if (currentCharacter == null) {
            return;
        }

        map[antiNode[0]][antiNode[1]] = "#";
    });

    console.log(map.map((row) => row.join("")).join("\n"));

    const solution = map.reduce<number>(
        (acc, row) =>
            row.reduce<number>((rowAcc, character) => {
                if (character === ".") {
                    return rowAcc;
                }
                return rowAcc + 1;
            }, acc),
        0,
    );

    console.log(`Solution is: ${solution}`);
}
