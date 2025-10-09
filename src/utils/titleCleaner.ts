const titleCleaner = (title: string) => {
    const wordArray = title.split("-");

    const capitalizeWords = wordArray.map(word => {
        if (!word) {
            return ""
        }

        const firstLetter = word.charAt(0).toUpperCase();
        const restOfTheWord = word.slice(1).toLowerCase();

        return firstLetter + restOfTheWord
    })

    return capitalizeWords.join(" ");
}

export default titleCleaner;