# Extract lemmatized nonstop words

Extracts a pure list of lemmatized words of a text filtered by stop words.

## Features
* Removing stopwords.
* Removing proper noun.
* Regular past tense verb and past participle verb to present form: `created` to `create`
* Present form (3rd person) to present form: `creates` to `create`
* Plural noun to singular: `cats` to `cat`
* Gerund form verb to present form: `creating` to `create`

## Install
install using Yarn:
```
yarn add extract-lemmatized-nonstop-words
```
install using NPM:
```
npm i --save extract-lemmatized-nonstop-words
```

## Usage
```javascript
const extract = require('extract-lemmatized-nonstop-words');

const words = extract('He created these categories and they are better.');
```
returns:
```
Array (3 items)
    0: Object
        lemma: "create"
        normal: "created"
        pos: "VBD"
        tag: "word"
        value: "created"
        vocabulary: "create"
    1: Object
        lemma: "category"
        normal: "categories"
        pos: "NNS"
        tag: "word"
        value: "categories"
        vocabulary: "category"
    2: Object
        lemma: "good"
        normal: "better"
        pos: "JJR"
        tag: "word"
        value: "better"
        vocabulary: "better"
```

## API
<a name="extract"></a>

### extract(text, filter) ⇒ <code>Array.&lt;Object&gt;</code>
Extracts a pure list of lemmatized words of a text filtered by stop words. it will remove non-word tokens, ones which their length is less than 3 and contains non-alphabetic charachters.

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | input text |
| filter | <code>Array.&lt;String&gt;</code> | list of custom stopword which will replace with defaults, in case of passing `false` filtering  results by stopwords will ignore. |

## Annotation Specification

Annotation | Name | Example
--- | --- | ---
**`NN`** | Noun | `dog` `man`
**`NNS`** | Plural noun | `dogs` `men`
**`NNP`** | Proper noun | `London` `Alex`
**`NNPS`** | Plural proper noun | `Smiths`
**`VB`** | Base form verb | `be`
**`VBP`** | Present form verb | `throw`
**`VBZ`** | Present form (3rd person) | `throws`
**`VBG`** | Gerund form verb | `throwing`
**`VBD`** | Past tense verb | `threw`
**`VBN`** | Past participle verb | `thrown`
**`MD`** | Modal verb | `can` `shall` `will` `may` `must` `ought`
**`JJ`** | Adjective | `big` `fast`
**`JJR`** | Comparative adjective | `bigger`
**`JJS`** | Superlative adjective | `biggest`
**`RB`** | Adverb | `not` `quickly` `closely`
**`RBR`** | Comparative adverb | `less-closely` `faster`
**`RBS`** | Superlative adverb | `fastest`
**`DT`** | Determiner | `the` `a` `some` `both`
**`PDT`** | Predeterminer | `all` `quite`
**`PRP`** | Personal Pronoun | `I` `you` `he` `she`
**`PRP$`** | Possessive Pronoun | `I` `you` `he` `she`
**`POS`** | Possessive ending | `'s`
**`IN`** | Preposition | `of` `by` `in`
**`PR`** | Particle | `up` `off`
**`TO`** | *to* | `to`
**`WDT`** | Wh-determiner | `which` `that` `whatever` `whichever`
**`WP`** | Wh-pronoun | `who` `whoever` `whom` `what`
**`WP$`** | Wh-possessive | `whose`
**`WRB`** | Wh-adverb | `how` `where` 
**`EX`** | Expletive there | `there`
**`CC`** | Coordinating conjugation | `&` `and` `nor` `or`
**`CD`** | Cardinal Numbers | `1` `7` `77` `one`
**`LS`** | List item marker | `1` `B` `C` `One`
**`UH`** | Interjection | `ah` `oh` `oops`
**`FW`** | Foreign Words | `viva` `mon` `toujours`
**`,`** | Comma | `,`
**`:`** |Mid-sent punct | `:` `;` `...`
**`.`** | Sent-final punct. | `.` `!` `?`
**`(`** | Left parenthesis | `)` `}` `]`
**`)`** | Right parenthesis | `(` `{` `[`
**`#`** | Pound sign | `#`
**`$`** | Currency symbols | `$` `€` `£` `¥`
**`SYM`** | Other symbols | `+` `*` `/` `<` `>`
**`EM`** | Emojis & emoticons | `:)` `❤`