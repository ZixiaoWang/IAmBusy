function randomItem(array = []) {
    if (array instanceof Array === false || array.length === 0) {
        return undefined;
    }

    const length = array.length;
    let randomIndex = Math.round(Math.random() * length) || 0;

    if (randomIndex === length) {
        randomIndex = randomIndex - 1 || 0;
    }

    return array[randomIndex];
}

module.exports = randomItem;