export type Subtopic = { ref: string; title: string; questions: number };
export type Topic = {
  ref: string;
  title: string;
  questions: number;
  subtopics: Subtopic[];
};
export type Chapter = { ref: string; title: string; description: string; topics: Topic[] };

export const SYLLABUS: Chapter[] = [
  {
    ref: "CH-01",
    title: "Ancient Indian History",
    description:
      "From Harappan streets to Gupta temples — India's earliest civilizations, empires and ideas.",
    topics: [
      {
        ref: "GK-001",
        title: "Indus Valley Civilization",
        questions: 30,
        subtopics: [
          { ref: "GK-001.1", title: "Major Sites", questions: 12 },
          { ref: "GK-001.2", title: "Town Planning & Daily Life", questions: 10 },
          { ref: "GK-001.3", title: "Decline & Legacy", questions: 8 },
        ],
      },
      {
        ref: "GK-002",
        title: "Vedic Age",
        questions: 25,
        subtopics: [
          { ref: "GK-002.1", title: "Early Vedic Period", questions: 13 },
          { ref: "GK-002.2", title: "Later Vedic Period", questions: 12 },
        ],
      },
      {
        ref: "GK-003",
        title: "Buddhism & Jainism",
        questions: 30,
        subtopics: [
          { ref: "GK-003.1", title: "Buddha & Teachings", questions: 12 },
          { ref: "GK-003.2", title: "Mahavira & Jainism", questions: 10 },
          { ref: "GK-003.3", title: "Councils & Literature", questions: 8 },
        ],
      },
      {
        ref: "GK-004",
        title: "Mauryan Empire",
        questions: 25,
        subtopics: [
          { ref: "GK-004.1", title: "Chandragupta & Ashoka", questions: 13 },
          { ref: "GK-004.2", title: "Administration & Economy", questions: 12 },
        ],
      },
      {
        ref: "GK-005",
        title: "Guptas & Harshavardhana",
        questions: 25,
        subtopics: [
          { ref: "GK-005.1", title: "Gupta Rulers", questions: 13 },
          { ref: "GK-005.2", title: "Art, Science & Literature", questions: 12 },
        ],
      },
    ],
  },
  {
    ref: "CH-02",
    title: "Medieval Indian History",
    description:
      "Sultanates, Vijayanagara, Mughals and Marathas — eight centuries that shaped the subcontinent.",
    topics: [
      {
        ref: "GK-006",
        title: "Delhi Sultanate",
        questions: 30,
        subtopics: [
          { ref: "GK-006.1", title: "Slave to Tughlaq", questions: 12 },
          { ref: "GK-006.2", title: "Khilji & Administration", questions: 10 },
          { ref: "GK-006.3", title: "Sayyid–Lodi & Decline", questions: 8 },
        ],
      },
      {
        ref: "GK-007",
        title: "Vijayanagara & Bahmani",
        questions: 20,
        subtopics: [
          { ref: "GK-007.1", title: "Sangama & Krishnadeva Raya", questions: 11 },
          { ref: "GK-007.2", title: "Bahmani Kingdoms", questions: 9 },
        ],
      },
      {
        ref: "GK-008",
        title: "Mughal Empire",
        questions: 35,
        subtopics: [
          { ref: "GK-008.1", title: "Babur to Akbar", questions: 14 },
          { ref: "GK-008.2", title: "Jahangir to Aurangzeb", questions: 12 },
          { ref: "GK-008.3", title: "Administration & Culture", questions: 9 },
        ],
      },
      {
        ref: "GK-009",
        title: "Marathas & Sikhs",
        questions: 20,
        subtopics: [
          { ref: "GK-009.1", title: "Shivaji & Peshwas", questions: 11 },
          { ref: "GK-009.2", title: "Sikh Gurus & Khalsa", questions: 9 },
        ],
      },
    ],
  },
  {
    ref: "CH-03",
    title: "Modern Indian History",
    description:
      "Colonial rule to freedom — the movements, leaders and milestones of independent India.",
    topics: [
      {
        ref: "GK-010",
        title: "Europeans & British Rule",
        questions: 25,
        subtopics: [
          { ref: "GK-010.1", title: "Trading Companies", questions: 12 },
          { ref: "GK-010.2", title: "Conquests & Administration", questions: 13 },
        ],
      },
      {
        ref: "GK-011",
        title: "Revolt of 1857",
        questions: 20,
        subtopics: [
          { ref: "GK-011.1", title: "Causes & Course", questions: 11 },
          { ref: "GK-011.2", title: "Leaders & Aftermath", questions: 9 },
        ],
      },
      {
        ref: "GK-012",
        title: "National Movement I",
        questions: 30,
        subtopics: [
          { ref: "GK-012.1", title: "Congress & Moderates", questions: 12 },
          { ref: "GK-012.2", title: "Extremists & Revolutionaries", questions: 10 },
          { ref: "GK-012.3", title: "Home Rule & Lucknow Pact", questions: 8 },
        ],
      },
      {
        ref: "GK-013",
        title: "Gandhian Movements",
        questions: 35,
        subtopics: [
          { ref: "GK-013.1", title: "Non-Cooperation & Khilafat", questions: 12 },
          { ref: "GK-013.2", title: "Civil Disobedience", questions: 12 },
          { ref: "GK-013.3", title: "Quit India & INA", questions: 11 },
        ],
      },
      {
        ref: "GK-014",
        title: "Independence & Partition",
        questions: 20,
        subtopics: [
          { ref: "GK-014.1", title: "Cabinet Mission & Mountbatten Plan", questions: 10 },
          { ref: "GK-014.2", title: "Making of the Constitution", questions: 10 },
        ],
      },
    ],
  },
  {
    ref: "CH-04",
    title: "Indian Geography",
    description:
      "Mountains, rivers, monsoons and soils — the physical and economic geography of India.",
    topics: [
      {
        ref: "GK-015",
        title: "Physiography of India",
        questions: 30,
        subtopics: [
          { ref: "GK-015.1", title: "The Himalayas", questions: 12 },
          { ref: "GK-015.2", title: "Plains, Plateaus & Coasts", questions: 10 },
          { ref: "GK-015.3", title: "Passes & Islands", questions: 8 },
        ],
      },
      {
        ref: "GK-016",
        title: "Rivers & Lakes",
        questions: 30,
        subtopics: [
          { ref: "GK-016.1", title: "Himalayan Rivers", questions: 12 },
          { ref: "GK-016.2", title: "Peninsular Rivers", questions: 10 },
          { ref: "GK-016.3", title: "Lakes & Waterfalls", questions: 8 },
        ],
      },
      {
        ref: "GK-017",
        title: "Climate, Soils & Agriculture",
        questions: 30,
        subtopics: [
          { ref: "GK-017.1", title: "Monsoon & Seasons", questions: 11 },
          { ref: "GK-017.2", title: "Soils of India", questions: 9 },
          { ref: "GK-017.3", title: "Crops & Irrigation", questions: 10 },
        ],
      },
      {
        ref: "GK-018",
        title: "Minerals & Industries",
        questions: 25,
        subtopics: [
          { ref: "GK-018.1", title: "Minerals & Belts", questions: 12 },
          { ref: "GK-018.2", title: "Industries & Transport", questions: 13 },
        ],
      },
    ],
  },
  {
    ref: "CH-05",
    title: "World Geography",
    description:
      "The planet and its people — landforms, climate zones, continents and countries.",
    topics: [
      {
        ref: "GK-019",
        title: "Universe & Earth",
        questions: 25,
        subtopics: [
          { ref: "GK-019.1", title: "Solar System", questions: 12 },
          { ref: "GK-019.2", title: "Latitudes, Longitudes & Time", questions: 13 },
        ],
      },
      {
        ref: "GK-020",
        title: "Landforms & Oceans",
        questions: 25,
        subtopics: [
          { ref: "GK-020.1", title: "Mountains & Plateaus", questions: 12 },
          { ref: "GK-020.2", title: "Oceans & Currents", questions: 13 },
        ],
      },
      {
        ref: "GK-021",
        title: "Atmosphere & Climate",
        questions: 20,
        subtopics: [
          { ref: "GK-021.1", title: "Layers & Pressure Belts", questions: 10 },
          { ref: "GK-021.2", title: "Cyclones & Climate Zones", questions: 10 },
        ],
      },
      {
        ref: "GK-022",
        title: "Continents & Countries",
        questions: 25,
        subtopics: [
          { ref: "GK-022.1", title: "Continents & Deserts", questions: 12 },
          { ref: "GK-022.2", title: "Countries, Capitals & Boundaries", questions: 13 },
        ],
      },
    ],
  },
  {
    ref: "CH-06",
    title: "Indian Polity",
    description:
      "How India is governed — Constitution, rights, Parliament, courts and federalism.",
    topics: [
      {
        ref: "GK-023",
        title: "Constitution & Preamble",
        questions: 25,
        subtopics: [
          { ref: "GK-023.1", title: "Making of the Constitution", questions: 12 },
          { ref: "GK-023.2", title: "Features & Preamble", questions: 13 },
        ],
      },
      {
        ref: "GK-024",
        title: "Rights & Duties",
        questions: 25,
        subtopics: [
          { ref: "GK-024.1", title: "Fundamental Rights", questions: 14 },
          { ref: "GK-024.2", title: "DPSP & Duties", questions: 11 },
        ],
      },
      {
        ref: "GK-025",
        title: "Union Government",
        questions: 30,
        subtopics: [
          { ref: "GK-025.1", title: "President & Vice-President", questions: 12 },
          { ref: "GK-025.2", title: "Parliament & Prime Minister", questions: 10 },
          { ref: "GK-025.3", title: "Amendments & Emergency", questions: 8 },
        ],
      },
      {
        ref: "GK-026",
        title: "Judiciary & Federal System",
        questions: 25,
        subtopics: [
          { ref: "GK-026.1", title: "Supreme & High Courts", questions: 13 },
          { ref: "GK-026.2", title: "Centre–State Relations", questions: 12 },
        ],
      },
      {
        ref: "GK-027",
        title: "States & Local Governance",
        questions: 20,
        subtopics: [
          { ref: "GK-027.1", title: "Governor & State Legislature", questions: 10 },
          { ref: "GK-027.2", title: "Panchayati Raj & Municipalities", questions: 10 },
        ],
      },
    ],
  },
  {
    ref: "CH-07",
    title: "Indian Economy",
    description:
      "Money, markets and growth — banking, budgets, planning and development.",
    topics: [
      {
        ref: "GK-028",
        title: "Basics & Sectors",
        questions: 20,
        subtopics: [
          { ref: "GK-028.1", title: "Concepts & Sectors", questions: 10 },
          { ref: "GK-028.2", title: "Growth & Indices", questions: 10 },
        ],
      },
      {
        ref: "GK-029",
        title: "Planning & Development",
        questions: 20,
        subtopics: [
          { ref: "GK-029.1", title: "Five-Year Plans", questions: 10 },
          { ref: "GK-029.2", title: "NITI Aayog & Schemes", questions: 10 },
        ],
      },
      {
        ref: "GK-030",
        title: "Banking & RBI",
        questions: 25,
        subtopics: [
          { ref: "GK-030.1", title: "Banks & Nationalisation", questions: 12 },
          { ref: "GK-030.2", title: "RBI & Monetary Policy", questions: 13 },
        ],
      },
      {
        ref: "GK-031",
        title: "Budget & Taxation",
        questions: 20,
        subtopics: [
          { ref: "GK-031.1", title: "Budget & Deficits", questions: 10 },
          { ref: "GK-031.2", title: "Taxes & GST", questions: 10 },
        ],
      },
    ],
  },
  {
    ref: "CH-08",
    title: "General Science",
    description:
      "Everyday science for exams — physics, chemistry and biology essentials.",
    topics: [
      {
        ref: "GK-032",
        title: "Physics",
        questions: 35,
        subtopics: [
          { ref: "GK-032.1", title: "Motion, Force & Energy", questions: 13 },
          { ref: "GK-032.2", title: "Light, Sound & Heat", questions: 12 },
          { ref: "GK-032.3", title: "Electricity & Magnetism", questions: 10 },
        ],
      },
      {
        ref: "GK-033",
        title: "Chemistry",
        questions: 30,
        subtopics: [
          { ref: "GK-033.1", title: "Matter & Atoms", questions: 12 },
          { ref: "GK-033.2", title: "Acids, Bases & Salts", questions: 10 },
          { ref: "GK-033.3", title: "Metals & Everyday Chemistry", questions: 8 },
        ],
      },
      {
        ref: "GK-034",
        title: "Biology I — Human Body",
        questions: 30,
        subtopics: [
          { ref: "GK-034.1", title: "Cell & Tissues", questions: 12 },
          { ref: "GK-034.2", title: "Body Systems", questions: 10 },
          { ref: "GK-034.3", title: "Digestion & Circulation", questions: 8 },
        ],
      },
      {
        ref: "GK-035",
        title: "Biology II — Plants & Health",
        questions: 25,
        subtopics: [
          { ref: "GK-035.1", title: "Plants & Photosynthesis", questions: 10 },
          { ref: "GK-035.2", title: "Nutrition, Disease & Vitamins", questions: 9 },
          { ref: "GK-035.3", title: "Environment Basics", questions: 6 },
        ],
      },
    ],
  },
  {
    ref: "CH-09",
    title: "Miscellaneous Static GK",
    description:
      "High-yield static facts — sports, awards, books, days and firsts.",
    topics: [
      {
        ref: "GK-036",
        title: "Sports & Trophies",
        questions: 20,
        subtopics: [
          { ref: "GK-036.1", title: "Cricket, Hockey & Olympics", questions: 11 },
          { ref: "GK-036.2", title: "Cups & Trophies", questions: 9 },
        ],
      },
      {
        ref: "GK-037",
        title: "Awards & Honours",
        questions: 20,
        subtopics: [
          { ref: "GK-037.1", title: "National Awards", questions: 11 },
          { ref: "GK-037.2", title: "International Prizes", questions: 9 },
        ],
      },
      {
        ref: "GK-038",
        title: "Books & Authors",
        questions: 20,
        subtopics: [
          { ref: "GK-038.1", title: "Indian Authors", questions: 11 },
          { ref: "GK-038.2", title: "World Classics", questions: 9 },
        ],
      },
      {
        ref: "GK-039",
        title: "Days, Dates & Firsts",
        questions: 20,
        subtopics: [
          { ref: "GK-039.1", title: "Important Days", questions: 10 },
          { ref: "GK-039.2", title: "Firsts in India & World", questions: 10 },
        ],
      },
    ],
  },
];

export type QuizNode =
  | { kind: "chapter"; chapter: Chapter }
  | { kind: "topic"; chapter: Chapter; topic: Topic }
  | { kind: "subtopic"; chapter: Chapter; topic: Topic; subtopic: Subtopic };

/** Resolve any ref (CH-01, GK-014, GK-014.1) to its syllabus node. */
export function findNode(rawRef: string): QuizNode | null {
  const ref = rawRef.trim().toUpperCase();
  for (const chapter of SYLLABUS) {
    if (chapter.ref.toUpperCase() === ref) return { kind: "chapter", chapter };
    for (const topic of chapter.topics) {
      if (topic.ref.toUpperCase() === ref)
        return { kind: "topic", chapter, topic };
      for (const subtopic of topic.subtopics) {
        if (subtopic.ref.toUpperCase() === ref)
          return { kind: "subtopic", chapter, topic, subtopic };
      }
    }
  }
  return null;
}

/** Find a topic by exact ref match first, then by title match. */
export function findTopic(query: string): { chapter: Chapter; topic: Topic } | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  for (const chapter of SYLLABUS)
    for (const topic of chapter.topics)
      if (topic.ref.toLowerCase() === q) return { chapter, topic };
  for (const chapter of SYLLABUS)
    for (const topic of chapter.topics)
      if (topic.title.toLowerCase().includes(q)) return { chapter, topic };
  return null;
}

/** Next topic in syllabus order (for "Next topic" navigation). */
export function nextTopic(ref: string): { chapter: Chapter; topic: Topic } | null {
  const flat: { chapter: Chapter; topic: Topic }[] = [];
  for (const chapter of SYLLABUS)
    for (const topic of chapter.topics) flat.push({ chapter, topic });
  const i = flat.findIndex((t) => t.topic.ref.toUpperCase() === ref.trim().toUpperCase());
  return i >= 0 && i + 1 < flat.length ? flat[i + 1] : null;
}
