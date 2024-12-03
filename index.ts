import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

setTimeout(() => {
    console.info(
        "\n\nWelcome to Advent of Code 2024!\n-----------------------------\n",
    );
    rl.question("Which day would you want to run? [1 - 25]:   ", (day: string) => {
        const dayNumber = parseInt(day);

        if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
            console.error(
                "Invalid day number. Please enter a number between 1 and 25.",
            );
            rl.close();
            return;
        }

        rl.question(
            "Which part would you want to run? [1 - 2]:   ",
            async (part: string) => {
                const partNumber = parseInt(part);

                if (isNaN(partNumber) || partNumber < 1 || partNumber > 2) {
                    console.error(
                        "Invalid part number. Please enter either 1 or 2.",
                    );
                    rl.close();
                    return;
                }

                const { default: runDay } = (await import(
                    `./days/day${day}_${part}/index.ts`
                )) as { default: () => void };
                runDay();
                rl.close();
            },
        );
    });
}, 500);
