export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number; // index
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the name of the kingdom ruled by the Baahubali family?",
    options: ["Kuntala", "Mahishmati", "Vijayanagara", "Hastinapura"],
    answer: 1,
  },
  {
    id: 2,
    question: "Who kills Amarendra Baahubali in the film?",
    options: ["Bhallaladeva", "Kattappa", "Bijjaladeva", "Kalakeya"],
    answer: 1,
  },
  {
    id: 3,
    question: "Who plays the dual role of Amarendra and Mahendra Baahubali?",
    options: ["Rana Daggubati", "Prabhas", "Sathyaraj", "Nassar"],
    answer: 1,
  },
  {
    id: 4,
    question: "What is the name of Amarendra Baahubali's wife?",
    options: ["Avantika", "Sivagami", "Devasena", "Kumari"],
    answer: 2,
  },
  {
    id: 5,
    question: "Who is the Rajmata of Mahishmati?",
    options: ["Devasena", "Sivagami", "Avantika", "Sanga"],
    answer: 1,
  },
  {
    id: 6,
    question: "What is Bhallaladeva's signature weapon?",
    options: ["Trishul", "Bow and arrow", "Mace (Gada)", "Chained sickle"],
    answer: 2,
  },
  {
    id: 7,
    question: "Which tribe raised Mahendra Baahubali (Shivudu)?",
    options: ["Kalakeya", "Kuntala", "Amburi", "Vaidyas"],
    answer: 2,
  },
  {
    id: 8,
    question: "What does Shivudu climb at the start of the first film?",
    options: ["The palace wall", "A giant waterfall", "Mount Mahishmati", "The royal statue"],
    answer: 1,
  },
  {
    id: 9,
    question: "Who is the enemy tribe defeated in the great war flashback?",
    options: ["Kalakeya", "Kuntala warriors", "Pindaris", "Rakshasas"],
    answer: 0,
  },
  {
    id: 10,
    question: "What is Kattappa's role in Mahishmati?",
    options: ["Court poet", "Royal slave and protector", "Prime minister", "Head priest"],
    answer: 1,
  },
  {
    id: 11,
    question: "Who directed the Baahubali films?",
    options: ["Rajamouli", "Shankar", "Mani Ratnam", "Rohit Shetty"],
    answer: 0,
  },
  {
    id: 12,
    question: "What is the famous question at the end of Baahubali: The Beginning?",
    options: [
      "Where is Devasena?",
      "Why Kattappa killed Baahubali?",
      "Who is the real king?",
      "What happened to Sivagami?",
    ],
    answer: 1,
  },
  {
    id: 13,
    question: "Which princess does Amarendra Baahubali fall in love with?",
    options: ["Avantika", "Devasena of Kuntala", "Tamannaah", "Sanga"],
    answer: 1,
  },
  {
    id: 14,
    question: "What ceremony does Bhallaladeva sabotage against Baahubali?",
    options: ["Coronation", "Wedding", "War council", "Harvest festival"],
    answer: 0,
  },
  {
    id: 15,
    question: "What weapon does Baahubali famously craft with three arrows at once?",
    options: ["Trident spear", "Triple-arrow bow", "Chakra", "Whip sword"],
    answer: 1,
  },
];
