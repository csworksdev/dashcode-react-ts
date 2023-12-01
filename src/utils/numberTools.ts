export const getRandomRangeInt = (min: number, max: number) => {
    if (min == null || max == null) {
        return 1
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}