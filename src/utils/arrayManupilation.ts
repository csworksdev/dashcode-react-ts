export const groupObject = (list: any[], keyGetter: any) => {
    const map = new Map();
    list.forEach((item: any) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export const removeDuplicateObjects = (array: any) => {
    const seenObjects = new Set();
    return array.filter((item: any) => {
        const itemString = JSON.stringify(item);
        if (!seenObjects.has(itemString)) {
            seenObjects.add(itemString);
            return true;
        }
        return false;
    });
}

export const IsArrayIncluded = (array: any[], matcher: string) => {
    if (array == null || array.length === 0) {
        return false
    }

    let res = false
    for (let i = 0; i < array.length; i++) {
        if (array[i] === matcher) {
            res = true
        }
    }
    return res
}