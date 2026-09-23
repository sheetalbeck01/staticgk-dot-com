export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
};

/**
 * Static starter bank (database comes later).
 * Keyed by TOPIC ref — subtopic and chapter quizzes reuse these.
 */
export const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  "GK-001": [
    {
      q: "Which Harappan site is known for its dockyard?",
      options: ["Lothal", "Mohenjo-daro", "Kalibangan", "Chanhudaro"],
      answer: 0,
      explanation: "Lothal (Gujarat) had a brick-built dockyard on the Bhogava river.",
    },
    {
      q: "Mohenjo-daro is situated in which present-day country?",
      options: ["India", "Pakistan", "Bangladesh", "Afghanistan"],
      answer: 1,
      explanation: "Mohenjo-daro lies in Larkana district, Sindh, Pakistan.",
    },
    {
      q: "The Great Bath was discovered at?",
      options: ["Harappa", "Lothal", "Mohenjo-daro", "Dholavira"],
      answer: 2,
      explanation: "The watertight Great Bath is the most famous structure of Mohenjo-daro.",
    },
    {
      q: "Which metal was first used by the Harappans?",
      options: ["Iron", "Copper", "Silver", "Gold"],
      answer: 1,
      explanation: "Copper was the first metal used; bronze came later by alloying.",
    },
    {
      q: "The script of the Indus Valley Civilization is?",
      options: ["Brahmi", "Kharosthi", "Undeciphered", "Sanskrit"],
      answer: 2,
      explanation: "The Harappan script has not been deciphered yet.",
    },
  ],
  "GK-014": [
    {
      q: "India became independent on?",
      options: ["26 Jan 1950", "15 Aug 1947", "3 Jun 1947", "20 Feb 1947"],
      answer: 1,
      explanation: "Power was transferred at midnight of 14–15 August 1947.",
    },
    {
      q: "The Mountbatten Plan was announced on?",
      options: ["3 June 1947", "20 Feb 1947", "15 Aug 1947", "26 Jan 1950"],
      answer: 0,
      explanation: "Lord Mountbatten's partition plan was announced on 3 June 1947.",
    },
    {
      q: "Who was the first Governor-General of independent India?",
      options: ["C. Rajagopalachari", "Lord Mountbatten", "Jawaharlal Nehru", "Sardar Patel"],
      answer: 1,
      explanation: "Mountbatten was first; Rajagopalachari was the first Indian Governor-General.",
    },
    {
      q: "The Cabinet Mission arrived in India in?",
      options: ["1942", "1945", "1946", "1947"],
      answer: 2,
      explanation: "The three-member Cabinet Mission reached India in March 1946.",
    },
    {
      q: "The Indian Independence Act was passed in?",
      options: ["August 1946", "July 1947", "June 1948", "January 1950"],
      answer: 1,
      explanation: "The British Parliament passed the Act in July 1947.",
    },
  ],
  "GK-015": [
    {
      q: "Which is the highest peak of India?",
      options: ["Kanchenjunga", "Nanda Devi", "K2 (Godwin-Austen)", "Kamet"],
      answer: 2,
      explanation: "K2 (8611 m) in the Karakoram is India's highest peak.",
    },
    {
      q: "Which range separates North India from South India?",
      options: ["Aravalli", "Satpura", "Vindhya", "Maikal"],
      answer: 2,
      explanation: "The Vindhya range forms the traditional North–South divide.",
    },
    {
      q: "Which is the oldest mountain range in India?",
      options: ["Himalayas", "Aravalli", "Western Ghats", "Nilgiri"],
      answer: 1,
      explanation: "The Aravalli range is among the oldest fold mountains in the world.",
    },
    {
      q: "Which pass connects Srinagar to Leh?",
      options: ["Nathu La", "Shipki La", "Zoji La", "Banihal"],
      answer: 2,
      explanation: "Zoji La on the Great Himalayan range links Srinagar with Leh.",
    },
    {
      q: "The Deccan Plateau is mainly made of?",
      options: ["Granite", "Sandstone", "Basaltic lava rock", "Limestone"],
      answer: 2,
      explanation: "The Deccan Traps were formed by volcanic basaltic lava flows.",
    },
  ],
  "GK-023": [
    {
      q: "The Constitution of India was adopted on?",
      options: ["26 Jan 1950", "15 Aug 1947", "26 Nov 1949", "9 Dec 1946"],
      answer: 2,
      explanation: "Adopted on 26 November 1949, enforced on 26 January 1950.",
    },
    {
      q: "Who was the chairman of the Drafting Committee?",
      options: ["Jawaharlal Nehru", "Rajendra Prasad", "B. R. Ambedkar", "Sardar Patel"],
      answer: 2,
      explanation: "Dr. B. R. Ambedkar chaired the 7-member Drafting Committee.",
    },
    {
      q: "The Preamble describes India as a?",
      options: [
        "Sovereign Socialist Secular Democratic Republic",
        "Sovereign Democratic Republic",
        "Federal Socialist Republic",
        "Unitary Secular Republic",
      ],
      answer: 0,
      explanation: "'Socialist' and 'Secular' were added by the 42nd Amendment, 1976.",
    },
    {
      q: "The first meeting of the Constituent Assembly was held on?",
      options: ["9 Dec 1946", "26 Nov 1949", "26 Jan 1950", "15 Aug 1947"],
      answer: 0,
      explanation: "The Assembly first met on 9 December 1946 under Sachchidananda Sinha.",
    },
    {
      q: "Who was the constitutional advisor to the Constituent Assembly?",
      options: ["B. R. Ambedkar", "B. N. Rau", "K. M. Munshi", "Alladi Krishnaswamy"],
      answer: 1,
      explanation: "Sir B. N. Rau prepared the initial draft of the Constitution.",
    },
  ],
  "GK-032": [
    {
      q: "What is the SI unit of force?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 2,
      explanation: "Force = mass × acceleration, measured in newtons (N).",
    },
    {
      q: "The speed of light in vacuum is approximately?",
      options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "1.5 × 10⁸ m/s"],
      answer: 1,
      explanation: "Light travels at about 3,00,000 km/s in vacuum.",
    },
    {
      q: "Which mirror is used in vehicle headlights?",
      options: ["Convex", "Plane", "Concave", "Cylindrical"],
      answer: 2,
      explanation: "Concave (parabolic) mirrors focus the bulb's light into a beam.",
    },
    {
      q: "According to Ohm's law, V equals?",
      options: ["I/R", "IR", "R/I", "I²R"],
      answer: 1,
      explanation: "Voltage = Current × Resistance (V = IR).",
    },
    {
      q: "Sound travels fastest through?",
      options: ["Vacuum", "Air", "Water", "Steel"],
      answer: 3,
      explanation: "Sound moves fastest in solids, slowest in gases; not at all in vacuum.",
    },
  ],
};
