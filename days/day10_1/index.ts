import { readFileAsString } from "../../utils/readFileAsString.ts";
import path from "node:path";

type Point = { x: number; y: number };

function getNeighbors(x: number, y: number, width: number, height: number): Point[] {
    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];

    const neighbors: Point[] = [];
    for (const direction of directions) {
        const neighbourX = x + direction.x;
        const neighbourY = y + direction.y;
        if (
            neighbourX >= 0 &&
            neighbourX < width &&
            neighbourY >= 0 &&
            neighbourY < height
        ) {
            neighbors.push({ x: neighbourX, y: neighbourY });
        }
    }
    return neighbors;
}

function findReachableNinesFrom(start: Point, map: number[][]): Set<string> {
    const height = map.length;
    const width = map[0].length;

    const stack: Point[] = [start];
    const visited = new Set<string>();
    const foundNines = new Set<string>();

    while (stack.length > 0) {
        const current = stack.pop()!;
        const { x, y } = current;
        const key = `${x},${y}`;

        if (visited.has(key)) {
            continue;
        }

        visited.add(key);

        const currentHeight = map[y][x];

        if (currentHeight === 9) {
            foundNines.add(key);
            continue;
        }

        for (const neighbor of getNeighbors(x, y, width, height)) {
            if (map[neighbor.y][neighbor.x] === currentHeight + 1) {
                stack.push(neighbor);
            }
        }
    }

    return foundNines;
}

export default function day10_1() {
    const mapString = readFileAsString(
        path.join(import.meta.dirname, "dayTenInput.txt"),
    );

    const map = mapString.split("\n").map((line) => line.split("").map(Number));

    const height = map.length;
    const width = map[0].length;

    const trailheads: Point[] = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (map[y][x] === 0) {
                trailheads.push({ x, y });
            }
        }
    }

    let totalScore = 0;
    for (const th of trailheads) {
        const reachableNines = findReachableNinesFrom(th, map);
        totalScore += reachableNines.size;
    }

    console.log(`The total amount of paths is: ${totalScore}`);
}
