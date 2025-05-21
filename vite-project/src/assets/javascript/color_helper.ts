export function numberToPastelRainbowColor(colorNumber: number): string {
    if (colorNumber < 0) {
        throw new Error('Number must not be negative');
    }
    const colorNames = ["red", "blue", "yellow"];
    const index = colorNumber % colorNames.length;
    return colorNames[index];
}