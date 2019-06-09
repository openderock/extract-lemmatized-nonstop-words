import test from 'ava';
import extract from './index.js';

test('text preprocessing', t => {
    const words = extract(`that is an email shirazy.sajjad@gmail.com and this is a url: [github.com].`);
    t.is(words.length, 2);
    t.is(words[0].vocabulary, 'email');
    t.is(words[1].vocabulary, 'url');
});

test('removing stop words', t => {
    const words = extract(`that is great!`);
    t.is(words[0].vocabulary, 'great');
});

test('handling contractions', t => {
    const words = extract(`that's great! but don’t take to long okay?`);
    t.is(words[0].vocabulary, 'great');
    t.is(words[2].vocabulary, 'long');
});

test('converting plural nouns to singular', t => {
    const words = extract(`it's his pens and here are my categories. Drink up, me hearties, yo ho`);
    t.is(words[0].vocabulary, 'pen');
    t.is(words[1].vocabulary, 'category');
    t.is(words[3].vocabulary, 'hearty');
    t.is(extract(`hearties`)[0].vocabulary, 'hearty');
});

test('handling present form (3rd person) of verbs', t => {
    const words = extract(`he throws!`);
    t.is(words[0].vocabulary, 'throw');
});

test('handling gerund form of verbs', t => {
    const words = extract(`he is running! i'm gonna scape.`);
    t.is(words[0].vocabulary, 'run');
    t.is(words[1].vocabulary, 'go');
    t.is(extract(`hunting`)[0].vocabulary, 'hunting');
    t.is(extract(`bring`)[0].vocabulary, 'bring');
    t.is(extract(`wing`)[0].vocabulary, 'wing');
});

test('handling regular past tense of verbs', t => {
    const words = extract(`he created this thing!`);
    t.is(words[0].vocabulary, 'create');
    t.is(extract(`limited`)[0].vocabulary, 'limit');
    t.is(extract(`interested`)[0].vocabulary, 'interest');
    t.is(extract(`proceed`)[0].vocabulary, 'proceed');
    t.is(extract(`sacred`)[0].vocabulary, 'sacred');
    t.is(extract(`preferred`)[0].vocabulary, 'prefer');
    t.is(extract(`colored`)[0].vocabulary, 'color');
    t.is(extract(`beloved`)[0].vocabulary, 'beloved');
    t.is(extract(`sophisticated`)[0].vocabulary, 'sophisticate');
});