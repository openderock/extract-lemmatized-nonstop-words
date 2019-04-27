# Extract lemmatized nonstop words

Extracts a pure list of lemmatized words of a text filtered by stop words

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
import extract from 'extract-lemmatized-nonstop-words';

const words = extract('He walked into the airport, past the banks of monitors.');
```