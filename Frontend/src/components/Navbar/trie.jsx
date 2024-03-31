
// function TrieNode(letter) {
//   // properties 
//   this.letter = letter;
//   this.prevLetter = null;
//   this.nextLetters = {}; // an object for the following letters
//   this.isComplete = false; // check whether letter is last of word

//   //methods
//   this.getWord = getWord;

//   // iterates through nodes to get word prediction
//   function getWord() {
//     var node = this;
//     var wordLetters = [];
//     while (node.prevLetter) {
//       wordLetters.unshift(node.letter);
//       node = node.prevLetter; // set the previous letter as node
//     }
//     return wordLetters.join("");
//   };
// }

// function Trie() {
//   // properties
//   this.root = new TrieNode(null);

//   // methods
//   this.insert = insert; // insert new word in trie
//   this.contains = contains; // check if word exists
//   this.find = find; // find words similar with previous letters

//   // insert new word in Trie
//   function insert(word) {
//     var node = this.root; // set first node to root node
//     for (let i = 0; i < word.length; i++) {
//       const current_letter = word[i];
//       if (!node.nextLetters[current_letter]) { // if letter not in next letters
//         node.nextLetters[current_letter] = new TrieNode(current_letter); // make it node
//         node.nextLetters[current_letter].prevLetter = node; // add it as a child node
//       }
//       node = node.nextLetters[current_letter]; // reset node to current letter & continue iteration

//       // check whether whole word is inserted
//       if (i === word.length - 1) {
//         node.isComplete = true;
//       }
//     }
//   };

//   // check if word exists
//   function contains(word) {
//     var node = this.root; // set first node to root node
//     for (let i = 0; i < word.length; i++) {
//       const current_letter = word[i];
//       let next_node = node.nextLetters[current_letter];
//       if (next_node) { // if letter is one of next letters
//         node = next_node; // set it as a next node
//       } else {
//         return false;
//       }
//     }
//     return node.isComplete; // definitely returns 'true'
//   };

//   // find words with similar previous letters
//   function find(clue_letters) {
//     var node = this.root; // set first node to root node
//     var output = [];
//     for (let i = 0; i < clue_letters.length; i++) {
//       const clue_letter = clue_letters[i];
//       let next_node = node.nextLetters[clue_letter];
//       if (next_node) { // if clue letter is one of next letters
//         node = next_node; // set it as next node
//       } else {
//         return output;
//       }
//     }

//     // use the last node to find the next possible words
//     findAllWords(node, output);
//     return output;
//   };

//   // function that finds next possible words
//   function findAllWords(node, arr) {
//     if (node.isComplete) { // check if node is end node
//       arr.unshift(node.getWord()); // get all words and add them to array
//     }

//     // otherwise recursively call the next nodes
//     for (var next_letter in node.nextLetters) {
//       findAllWords(node.nextLetters[next_letter], arr);
//     }
//   }
// }

// export default Trie;

// // var fs = require('fs');
// // var text = fs.readFileSync("./sample.txt", 'utf-8');
// // var words = text.replace(/[.,\/#!$%^&\^&\*;:{}=\-_`~()?]/g,"").replace(/(\r\n|\n|\r)/gm, ' ').split(' ')

// // var myTrie = new Trie();
// // for (let i = 0; i < words.length; i++) {
// //     const word = words[i];
// //     myTrie.insert(word)
// //     console.log(word)
// // }

// //console.log(myTrie.find('te'))


class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode();
      }
      node = node.children[word[i]];
    }
    node.isWord = true;
  }

  suggestHelper(root, list, curr) {
    if (root.isWord) {
      list.push(curr);
    }
    if (!Object.keys(root.children).length) {
      return;
    }
    for (let child in root.children) {
      this.suggestHelper(root.children[child], list, curr + child);
    }
  }

  suggest(prefix) {
    let node = this.root;
    let curr = "";
    for (let i = 0; i < prefix.length; i++) {
      if (!node.children[prefix[i]]) {
        return [];
      }
      node = node.children[prefix[i]];
      curr += prefix[i];
    }
    let list = [];
    this.suggestHelper(node, list, curr);
    return list;
  }
}

export default Trie;
