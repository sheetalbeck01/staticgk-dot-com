export type Subtopic = { ref: string; title: string; questions: number };
export type Topic = {
  ref: string;
  title: string;
  questions: number;
  subtopics: Subtopic[];
};
export type Chapter = { ref: string; title: string; description: string; topics: Topic[] };

export const SYLLABUS_HI: Chapter[] = [
  {
    ref: "HC-01",
    title: "प्राचीन भारतीय इतिहास",
    description:
      "हड़प्पा की गलियों से गुप्त मंदिरों तक — भारत की प्राचीन सभ्यताएँ, साम्राज्य और विचार।",
    topics: [
      {
        ref: "HK-001",
        title: "सिंधु घाटी सभ्यता",
        questions: 30,
        subtopics: [
          { ref: "HK-001.1", title: "प्रमुख स्थल", questions: 12 },
          { ref: "HK-001.2", title: "नगर नियोजन और दैनिक जीवन", questions: 10 },
          { ref: "HK-001.3", title: "पतन और विरासत", questions: 8 },
        ],
      },
      {
        ref: "HK-002",
        title: "वैदिक युग",
        questions: 25,
        subtopics: [
          { ref: "HK-002.1", title: "प्रारंभिक वैदिक काल", questions: 13 },
          { ref: "HK-002.2", title: "उत्तर वैदिक काल", questions: 12 },
        ],
      },
      {
        ref: "HK-003",
        title: "बौद्ध और जैन धर्म",
        questions: 30,
        subtopics: [
          { ref: "HK-003.1", title: "बुद्ध और शिक्षाएँ", questions: 12 },
          { ref: "HK-003.2", title: "महावीर और जैन धर्म", questions: 10 },
          { ref: "HK-003.3", title: "संगीतियाँ और साहित्य", questions: 8 },
        ],
      },
      {
        ref: "HK-004",
        title: "मौर्य साम्राज्य",
        questions: 25,
        subtopics: [
          { ref: "HK-004.1", title: "चंद्रगुप्त और अशोक", questions: 13 },
          { ref: "HK-004.2", title: "प्रशासन और अर्थव्यवस्था", questions: 12 },
        ],
      },
      {
        ref: "HK-005",
        title: "गुप्त वंश और हर्षवर्धन",
        questions: 25,
        subtopics: [
          { ref: "HK-005.1", title: "गुप्त शासक", questions: 13 },
          { ref: "HK-005.2", title: "कला, विज्ञान और साहित्य", questions: 12 },
        ],
      },
    ],
  },
  {
    ref: "HC-02",
    title: "मध्यकालीन भारतीय इतिहास",
    description:
      "सल्तनत, विजयनगर, मुगल और मराठे — उपमहाद्वीप को आकार देने वाली आठ शताब्दियाँ।",
    topics: [
      {
        ref: "HK-006",
        title: "दिल्ली सल्तनत",
        questions: 30,
        subtopics: [
          { ref: "HK-006.1", title: "गुलाम से तुगलक तक", questions: 12 },
          { ref: "HK-006.2", title: "खिलजी और प्रशासन", questions: 10 },
          { ref: "HK-006.3", title: "सैय्यद-लोदी और पतन", questions: 8 },
        ],
      },
      {
        ref: "HK-007",
        title: "विजयनगर और बहमनी",
        questions: 20,
        subtopics: [
          { ref: "HK-007.1", title: "संगम और कृष्णदेवराय", questions: 11 },
          { ref: "HK-007.2", title: "बहमनी राज्य", questions: 9 },
        ],
      },
      {
        ref: "HK-008",
        title: "मुगल साम्राज्य",
        questions: 35,
        subtopics: [
          { ref: "HK-008.1", title: "बाबर से अकबर तक", questions: 14 },
          { ref: "HK-008.2", title: "जहाँगीर से औरंगज़ेब तक", questions: 12 },
          { ref: "HK-008.3", title: "प्रशासन और संस्कृति", questions: 9 },
        ],
      },
      {
        ref: "HK-009",
        title: "मराठे और सिख",
        questions: 20,
        subtopics: [
          { ref: "HK-009.1", title: "शिवाजी और पेशवा", questions: 11 },
          { ref: "HK-009.2", title: "सिख गुरु और खालसा", questions: 9 },
        ],
      },
    ],
  },
  {
    ref: "HC-03",
    title: "आधुनिक भारतीय इतिहास",
    description:
      "औपनिवेशिक शासन से स्वतंत्रता तक — आंदोलन, नेता और स्वतंत्र भारत के मील के पत्थर।",
    topics: [
      {
        ref: "HK-010",
        title: "यूरोपीय और ब्रिटिश शासन",
        questions: 25,
        subtopics: [
          { ref: "HK-010.1", title: "व्यापारिक कंपनियाँ", questions: 12 },
          { ref: "HK-010.2", title: "विजय और प्रशासन", questions: 13 },
        ],
      },
      {
        ref: "HK-011",
        title: "1857 का विद्रोह",
        questions: 20,
        subtopics: [
          { ref: "HK-011.1", title: "कारण और घटनाक्रम", questions: 11 },
          { ref: "HK-011.2", title: "नेता और परिणाम", questions: 9 },
        ],
      },
      {
        ref: "HK-012",
        title: "राष्ट्रीय आंदोलन I",
        questions: 30,
        subtopics: [
          { ref: "HK-012.1", title: "कांग्रेस और नरमपंथी", questions: 12 },
          { ref: "HK-012.2", title: "गरमपंथी और क्रांतिकारी", questions: 10 },
          { ref: "HK-012.3", title: "होम रूल और लखनऊ समझौता", questions: 8 },
        ],
      },
      {
        ref: "HK-013",
        title: "गांधीवादी आंदोलन",
        questions: 35,
        subtopics: [
          { ref: "HK-013.1", title: "असहयोग और खिलाफत", questions: 12 },
          { ref: "HK-013.2", title: "सविनय अवज्ञा", questions: 12 },
          { ref: "HK-013.3", title: "भारत छोड़ो और INA", questions: 11 },
        ],
      },
      {
        ref: "HK-014",
        title: "स्वतंत्रता और विभाजन",
        questions: 20,
        subtopics: [
          { ref: "HK-014.1", title: "कैबिनेट मिशन और माउंटबेटन योजना", questions: 10 },
          { ref: "HK-014.2", title: "संविधान निर्माण", questions: 10 },
        ],
      },
    ],
  },
  {
    ref: "HC-04",
    title: "भारतीय भूगोल",
    description:
      "पर्वत, नदियाँ, मानसून और मिट्टी — भारत का भौतिक और आर्थिक भूगोल।",
    topics: [
      {
        ref: "HK-015",
        title: "भारत की भौतिक संरचना",
        questions: 30,
        subtopics: [
          { ref: "HK-015.1", title: "हिमालय", questions: 12 },
          { ref: "HK-015.2", title: "मैदान, पठार और तट", questions: 10 },
          { ref: "HK-015.3", title: "दर्रे और द्वीप", questions: 8 },
        ],
      },
      {
        ref: "HK-016",
        title: "नदियाँ और झीलें",
        questions: 30,
        subtopics: [
          { ref: "HK-016.1", title: "हिमालयी नदियाँ", questions: 12 },
          { ref: "HK-016.2", title: "प्रायद्वीपीय नदियाँ", questions: 10 },
          { ref: "HK-016.3", title: "झीलें और जलप्रपात", questions: 8 },
        ],
      },
      {
        ref: "HK-017",
        title: "जलवायु, मिट्टी और कृषि",
        questions: 30,
        subtopics: [
          { ref: "HK-017.1", title: "मानसून और ऋतुएँ", questions: 11 },
          { ref: "HK-017.2", title: "भारत की मिट्टी", questions: 9 },
          { ref: "HK-017.3", title: "फसलें और सिंचाई", questions: 10 },
        ],
      },
      {
        ref: "HK-018",
        title: "खनिज और उद्योग",
        questions: 25,
        subtopics: [
          { ref: "HK-018.1", title: "खनिज और पेटियाँ", questions: 12 },
          { ref: "HK-018.2", title: "उद्योग और परिवहन", questions: 13 },
        ],
      },
    ],
  },
  {
    ref: "HC-05",
    title: "विश्व भूगोल",
    description:
      "ग्रह और उसके लोग — भू-आकृतियाँ, जलवायु क्षेत्र, महाद्वीप और देश।",
    topics: [
      {
        ref: "HK-019",
        title: "ब्रह्मांड और पृथ्वी",
        questions: 25,
        subtopics: [
          { ref: "HK-019.1", title: "सौरमंडल", questions: 12 },
          { ref: "HK-019.2", title: "अक्षांश, देशांतर और समय", questions: 13 },
        ],
      },
      {
        ref: "HK-020",
        title: "भू-आकृतियाँ और महासागर",
        questions: 25,
        subtopics: [
          { ref: "HK-020.1", title: "पर्वत और पठार", questions: 12 },
          { ref: "HK-020.2", title: "महासागर और धाराएँ", questions: 13 },
        ],
      },
      {
        ref: "HK-021",
        title: "वायुमंडल और जलवायु",
        questions: 20,
        subtopics: [
          { ref: "HK-021.1", title: "परतें और दाब पेटियाँ", questions: 10 },
          { ref: "HK-021.2", title: "चक्रवात और जलवायु क्षेत्र", questions: 10 },
        ],
      },
      {
        ref: "HK-022",
        title: "महाद्वीप और देश",
        questions: 25,
        subtopics: [
          { ref: "HK-022.1", title: "महाद्वीप और मरुस्थल", questions: 12 },
          { ref: "HK-022.2", title: "देश, राजधानियाँ और सीमाएँ", questions: 13 },
        ],
      },
    ],
  },
  {
    ref: "HC-06",
    title: "भारतीय राजव्यवस्था",
    description:
      "भारत का शासन कैसे चलता है — संविधान, अधिकार, संसद, न्यायालय और संघवाद।",
    topics: [
      {
        ref: "HK-023",
        title: "संविधान और प्रस्तावना",
        questions: 25,
        subtopics: [
          { ref: "HK-023.1", title: "संविधान निर्माण", questions: 12 },
          { ref: "HK-023.2", title: "विशेषताएँ और प्रस्तावना", questions: 13 },
        ],
      },
      {
        ref: "HK-024",
        title: "अधिकार और कर्तव्य",
        questions: 25,
        subtopics: [
          { ref: "HK-024.1", title: "मौलिक अधिकार", questions: 14 },
          { ref: "HK-024.2", title: "नीति निदेशक तत्व और कर्तव्य", questions: 11 },
        ],
      },
      {
        ref: "HK-025",
        title: "संघ सरकार",
        questions: 30,
        subtopics: [
          { ref: "HK-025.1", title: "राष्ट्रपति और उपराष्ट्रपति", questions: 12 },
          { ref: "HK-025.2", title: "संसद और प्रधानमंत्री", questions: 10 },
          { ref: "HK-025.3", title: "संशोधन और आपातकाल", questions: 8 },
        ],
      },
      {
        ref: "HK-026",
        title: "न्यायपालिका और संघीय व्यवस्था",
        questions: 25,
        subtopics: [
          { ref: "HK-026.1", title: "सर्वोच्च और उच्च न्यायालय", questions: 13 },
          { ref: "HK-026.2", title: "केंद्र-राज्य संबंध", questions: 12 },
        ],
      },
      {
        ref: "HK-027",
        title: "राज्य और स्थानीय शासन",
        questions: 20,
        subtopics: [
          { ref: "HK-027.1", title: "राज्यपाल और राज्य विधायिका", questions: 10 },
          { ref: "HK-027.2", title: "पंचायती राज और नगरपालिकाएँ", questions: 10 },
        ],
      },
    ],
  },
  {
    ref: "HC-07",
    title: "भारतीय अर्थव्यवस्था",
    description:
      "धन, बाज़ार और विकास — बैंकिंग, बजट, योजना और विकास।",
    topics: [
      {
        ref: "HK-028",
        title: "मूल बातें और क्षेत्र",
        questions: 20,
        subtopics: [
          { ref: "HK-028.1", title: "अवधारणाएँ और क्षेत्र", questions: 10 },
          { ref: "HK-028.2", title: "वृद्धि और सूचकांक", questions: 10 },
        ],
      },
      {
        ref: "HK-029",
        title: "योजना और विकास",
        questions: 20,
        subtopics: [
          { ref: "HK-029.1", title: "पंचवर्षीय योजनाएँ", questions: 10 },
          { ref: "HK-029.2", title: "नीति आयोग और योजनाएँ", questions: 10 },
        ],
      },
      {
        ref: "HK-030",
        title: "बैंकिंग और RBI",
        questions: 25,
        subtopics: [
          { ref: "HK-030.1", title: "बैंक और राष्ट्रीयकरण", questions: 12 },
          { ref: "HK-030.2", title: "RBI और मौद्रिक नीति", questions: 13 },
        ],
      },
      {
        ref: "HK-031",
        title: "बजट और कराधान",
        questions: 20,
        subtopics: [
          { ref: "HK-031.1", title: "बजट और घाटा", questions: 10 },
          { ref: "HK-031.2", title: "कर और GST", questions: 10 },
        ],
      },
    ],
  },
  {
    ref: "HC-08",
    title: "सामान्य विज्ञान",
    description:
      "परीक्षाओं के लिए रोज़मर्रा का विज्ञान — भौतिकी, रसायन और जीव विज्ञान।",
    topics: [
      {
        ref: "HK-032",
        title: "भौतिकी",
        questions: 35,
        subtopics: [
          { ref: "HK-032.1", title: "गति, बल और ऊर्जा", questions: 13 },
          { ref: "HK-032.2", title: "प्रकाश, ध्वनि और ऊष्मा", questions: 12 },
          { ref: "HK-032.3", title: "विद्युत और चुंबकत्व", questions: 10 },
        ],
      },
      {
        ref: "HK-033",
        title: "रसायन विज्ञान",
        questions: 30,
        subtopics: [
          { ref: "HK-033.1", title: "पदार्थ और परमाणु", questions: 12 },
          { ref: "HK-033.2", title: "अम्ल, क्षार और लवण", questions: 10 },
          { ref: "HK-033.3", title: "धातुएँ और रोज़मर्रा का रसायन", questions: 8 },
        ],
      },
      {
        ref: "HK-034",
        title: "जीव विज्ञान I — मानव शरीर",
        questions: 30,
        subtopics: [
          { ref: "HK-034.1", title: "कोशिका और ऊतक", questions: 12 },
          { ref: "HK-034.2", title: "शरीर तंत्र", questions: 10 },
          { ref: "HK-034.3", title: "पाचन और परिसंचरण", questions: 8 },
        ],
      },
      {
        ref: "HK-035",
        title: "जीव विज्ञान II — पादप और स्वास्थ्य",
        questions: 25,
        subtopics: [
          { ref: "HK-035.1", title: "पादप और प्रकाश संश्लेषण", questions: 10 },
          { ref: "HK-035.2", title: "पोषण, रोग और विटामिन", questions: 9 },
          { ref: "HK-035.3", title: "पर्यावरण मूल बातें", questions: 6 },
        ],
      },
    ],
  },
  {
    ref: "HC-09",
    title: "विविध स्थैतिक GK",
    description:
      "उच्च-लाभ स्थैतिक तथ्य — खेल, पुरस्कार, पुस्तकें, दिवस और प्रथम।",
    topics: [
      {
        ref: "HK-036",
        title: "खेल और ट्रॉफियाँ",
        questions: 20,
        subtopics: [
          { ref: "HK-036.1", title: "क्रिकेट, हॉकी और ओलंपिक", questions: 11 },
          { ref: "HK-036.2", title: "कप और ट्रॉफियाँ", questions: 9 },
        ],
      },
      {
        ref: "HK-037",
        title: "पुरस्कार और सम्मान",
        questions: 20,
        subtopics: [
          { ref: "HK-037.1", title: "राष्ट्रीय पुरस्कार", questions: 11 },
          { ref: "HK-037.2", title: "अंतरराष्ट्रीय पुरस्कार", questions: 9 },
        ],
      },
      {
        ref: "HK-038",
        title: "पुस्तकें और लेखक",
        questions: 20,
        subtopics: [
          { ref: "HK-038.1", title: "भारतीय लेखक", questions: 11 },
          { ref: "HK-038.2", title: "विश्व प्रसिद्ध रचनाएँ", questions: 9 },
        ],
      },
      {
        ref: "HK-039",
        title: "दिवस, तिथियाँ और प्रथम",
        questions: 20,
        subtopics: [
          { ref: "HK-039.1", title: "महत्वपूर्ण दिवस", questions: 10 },
          { ref: "HK-039.2", title: "भारत और विश्व में प्रथम", questions: 10 },
        ],
      },
    ],
  },
];

export type QuizNodeHi =
  | { kind: "chapter"; chapter: Chapter }
  | { kind: "topic"; chapter: Chapter; topic: Topic }
  | { kind: "subtopic"; chapter: Chapter; topic: Topic; subtopic: Subtopic };

/** Resolve any Hindi ref (HC-01, HK-014, HK-014.1) to its syllabus node. */
export function findNodeHi(rawRef: string): QuizNodeHi | null {
  const ref = rawRef.trim().toUpperCase();
  for (const chapter of SYLLABUS_HI) {
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
