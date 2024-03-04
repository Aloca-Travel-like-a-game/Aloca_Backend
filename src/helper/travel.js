import axios from "axios";

const fetchRelatedWords = async (word) => {
    try {
        const urlApiWord = `https://api.datamuse.com/words?rel_trg=${word}`;
        const response = await axios.get(urlApiWord);
        return response.data.map(result => result.word)
    }
    catch (err) {
        console.error('Error fetching related words:', err);
        return [];
    }
}

const checkTravelRelatedWords = async (message) => {
    try {
        const words = message.split(" ");
        const relatedWords = [];
        for (const word of words) {
            const related = await fetchRelatedWords(word);
            relatedWords.push({ word, related });
        }

        console.log(relatedWords);
    }
    catch (err) {
        console.error("Error when check related words", err);
    }

}

export { checkTravelRelatedWords }