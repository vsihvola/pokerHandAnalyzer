//Deck class
class Deck {
    constructor() {
        this.deck = [];
    }

    //Making the deck
    make_deck() {
        let card = (suits, values) => {
            let value = values;
            let suit = suits;
            return {
                //                name: name,
                suit: suit,
                value: value

            }
        }
        for (let s = 0; s < suits.length; s++) {
            for (let v = 0; v < values.length; v++) {
                this.deck.push(card(suits[s], values[v]));
            }
        }
    }

    //Shuffle function
    shuffle() {
        for (let i = 0; i < shuffleTimes; i++) {
            const fromDeck = Math.floor((Math.random() * this.deck.length));
            const toDeck = Math.floor((Math.random() * this.deck.length));

            this.deck.splice(toDeck, 0, this.deck.splice(fromDeck, 1)[0]);
        }
    }

    //Deal it
    dealDeck() {
        return this.deck;
    }
}


//Analyzer
class handAnalyzer {
    constructor() {

    }

    //Check and print
    showResultsFromHands(hands) {

        hands.forEach((hand, num, check) => {
            translated += `\nPlayer ${num + 1} Results\n`;


            //Lets make it look simpler
            for (let c = 0; c < amountOfCards; c++) {

                //Replace 11,12,13,14 with J,Q,K,A
                switch (true) {
                    case (hands[num][c].value == 11):
                        hands[num][c].value = "J";
                        break;
                    case (hands[num][c].value == 12):
                        hands[num][c].value = "Q";
                        break;
                    case (hands[num][c].value == 13):
                        hands[num][c].value = "K";
                        break;
                    case (hands[num][c].value == 14):
                        hands[num][c].value = "A";
                        break;

                }

                //Add all to Array
                translated += `\n${hands[num][c].value} of ${hands[num][c].suit}`;

            }

            //Add handScore to Array
            translated += `\n\n${this.getHandScore(hand)}`;
            translated += `\n------------------------`;
            console.log(translated);

            //Store all translated text for printing purpose
            analyzeText += translated;


            //Empty for next player
            translated = [];

        });


    }

    //Lets check the score
    getHandScore(hand) {


        this.getHighestCard(hand);

        //consts for possible outcomes
        const pair = this.multipleAmountOfSameCard(hand, 2, null, true);
        const threeSame = this.multipleAmountOfSameCard(hand, 3, null, true);
        const fourSame = this.multipleAmountOfSameCard(hand, 4, null, true);
        const fullHouse = this.handFullHouse(hand);
        const handIsStraight = this.handIsStraight(hand);
        const handIsFlush = this.handIsFlush(hand);

        //Full house
        if (fullHouse) {
            return "You have full house!";
        }
        //Pair
        if (pair) {
            return `You have a pair of ${pair}`;
        }
        //Three same
        if (threeSame) {
            return `You have three of ${threeSame}`;
        }
        //Four same
        if (fourSame) {
            return `You have four of ${fourSame}`;
        }
        //Straigth
        if (handIsStraight) {
            return `You have straight!`;
        }
        //Flush
        if (handIsFlush) {
            return `You have a flush of ${hand.suit}`;
        }
        //Nothing.
        return `Empty hand`;
    }
    //Check card values if there is multiple same numbers. 
    //This is used for pair, threeSame, fourSame, fullHouse
    multipleAmountOfSameCard(cards, amount, ignore, returnSameValue) {
        const sameCardsInHand = cards.reduce((previousAmount, currentCard) => {
            previousAmount[currentCard.value] = previousAmount[currentCard.value] ? previousAmount[currentCard.value] + 1 : 1;
            return previousAmount;
        }, {});

        for (var card in sameCardsInHand) {
            if (sameCardsInHand.hasOwnProperty(card) && sameCardsInHand[card] === amount && card !== ignore) {
                return returnSameValue ? card : true;
            }
        }

        return false;
    }

    //Full house
    handFullHouse(hand) {
        const threeOfSame = this.multipleAmountOfSameCard(hand, 3, null, true);

        if (!threeOfSame) {
            return false;
        }

        const twoOfSame = this.multipleAmountOfSameCard(hand, 2, threeOfSame, false);

        if (!twoOfSame) {
            return false;
        }

        return true;
    }

    //Straigth
    handIsStraight(hand) {
        hand.sort((a, b) => {
            return a.value - b.value;
        });
        for (let i = 0; i < hand.length; i++) {
            if (i > 0 && hand[i].value - 1 !== hand[i - 1].value) {
                return false;
            }
        }
        return true;
    }

    //Flush
    handIsFlush(hand) {
        for (let i = 0; i < hand.length; i++) {
            if (i > 0 && hand[i].suit !== hand[i - 1].suit) {
                return false;

            }
        }
        return true;
    }

    getHighestCard(hand) {
        hand.sort((a, b) => {
            return a.value - b.value;
        });

        return hand[hand.length - 1];

    }
}


// If we shuffle and how many times
const shuffle = true;
const shuffleTimes = 1000;
//Our suits and values
const suits = [`Clubs`, `Spades`, `Diamonds`, `Hearts`];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// Amount of cards and players in a game
const amountOfPlayers = 3;
const amountOfCards = 5;
//handAnalyzer, Deck, hands
const HandAnalyzer = new handAnalyzer();
const deck = new Deck();
let hands = [];
//Array for simpler look of game
let translated = new Array();

//File writer
const fs = require("fs");
//File reader
const readFs = require("fs");
//String to store file data
let analyzeText = "";

//To read file and update analyzeText.
//If you want to only to write data and not read, this can be change to be comment.
readFs.readFile('Analysis.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    analyzeText += data.toString;
});

// Make a deck, shuffle it
function makeDraw() {
    deck.make_deck();
    deck.shuffle();

    //Deal for players
    for (let i = 0; i < amountOfPlayers; i++) {
        const startCount = i * amountOfCards;
        const hand = deck.dealDeck().slice(startCount, startCount + amountOfCards);
        hands.push(hand);
    }

    //Analyze and print
    HandAnalyzer.showResultsFromHands(hands);

    //End of run.
    analyzeText += `\n\nEnd of game\n\n------------------\n\n`

    //In the end, update a file
    fs.appendFile(`Analysis.txt`, analyzeText, (err) => {
        if (err) throw err;
        console.log(`Log saved.`)
    });
    //If you want to write new file everytime.
    /*fs.writeFile(`Analysis.txt`, analyzeText, (err) => {
        if (err) throw err;
        console.log(`Log saved.`)
    });*/



}

makeDraw();
