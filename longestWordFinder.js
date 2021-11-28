import fetch from 'node-fetch';

const TaskWordFinder = async (s,wordsInText) => {
    const filterArray = words => {
        const sArray = s.split('')
        const wordArray = words.split('');

        wordArray.forEach( letter => {
            const position = sArray.indexOf(letter);
            if (position >= 0) {
                sArray.splice(position, 1);
            }
        })

        if (sArray.length === 0) {
            return true;
        }
    }

    return wordsInText.filter(filterArray);
}

const longestWordSelect = (wordFound = []) => {
    let lengthOfBiggestWord = 0;
    let longestWordInArray;
    wordFound.forEach( word => {
        if (word.length > lengthOfBiggestWord) {
                longestWordInArray = word;
                lengthOfBiggestWord = word.length;
            }
        }
    )
    return longestWordInArray;
}

const dictionairyList = async () => {
    const text = 'https://goo.gl/aoEr9Q';
    return fetch (text)
            .then ( r => r.text())
            .then ( r => r.split(/\s+/))
}

async function longestWord (word) {
    const listOfAllMatchingWords = await TaskWordFinder(word, await dictionairyList());
    return await longestWordSelect(listOfAllMatchingWords);
}

console.log( await longestWord('tion'));