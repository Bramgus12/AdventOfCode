import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

type Map = Array<Array<string>>;

function goDown(map: Map, currentPosition: [number, number]): Map {
    const nextPosition = [currentPosition[0] + 1, currentPosition[1]];
    const newMap = [...map];

    newMap[currentPosition[0]][currentPosition[1]] = "X";
    newMap[nextPosition[0]][nextPosition[1]] = "v";

    return newMap;
}

function goUp(map: Map, currentPosition: [number, number]): Map {
    const nextPosition = [currentPosition[0] - 1, currentPosition[1]];
    const newMap = [...map];

    newMap[currentPosition[0]][currentPosition[1]] = "X";
    newMap[nextPosition[0]][nextPosition[1]] = "^";

    return newMap;
}

function goLeft(map: Map, currentPosition: [number, number]): Map {
    const nextPosition = [currentPosition[0], currentPosition[1] - 1];
    const newMap = [...map];

    newMap[currentPosition[0]][currentPosition[1]] = "X";
    newMap[nextPosition[0]][nextPosition[1]] = "<";

    return newMap;
}

function goRight(map: Map, currentPosition: [number, number]): Map {
    const nextPosition = [currentPosition[0], currentPosition[1] + 1];
    const newMap = [...map];

    newMap[currentPosition[0]][currentPosition[1]] = "X";
    newMap[nextPosition[0]][nextPosition[1]] = ">";

    return newMap;
}

function traverseThroughMap(map: Map, currentPosition: [number, number]): Map {
    const currentPositionChar = map[currentPosition[0]][currentPosition[1]] as
        | "v"
        | "^"
        | "<"
        | ">";
    if (currentPositionChar === "v") {
        const newPosition: [number, number] = [
            currentPosition[0] + 1,
            currentPosition[1],
        ];
        if (map?.[newPosition[0]]?.[newPosition[1]] == null) {
            return map;
        }
        if (map[newPosition[0]][newPosition[1]] === "#") {
            const newMap = [...map];
            newMap[currentPosition[0]][currentPosition[1]] = "<";
            return traverseThroughMap(newMap, currentPosition);
        }
        return traverseThroughMap(goDown(map, currentPosition), newPosition);
    }
    if (currentPositionChar === "^") {
        const newPosition: [number, number] = [
            currentPosition[0] - 1,
            currentPosition[1],
        ];
        if (map?.[newPosition[0]]?.[newPosition[1]] == null) {
            return map;
        }
        if (map[newPosition[0]][newPosition[1]] === "#") {
            const newMap = [...map];
            newMap[currentPosition[0]][currentPosition[1]] = ">";
            return traverseThroughMap(newMap, currentPosition);
        }
        return traverseThroughMap(goUp(map, currentPosition), newPosition);
    }
    if (currentPositionChar === "<") {
        const newPosition: [number, number] = [
            currentPosition[0],
            currentPosition[1] - 1,
        ];
        if (map?.[newPosition[0]]?.[newPosition[1]] == null) {
            return map;
        }
        if (map[newPosition[0]][newPosition[1]] === "#") {
            const newMap = [...map];
            newMap[currentPosition[0]][currentPosition[1]] = "^";
            return traverseThroughMap(newMap, currentPosition);
        }
        return traverseThroughMap(goLeft(map, currentPosition), newPosition);
    }
    const newPosition: [number, number] = [
        currentPosition[0],
        currentPosition[1] + 1,
    ];
    if (map?.[newPosition[0]]?.[newPosition[1]] == null) {
        return map;
    }
    if (map[newPosition[0]][newPosition[1]] === "#") {
        const newMap = [...map];
        newMap[currentPosition[0]][currentPosition[1]] = "v";
        return traverseThroughMap(newMap, currentPosition);
    }
    return traverseThroughMap(goRight(map, currentPosition), newPosition);
}

export default function day6_1() {
    const mapString = readFileAsString(
        path.join(import.meta.dirname, "daySixInput.txt"),
    );

    const map = mapString.split("\n").map((line) => line.split(""));

    const currentPosition = map.reduce<[number, number]>(
        (acc, line, lineIndex) => {
            if (!isNaN(acc[0]) && !isNaN(acc[1])) {
                return acc;
            }

            const charIndex = line.findIndex((char) => char === "^");
            if (charIndex !== -1) {
                return [lineIndex, charIndex];
            }
            return acc;
        },
        [NaN, NaN],
    );

    const newMap = traverseThroughMap(map, currentPosition);

    const numberOfVisited = newMap.flat().filter((char) => char === "X").length + 1;

    console.log(`The number of visited squares is: ${numberOfVisited}`);
}
