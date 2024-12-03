export default function getReportArrays(input: string) {
    const splitFile = input.split("\n");

    return splitFile
        .map<Array<number>>((item) => {
            const splitItem = item.split(" ");

            return splitItem.map<number>((number) => parseInt(number));
        })
        .filter((item) => item.filter((number) => !Number.isNaN(number)).length > 0);
}
