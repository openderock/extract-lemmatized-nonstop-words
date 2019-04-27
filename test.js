import test from 'ava';
import extract from './index.js';

test('removing stop words', t => {
    const words = extract(`that is great!`);
    t.is(words[0].vocabulary, 'great');
});

test('handling contractions', t => {
    const words = extract(`that's great!`);
    t.is(words[0].vocabulary, 'great');
});

test('converting plural nouns to singular', t => {
    const words = extract(`it's his pens and here are my categories.`);
    t.is(words[0].vocabulary, 'pen');
    t.is(words[1].vocabulary, 'category');
});

test('handling present form (3rd person) of verbs', t => {
    const words = extract(`he throws!`);
    t.is(words[0].vocabulary, 'throw');
});

test('handling gerund form of verbs', t => {
    const words = extract(`he is running!`);
    t.is(words[0].vocabulary, 'run');
});

test('handling regular past tense of verbs', t => {
    const words = extract(`he created this thing!`);
    t.is(words[0].vocabulary, 'create');
});