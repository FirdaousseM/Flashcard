// Crée 3 sets aléatoires de 10 mots

const wordSet1 = ["serious", "consciousness", "economics", "resignation", "sticky", "funeral", "reference", "integrity", "integration", "store"];

const wordSet2 = ["abortion", "favorable", "variety", "introduction", "sanctuary", "stress", "remunerate", "play", "side", "seller"];

const wordSet3 = ["refrigerator", "criticism", "position", "nonremittal", "strip", "profile", "diagram", "mild", "coalition", "rescue"];

//shuffled arrays:

const set1 = wordSet1.sort(() => Math.random() - 0.5);
const set2 = wordSet2.sort(() => Math.random() - 0.5);
const set3 = wordSet3.sort(() => Math.random() - 0.5);


export const dictionaries = [
  set1,
  set2,
  set3
]


