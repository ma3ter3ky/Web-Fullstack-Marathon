const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');
const ListAvengerQuotes = require('./ListAvengerQuotes');

const quoteList = new ListAvengerQuotes();

quoteList.add(new AvengerQuote({
    id: 1,
    author: 'Tony Stark',
    quote: "Sometimes you gotta run before you can walk.",
    photo: ['images/ironman.jpg'],
    comments: [new Comment("Classic Stark"), new Comment("Still iconic")]
}));

quoteList.add(new AvengerQuote({
    id: 2,
    author: 'Steve Rogers',
    quote: "I can do this all day.",
    photo: ['images/captain.jpg'],
    comments: [new Comment("Legendary"), new Comment("Go Cap!")]
}));

quoteList.add(new AvengerQuote({
    id: 3,
    author: 'Thor',
    quote: "Bring me Thanos!",
    photo: ['images/thor.jpg'],
    comments: [new Comment("Goosebumps"), new Comment("His finest moment")]
}));

quoteList.add(new AvengerQuote({
    id: 4,
    author: 'Natasha Romanoff',
    quote: "I've got red in my ledger. I'd like to wipe it out.",
    photo: ['images/blackwidow.jpg'],
    comments: [new Comment("Emotional"), new Comment("Powerful line")]
}));

console.log('BEFORE XML:');
console.log(JSON.stringify(quoteList.quotes, null, 2));

quoteList.toXML('quotes.xml');

const loadedList = new ListAvengerQuotes();
loadedList.fromXML('quotes.xml');

setTimeout(() => {
    console.log('\nAFTER XML:');
    console.log(JSON.stringify(loadedList.quotes, null, 2));
}, 100);
