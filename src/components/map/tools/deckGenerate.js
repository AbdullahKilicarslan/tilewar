import  generalTools  from '../../../tools/generalTools';
import  deck1  from './decks/deck1';


const Deck1 = () => {
    return generalTools.shuffleArray(deck1) ;
};
const Deck2 = () => {
    return generalTools.shuffleArray(deck1) ;
};
const Deck3 = () => {
    return generalTools.shuffleArray(deck1) ;
};


const generateByName = (mapName) => {
    if (deckGenerate[mapName]) {
        const result = deckGenerate[mapName]();
        return result;
    } else {
        return null;
    }
};
const deckGenerate = {
   Deck1,Deck2,Deck3,
    generateByName
};

export default deckGenerate;