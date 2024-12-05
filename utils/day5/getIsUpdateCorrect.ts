export default function isUpdateCorrect(
    update: number[],
    orderingRulesBefore: Array<number>,
    orderingRulesAfter: Array<number>,
) {
    return update.every((printNumber, printNumberIndex) => {
        const orderingRulesIndices = orderingRulesAfter.reduce<Array<number>>(
            (acc, rule, ruleIndex) => {
                if (rule === printNumber) {
                    const beforeNumber = orderingRulesBefore[ruleIndex];

                    if (update.includes(beforeNumber)) {
                        return [...acc, ruleIndex];
                    }
                }
                return acc;
            },
            [],
        );

        if (orderingRulesIndices.length === 0) {
            return true;
        }

        return orderingRulesIndices.every((index) => {
            const numberBefore = orderingRulesBefore[index];
            return update.slice(0, printNumberIndex + 1).includes(numberBefore);
        });
    });
}
