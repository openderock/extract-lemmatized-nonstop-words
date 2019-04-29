const tagger = require('wink-pos-tagger')();
const preprocessor = require('text-preprocessor');
const stopwords = require('stopwords-json/dist/en');
/**
 * Extracts a pure list of lemmatized words of a text filtered by stop words
 * @param {string} text
 */
function extract(text) {
    const normalizedText = preprocessor(text).defaults().toString();
    // console.log(normalizedText);
    return tagger.tagSentence(normalizedText).filter(token => {
        return token.tag == 'word' &&
            token.normal.length > 2 &&
            /^[a-z]+$/.test(token.normal) &&
            stopwords.indexOf(token.normal) == -1;
    }).map(token => {
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
                if (token.normal.substr(-2, 2) == 'ed') {
                    token.vocabulary = token.lemma;
                }
                break;
            default:
                break;
        }
        return token;
    });
};

module.exports = extract;