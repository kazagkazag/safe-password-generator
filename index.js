const fs = require("fs");

const arguments = process.argv;
const dictionary = arguments.find(a => {
    return /^pl$|^en$/g.test(a);
});

if(!dictionary) {
    console.log();
    console.log("Syntax: safe-pass <dictionary>");
    console.log();
    console.log("- 'dictionary' - language code of available dictionaries from which passwords words will be choosen. "
    + "For now 'pl' or 'en' dictionaries are available.");
    console.log();
    console.log("Example: safe-pass en");
    console.log();
}
else {
    generate(`./dictionaries/${dictionary}`);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(dictionaryPath) {
    fs.readFile(dictionaryPath, "utf8", (error, data) => {
        if (error) throw error;
    
        const words = data.split(/\n/);
        const pass = [];
    
        for(let counter = 0; counter < 5; counter++) {
            pass.push(words[getRandomInt(0, words.length - 1)]);
        }
    
        console.log();
        console.log("Generating password from words: ", pass);
        console.log("=============================================");
        console.log(pass.join("").replace(/[0-9-]/g, "").toLowerCase());
        console.log("=============================================");
        console.log();
    });
}