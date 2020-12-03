function randomNumber(rangeStart, rangeEnd) {
    const start = isNaN(rangeStart) ? 0 : rangeStart;
    const end = isNaN(rangeEnd) ? 100 : (rangeEnd > start ? rangeEnd : (start + 100));

    return Math.round(Math.random() * (end - start)) + start;
}

module.exports = randomNumber;