const tagger = require('wink-pos-tagger')();
const lemmatize = require("wink-lemmatizer")
const preprocessor = require('text-preprocessor');
const stopwords = require('./stopwords/en');

tagger.updateLexicon({
    ooh: ['UH']
});

/**
 * Extracts a pure list of lemmatized words of a text filtered by stop words. it will remove non-word tokens, ones which their length is less than 3 and contains non-alphabetic charachters.
 * 
 * @param {String} text input text
 * @param {String[]} filter list of custom stopword which will replace with defaults, in case of passing `false` filtering  results by stopwords will ignore.
 * @returns {Object[]}
 */
function extract(text, filter) {
    const normalizedText = preprocessor(text).defaults().toString();
    // console.log(normalizedText);
    const tokens = tagger.tagSentence(normalizedText).filter(token => {
        return token.tag == 'word' &&
            token.normal.length > 2 &&
            /^[a-z]+$/.test(token.normal);
    }).map(token => {
        if (token.pos != 'VBG' && /ing$/.test(token.normal)) {
            token.pos = 'VBG';
            token.lemma = lemmatize.verb(token.normal);
        }
        token.vocabulary = token.normal;
        switch (token.pos) {
            // https://github.com/finnlp/en-pos#readme
            // 'cars' to 'car'
            case 'NNS':
            case 'NNPS':
                if (token.normal.substr(-1, 1) == 's') {
                    token.vocabulary = token.lemma;
                }
                break;
            // 'runs' to 'run'
            case 'VBZ':
            // 'running' to 'run'
            case 'VBG':
                token.vocabulary = token.lemma;
                break;
            // 'wanted' to 'want'
            case 'VBD':
            case 'VBN':
                if (token.normal.substr(-2, 2) == 'ed') {
                    token.vocabulary = token.lemma;
                }
                break;
            // 'limited' to 'limit'
            case 'JJ':
                if (token.normal.substr(-2, 2) == 'ed') {
                    token.vocabulary = lemmatize.verb(token.normal);
                }
                break;
            default:
                break;
        }
        return token;
    });
    return filter === false ? tokens : tokens.filter(token => (filter ? filter : stopwords).indexOf(token.vocabulary) == -1);
};

module.exports = extract;