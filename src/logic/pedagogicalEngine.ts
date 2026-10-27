/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RootCause {
  tag: string;
  icon: string;
  explanation: string;
  colorClass: string;
}

export interface DiagnosticItem {
  id: string;
  questionType: string;
  sectionSub: string;
  dotColor: 'red' | 'amber' | 'emerald' | 'slate';
  mastery: number;
  sampleCount: number;
  isInsufficientData: boolean;
  empiricalEvidence: {
    highlight: string;
    detail: string;
    isError?: boolean;
    isWarning?: boolean;
    isSuccess?: boolean;
  };
  rootCause: RootCause;
  confidence: string;
  suggestedAction: {
    label: string;
    materialId?: string;
    isCompleted?: boolean;
  };
}

export interface PathwayStep {
  stepNumber: number;
  badge: string;
  status: 'active' | 'locked' | 'scheduled';
  statusBadge: string;
  title: string;
  description: string;
  materialCode?: string;
  materialTitle?: string;
  unlockCondition?: string;
  estimatedMinutes?: number;
}

export interface CuratedMaterial {
  id: string;
  code: string;
  title: string;
  description: string;
  difficulty: string;
  difficultyColor: string;
  tags: string[];
  type: 'practice' | 'doc' | 'audio';
  stepMatch?: string;
  actionText: string;
  questions?: Array<{
    id: number;
    passageExcerpt: string;
    statement: string;
    correctAnswer: 'TRUE' | 'FALSE' | 'NOT GIVEN';
    userChoice?: 'TRUE' | 'FALSE' | 'NOT GIVEN';
    explanation: string;
    distractorReason: string;
  }>;
  docContent?: {
    sections: Array<{
      heading: string;
      body: string;
      examples: Array<{ original: string; academicParaphrase: string; trap: string }>;
    }>;
  };
  audioContent?: {
    title: string;
    duration: string;
    distractorTips: string[];
    transcriptLines: Array<{ speaker: string; time: string; text: string; isDistractor?: boolean; note?: string }>;
  };
}

export interface StudentProfile {
  id: string;
  archetypeKey: 'A' | 'B' | 'C';
  archetypeName: string;
  archetypeSubtitle: string;
  archetypeSummary: string;
  targetBand: string;
  timeRemaining: string;
  studyPace: string;
  readingMastery: number;
  readingBand: string;
  readingNote: string;
  listeningMastery: number;
  listeningBand: string;
  listeningNote: string;
  bottleneck: {
    title: string;
    subtitle: string;
    timePerQuestion: string;
    standardTime: string;
  };
  confidenceScore: {
    level: 'High' | 'Medium' | 'Low';
    label: string;
    testsCount: number;
    sampleQuestionsCount: number;
  };
  diagnostics: DiagnosticItem[];
  pathway: PathwayStep[];
  changelog: {
    time: string;
    ruleId: string;
    title: string;
    description: string;
  };
  consoleLogs: string[];
}

export const CURATED_MATERIALS: CuratedMaterial[] = [
  {
    id: 'MAT-RD-01',
    code: 'MAT-RD-01',
    title: 'Chuyên đề Phân biệt False & Not Given qua 20 ví dụ đối chiếu trực diện',
    description: 'Gồm 20 câu đối chứng trích từ đề thi thật; phân tích vì sao câu thiếu điều kiện khẳng định (Not Given) lại thường bị ngộ nhận là Sai (False).',
    difficulty: 'Band 6.0',
    difficultyColor: 'bg-blue-50 text-blue-900 border-blue-200',
    tags: ['Reading', 'Logic', 'F/NG'],
    type: 'practice',
    stepMatch: 'Khớp bước 1',
    actionText: 'Luyện tập',
    questions: [
      {
        id: 1,
        passageExcerpt: '“Archaeologists discovered traces of copper smelting tools dating back to 3500 BC in the southern highlands, though transport methods of raw ore remain uncharted.”',
        statement: 'Ancient workers transported copper ore across the mountains by horses.',
        correctAnswer: 'NOT GIVEN',
        explanation: 'Bài đọc chỉ nói phương thức vận chuyển quặng thô vẫn chưa được ghi nhận ("remain uncharted"), không hề xác nhận hoặc phủ định việc dùng ngựa. Do thiếu thông tin khẳng định, đáp án bắt buộc là NOT GIVEN.',
        distractorReason: 'Bẫy ngộ nhận: Học viên suy đoán thời cổ đại vùng núi thường dùng ngựa nên cho là FALSE (sai thực tế). Tuy nhiên IELTS chỉ chấp nhận FALSE khi bài nói một phương thức khác mâu thuẫn 100%.'
      },
      {
        id: 2,
        passageExcerpt: '“The new solar-powered water filtration system operates entirely without fossil fuel inputs under any weather conditions.”',
        statement: 'The water filtration system relies partly on diesel generators on cloudy days.',
        correctAnswer: 'FALSE',
        explanation: 'Bài đọc nói rõ hệ thống chạy HOÀN TOÀN không cần nhiên liệu hóa thạch dưới MỌI điều kiện thời tiết ("entirely without fossil fuel inputs under any weather conditions"). Đề bài lại nói dựa một phần vào máy phát điện diesel (nhiên liệu hóa thạch). Hai thông tin mâu thuẫn trực tiếp 100% -> FALSE.',
        distractorReason: 'Direct Contradiction: Đối lập trực diện giữa "entirely without fossil fuel" và "relies partly on diesel".'
      },
      {
        id: 3,
        passageExcerpt: '“Dr. Katherine Miller completed the marine census over a grueling span of seven years with occasional funding interruptions.”',
        statement: 'Dr. Katherine Miller was provided continuous, uninterrupted financial backing throughout her seven-year census.',
        correctAnswer: 'FALSE',
        explanation: 'Bài đọc nêu rõ có sự gián đoạn kinh phí định kỳ ("with occasional funding interruptions"), trái ngược trực tiếp với "continuous, uninterrupted financial backing".',
        distractorReason: 'Từ đối lập: "occasional interruptions" >< "continuous, uninterrupted".'
      },
      {
        id: 4,
        passageExcerpt: '“Urban honeybees in high-density metropolitan zones produce honey with comparable enzyme diversity to rural colonies.”',
        statement: 'Urban honey contains fewer beneficial medicinal properties than honey harvested in the countryside.',
        correctAnswer: 'NOT GIVEN',
        explanation: 'Bài chỉ so sánh về tính đa dạng enzyme ("comparable enzyme diversity"), không hề đề cập đến "beneficial medicinal properties" (dược tính). Không thể suy đoán từ enzyme sang dược tính.',
        distractorReason: 'Extrapolation Bias: Thí sinh tự ngoại suy đa dạng enzyme tương đương nghĩa là dược tính tương đương, từ đó chọn False. Đúng nguyên tắc IELTS phải chọn Not Given.'
      },
      {
        id: 5,
        passageExcerpt: '“Initial trials demonstrated that the vaccine candidate remained stable at ambient room temperatures up to 28 degrees Celsius.”',
        statement: 'The vaccine is currently distributed to over 50 developing countries.',
        correctAnswer: 'NOT GIVEN',
        explanation: 'Bài chỉ nói về kết quả thử nghiệm nhiệt độ bảo quản trong phòng thí nghiệm. Không có bất kỳ thông tin nào về tình trạng phân phối đến 50 quốc gia.',
        distractorReason: 'Missing Evidence: Thông tin hoàn toàn nằm ngoài bài đọc -> Bắt buộc chọn NOT GIVEN.'
      }
    ]
  },
  {
    id: 'MAT-RD-04',
    code: 'MAT-RD-04',
    title: 'Luyện Paraphrase Câu phức Học thuật Đoạn văn Passage 2',
    description: 'Tập trung vào kỹ năng phân rã cấu trúc câu ghép, mệnh đề quan hệ và các cụm danh từ phức tạp trong bài đọc khoa học xã hội.',
    difficulty: 'Band 6.5',
    difficultyColor: 'bg-purple-50 text-purple-900 border-purple-200',
    tags: ['Vocabulary', 'Reading', 'Paraphrase'],
    type: 'doc',
    stepMatch: 'Tài liệu tự đọc',
    actionText: 'Mở tài liệu',
    docContent: {
      sections: [
        {
          heading: '1. Kỹ thuật Phân Rã Cụm Danh Từ Nén (Nominalization Decompression)',
          body: 'Trong văn bản học thuật IELTS Passage 2, tác giả thường nén các hành động thành cụm danh từ dài để tăng tính trang trọng. Để hiểu nhanh, hãy đảo ngược danh từ về dạng động từ nguyên bản.',
          examples: [
            {
              original: 'The implementation of rigorous governmental deforestation restrictions yielded an observable mitigation of soil erosion.',
              academicParaphrase: 'When the government strictly enforced forest protection rules, soil erosion noticeably decreased.',
              trap: 'Học viên dễ bị choáng ngợp bởi chuỗi 4 danh từ liên tiếp và mất khả năng nắm bắt quan hệ nguyên nhân - kết quả.'
            },
            {
              original: 'The sudden cessation of volcanic thermal emissions precipitated a rapid deterioration in local agricultural yields.',
              academicParaphrase: 'Because the volcano stopped releasing heat, crop production dropped quickly.',
              trap: 'Nhầm lẫn giữa "cessation" (ngừng) với "procession" hoặc "accession".'
            }
          ]
        },
        {
          heading: '2. Nhận Diện Mệnh Đề Quan Hệ Giản Lược (Reduced Relative Clauses)',
          body: 'Mệnh đề quan hệ giản lược bằng V-ing hoặc V3/ed thường che giấu chủ ngữ thực sự của hành động trong câu hỏi Matching Information.',
          examples: [
            {
              original: 'The samples analyzed by the autonomous underwater vehicle exhibited unforeseen anomalies.',
              academicParaphrase: 'The samples (which had been analyzed by the machine) showed strange results.',
              trap: 'Tưởng nhầm "analyzed" là vị ngữ chính của cả câu thay vì "exhibited".'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'MAT-LS-02',
    code: 'MAT-LS-02',
    title: 'Section 3 Listening: Nhận diện Bẫy Chuyển Hướng (Distractors)',
    description: 'Phương pháp bắt kịp hội thoại khi hai người nói thay đổi quan điểm đột ngột (từ \'However\', \'Actually\', \'I thought so at first\').',
    difficulty: 'Band 6.5',
    difficultyColor: 'bg-purple-50 text-purple-900 border-purple-200',
    tags: ['Listening', 'Discourse', 'Sec 3'],
    type: 'audio',
    stepMatch: 'File Audio & Kèm script',
    actionText: 'Mở Audio',
    audioContent: {
      title: 'Tutor & Student Project Discussion: Renewable Grid Integration',
      duration: '03:45',
      distractorTips: [
        'Quy tắc 3 giây: Khi người nói đồng ý ngay lập tức với phương án A, hãy chuẩn bị tinh thần cho từ đảo ngược "mind you" hoặc "on second thought".',
        'Phân biệt lời đề xuất cá nhân vs quyết định chung của nhóm (Mutual Consensus).'
      ],
      transcriptLines: [
        {
          speaker: 'Liam (Student)',
          time: '00:15',
          text: 'I was thinking we should present the wind turbine case study first since it has the most quantitative data.'
        },
        {
          speaker: 'Prof. Evans',
          time: '00:28',
          text: 'Well, that sounds logical at first glance...',
          isDistractor: true,
          note: 'Dấu hiệu bẫy: "at first glance" báo hiệu quan điểm sắp bị phủ nhận!'
        },
        {
          speaker: 'Prof. Evans',
          time: '00:36',
          text: '...but actually the committee specifically emphasized evaluating decentralized solar networks before looking at offshore wind.'
        },
        {
          speaker: 'Liam (Student)',
          time: '00:49',
          text: 'Ah, I see. In that case, we should restructure Slide 2 to introduce solar storage prior to anything else.'
        },
        {
          speaker: 'Prof. Evans',
          time: '01:05',
          text: 'Exactly. That will satisfy their core syllabus requirement.'
        }
      ]
    }
  }
];

export const ARCHETYPES_DATA: Record<'A' | 'B' | 'C', StudentProfile> = {
  'A': {
    id: 'STU-2024-12X',
    archetypeKey: 'A',
    archetypeName: 'Sinh viên A',
    archetypeSubtitle: 'Từ vựng yếu (Vocabulary Deficit)',
    archetypeSummary: 'Thiếu vốn từ vựng & Paraphrase học thuật; sai đều cả Passage 1 & 2 do không nhận diện từ đồng nghĩa.',
    targetBand: 'Band 6.0 - 6.5',
    timeRemaining: '8 tuần',
    studyPace: '5h/tuần',
    readingMastery: 48,
    readingBand: '5.0 - 5.5',
    readingNote: 'Sai đều cả Passage 1 & 2 do vốn từ học thuật mỏng (-26% ở câu hỏi từ vựng)',
    listeningMastery: 65,
    listeningBand: '6.0',
    listeningNote: 'Section 1 đạt 80%, nhưng Section 3 bị hụt từ đồng nghĩa',
    bottleneck: {
      title: 'Academic Paraphrase & Synonyms',
      subtitle: 'Không nhận diện được từ đồng nghĩa bậc C1 trong bài đọc.',
      timePerQuestion: '2.6 phút',
      standardTime: '1.5p'
    },
    confidenceScore: {
      level: 'High',
      label: 'Mức Cao',
      testsCount: 5,
      sampleQuestionsCount: 145
    },
    diagnostics: [
      {
        id: 'diag-voc',
        questionType: 'Academic Vocabulary / Paraphrase',
        sectionSub: 'Reading Academic Passage 1 & 2',
        dotColor: 'red',
        mastery: 35,
        sampleCount: 20,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Sai 13 / 20 câu kiểm tra từ đồng nghĩa',
          detail: 'Không nhận ra các cặp từ: mitigation = reduction, cessation = halt, precipitate = trigger.',
          isError: true
        },
        rootCause: {
          tag: 'Lexical Deficit',
          icon: 'spellcheck',
          explanation: 'Vốn từ chỉ dừng ở mức B1-B2 thông dụng; chưa nắm được các biến thể học thuật nén danh từ (Nominalization).',
          colorClass: 'text-rose-900 bg-rose-50 border-rose-200'
        },
        confidence: 'Rất cao (N=20)',
        suggestedAction: {
          label: 'Luyện Paraphrase Câu phức Passage 2',
          materialId: 'MAT-RD-04'
        }
      },
      {
        id: 'diag-tfng-a',
        questionType: 'True / False / Not Given',
        sectionSub: 'Reading Passage 1',
        dotColor: 'amber',
        mastery: 52,
        sampleCount: 14,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Sai 7 / 14 câu',
          detail: 'Lỗi phát sinh do hiểu sai nghĩa từ khóa trong câu dẫn hơn là do suy luận logic thuần túy.',
          isWarning: true
        },
        rootCause: {
          tag: 'Lexical Misinterpretation',
          icon: 'translate',
          explanation: 'Dịch sai sắc thái của các trạng từ chỉ mức độ (e.g. marginally, predominantly).',
          colorClass: 'text-amber-900 bg-amber-50 border-amber-200'
        },
        confidence: 'Cao (N=14)',
        suggestedAction: {
          label: 'Luyện 20 ví dụ đối chiếu F vs NG',
          materialId: 'MAT-RD-01'
        }
      },
      {
        id: 'diag-sum-a',
        questionType: 'Summary Completion',
        sectionSub: 'Có danh sách từ cho sẵn',
        dotColor: 'red',
        mastery: 45,
        sampleCount: 15,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Sai 8 / 15 câu chọn từ điền',
          detail: 'Chọn sai từ đồng nghĩa khi trong bảng từ có 2 từ gần nghĩa nhau.',
          isError: true
        },
        rootCause: {
          tag: 'Collocation Blindspot',
          icon: 'menu_book',
          explanation: 'Chưa vững collocation học thuật trong ngữ cảnh bài đọc nghiên cứu.',
          colorClass: 'text-rose-900 bg-rose-50 border-rose-200'
        },
        confidence: 'Cao (N=15)',
        suggestedAction: {
          label: 'Ôn tập 100 Collocations Reading trọng điểm',
          materialId: 'MAT-RD-04'
        }
      }
    ],
    pathway: [
      {
        stepNumber: 1,
        badge: 'Nền tảng Từ vựng',
        status: 'active',
        statusBadge: 'Bước 1: Đang học • Ưu tiên cao nhất',
        title: 'Kỹ thuật Phân rã Cụm Danh Từ Nén & Paraphrase Học thuật',
        description: 'Tập trung bồi đắp vốn từ C1 và kỹ thuật nhận diện từ đồng nghĩa trong Passage 1 & 2. Giải tỏa rào cản từ vựng trước khi ép tốc độ làm bài.',
        materialCode: 'MAT-RD-04',
        materialTitle: 'Luyện Paraphrase Câu phức Học thuật Đoạn văn Passage 2',
        estimatedMinutes: 40
      },
      {
        stepNumber: 2,
        badge: 'Logic Đọc hiểu',
        status: 'locked',
        statusBadge: 'Bước 2 (Chờ mở khóa)',
        title: 'Phân định False vs Not Given sau khi đạt nền tảng từ vựng',
        description: 'Khi đã hiểu chuẩn xác từ vựng, áp dụng quy tắc đối lập 100% để loại bỏ lỗi ngộ nhận Not Given.',
        unlockCondition: 'Hoàn thành bài tập từ vựng MAT-RD-04 với độ chuẩn xác ≥ 80%.'
      },
      {
        stepNumber: 3,
        badge: 'Chiến thuật Tốc độ',
        status: 'scheduled',
        statusBadge: 'Bước 3',
        title: 'Phân bổ thời gian chuẩn 60 phút',
        description: 'Áp dụng khung giờ sau khi giải quyết triệt để vấn đề tắc nghẽn từ vựng.',
        unlockCondition: 'Kế hoạch tuần 4'
      }
    ],
    changelog: {
      time: '14:15 Hôm nay',
      ruleId: 'Rule ID #R-VOCAB-02',
      title: 'Tái cơ cấu lộ trình ưu tiên Vốn từ vựng học thuật',
      description: 'Hệ thống kích hoạt Rule R-VOCAB-02 do tỷ lệ lỗi từ vựng vượt 60% ở cả 2 bài đọc cơ bản. Đã đẩy MAT-RD-04 lên ưu tiên số 1; tạm hoãn mục tiêu tốc độ phòng thi.'
    },
    consoleLogs: [
      '[HỒ SƠ SINH VIÊN A ĐƯỢC CHỌN]',
      '> Dữ liệu đầu vào: N_attempts = 16, Vocabulary_Error_Rate = 62.5%, Paraphrase_Fail = 7 lần.',
      '> Phân tích: Sai đều cả Passage 1 & Passage 2 ở các câu paraphrase từ đồng nghĩa bậc cao (C1-C2).',
      '> Kiểm định điều kiện: Rule R-VOCAB-02 [Triggered = TRUE]. Lỗi không nằm ở logic mà do vốn từ học thuật thiếu hụt.',
      '> Quyết định can thiệp sư phạm: Ưu tiên số 1 chuyển thành "MAT-RD-04: Luyện Paraphrase Câu phức Học thuật". Tạm hoãn tốc độ 15-20-25 phút.',
      '> Kết quả xuất: Lộ trình thích ứng đã tái sắp xếp thành công. Trọng tâm: Xây dựng nền tảng từ vựng học thuật.'
    ]
  },

  'B': {
    id: 'STU-2024-88A',
    archetypeKey: 'B',
    archetypeName: 'Sinh viên B (Hiện tại)',
    archetypeSubtitle: 'Lỗi logic F/NG (Logic Deduction Error)',
    archetypeSummary: 'Thiếu kỹ thuật phân biệt logic trực tiếp; từ vựng tốt nhưng suy diễn quá đà giữa False và Not Given.',
    targetBand: 'Band 6.5 - 7.0',
    timeRemaining: '6 tuần',
    studyPace: '6h/tuần',
    readingMastery: 62,
    readingBand: '5.5 - 6.0',
    readingNote: 'Hụt điểm ở Passage 2 & 3 (-18% so với Pass 1)',
    listeningMastery: 74,
    listeningBand: '6.5',
    listeningNote: 'Section 1 & 2 đạt 88% chính xác',
    bottleneck: {
      title: 'True/False/Not Given',
      subtitle: 'Kèm cạn kiệt thời gian ở Section 3 (Reading).',
      timePerQuestion: '2.4 phút',
      standardTime: '1.5p'
    },
    confidenceScore: {
      level: 'High',
      label: 'Mức Cao',
      testsCount: 4,
      sampleQuestionsCount: 120
    },
    diagnostics: [
      {
        id: 'diag-tfng',
        questionType: 'True / False / Not Given',
        sectionSub: 'Reading Academic Passage 1 & 2',
        dotColor: 'red',
        mastery: 42,
        sampleCount: 12,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Sai 7 / 12 câu gần nhất',
          detail: 'Nhầm lẫn 5 lần giữa False và Not Given; không tìm thấy contradict rõ ràng.',
          isError: true
        },
        rootCause: {
          tag: 'Logic Deduction Error',
          icon: 'psychology',
          explanation: 'Độc giả suy luận vượt quá phạm vi thông tin bài đọc (Extrapolation bias) thay vì bám sát chứng cứ đoạn văn.',
          colorClass: 'text-indigo-900 bg-indigo-50 border-indigo-200'
        },
        confidence: 'Cao (N=12)',
        suggestedAction: {
          label: 'Luyện 20 ví dụ đối chiếu F vs NG',
          materialId: 'MAT-RD-01'
        }
      },
      {
        id: 'diag-mh',
        questionType: 'Matching Headings',
        sectionSub: 'Reading Academic Passage 2',
        dotColor: 'amber',
        mastery: 55,
        sampleCount: 8,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Tốn TB 2.8 phút / câu',
          detail: 'Thường sai ở các đoạn văn có distractor ở câu 1 và câu cuối.',
          isWarning: true
        },
        rootCause: {
          tag: 'Inefficient Skimming',
          icon: 'search',
          explanation: 'Đọc dịch từng từ (Linear Reading) thay vì quét ý chính cả đoạn và nhận diện cấu trúc luận điểm.',
          colorClass: 'text-amber-900 bg-amber-50 border-amber-200'
        },
        confidence: 'Trung bình (N=8)',
        suggestedAction: {
          label: 'Luyện quét Topic Sentence',
          materialId: 'MAT-RD-04'
        }
      },
      {
        id: 'diag-mc3',
        questionType: 'Multiple Choice (Passage 3)',
        sectionSub: 'Độ dài học thuật cao',
        dotColor: 'red',
        mastery: 38,
        sampleCount: 10,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: '4 câu cuối chọn lụi trong 30s',
          detail: 'Dữ liệu telemetry cho thấy click liên tiếp ở 30 giây cuối cùng.',
          isError: true
        },
        rootCause: {
          tag: 'Time Exhaustion',
          icon: 'alarm',
          explanation: 'Chi phối thời gian quá nhiều cho Passage 1 (mất 24 phút thay vì 17 phút tiêu chuẩn).',
          colorClass: 'text-rose-900 bg-rose-50 border-rose-200'
        },
        confidence: 'Rất cao (Telemetry)',
        suggestedAction: {
          label: 'Áp dụng khung 15-20-25 phút'
        }
      },
      {
        id: 'diag-sum',
        questionType: 'Summary Completion',
        sectionSub: 'Điền từ có / không có box',
        dotColor: 'emerald',
        mastery: 85,
        sampleCount: 20,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Đúng 17 / 20 câu',
          detail: 'Định vị từ khóa loại từ (Grammar class) rất chuẩn xác.',
          isSuccess: true
        },
        rootCause: {
          tag: 'Mastered Skill',
          icon: 'check_circle',
          explanation: 'Kỹ năng nắm bắt Word form và ngữ pháp ngữ cảnh đã vững vàng.',
          colorClass: 'text-emerald-900 bg-emerald-50 border-emerald-200'
        },
        confidence: 'Cao (N=20)',
        suggestedAction: {
          label: 'Duy trì luyện tập định kỳ',
          isCompleted: true
        }
      }
    ],
    pathway: [
      {
        stepNumber: 1,
        badge: 'Nền tảng',
        status: 'active',
        statusBadge: 'Bước 1: Đang học • Ưu tiên cao nhất',
        title: "Kỹ thuật phân biệt 'False' vs 'Not Given' qua Phân tích Mâu thuẫn Trực tiếp",
        description: "Nguyên tắc cốt lõi: False bắt buộc phải có câu từ trong bài đọc mâu thuẫn 100% với đề bài (Direct Contradiction). Nếu thông tin không thể khẳng định đúng hay sai hoặc thiếu dữ kiện xác minh, bắt buộc chọn Not Given. Tuyệt đối không tự suy diễn kiến thức ngoài bài đọc.",
        materialCode: 'MAT-RD-01',
        materialTitle: 'Cambridge 16 Test 2 Reading Passage 1 Analysis (Có sẵn trong ngân hàng)',
        estimatedMinutes: 45
      },
      {
        stepNumber: 2,
        badge: 'Kỹ thuật',
        status: 'locked',
        statusBadge: 'Bước 2 (Chờ mở khóa)',
        title: 'Chiến lược Skimming & Đánh dấu Từ khóa Paragraph Headings',
        description: 'Xử lý dạng bài Matching Headings nhanh hơn bằng kỹ thuật xác định câu chủ đề (Topic Sentences), các từ chuyển ý (Signposting words), và loại bỏ bẫy danh từ đơn lẻ.',
        unlockCondition: 'Điều kiện mở khóa: Hoàn thành 15/20 câu F/NG ở Bước 1 đạt tỷ lệ chính xác ≥ 75%.'
      },
      {
        stepNumber: 3,
        badge: 'Tốc độ & Chiến thuật',
        status: 'scheduled',
        statusBadge: 'Bước 3',
        title: 'Chiến thuật Phân bổ Thời gian 15 - 20 - 25 Phút cho 3 Passages',
        description: 'Luyện phản xạ chuyển bài đúng thời điểm (Stop-loss time discipline). Chấm dứt tình trạng dồn 30 giây cuối cho Passage 3 dẫn đến điểm số dưới 40% ở Multiple Choice.',
        unlockCondition: 'Kế hoạch tuần 3'
      }
    ],
    changelog: {
      time: '09:30 AM Hôm nay',
      ruleId: 'Rule ID #R-LOGIC-08',
      title: 'Nhật ký lý do thay đổi lộ trình (Adaptive Changelog)',
      description: 'Hệ thống tự động kích hoạt luật điều chỉnh: Rule ID #R-LOGIC-08. Đã đẩy bài học True/False/Not Given lên vị trí số 1 vì tỷ lệ sai lệch giữa False & Not Given lặp lại liên tiếp trong 3 bài kiểm tra gần nhất (N=12 câu, lỗi đạt 58.3%). Các bài luyện Ngữ pháp câu phức tạm thời chuyển về chế độ luyện tập phụ.'
    },
    consoleLogs: [
      '[HỒ SƠ SINH VIÊN B ĐƯỢC CHỌN]',
      '> Dữ liệu đầu vào: N_attempts = 12, False_rate = 58.3%, Contradiction_Detection = Thấp, Time_spent_P1 = 16.5m (Bình thường).',
      '> Kiểm định điều kiện: Rule R-LOGIC-08 [Triggered = TRUE] vì sai lệch False/NG vượt ngưỡng 40% trong 3 bài nộp liên tiếp.',
      '> Quyết định can thiệp sư phạm: Gán học liệu MAT-RD-01 làm điều kiện tiên quyết (Prerequisite). Khóa các bài tập Passage 3 nâng cao.',
      '> Kết quả xuất: Lộ trình thích ứng đã tái sắp xếp. Mục tiêu can thiệp: Phân biệt mâu thuẫn trực tiếp (Direct Contradiction).'
    ]
  },

  'C': {
    id: 'STU-2024-94K',
    archetypeKey: 'C',
    archetypeName: 'Sinh viên C',
    archetypeSubtitle: 'Kẹt thời gian (Time Management Exhaustion)',
    archetypeSummary: 'Quản lý thời gian kém (Time Management); Passage 1 làm quá kỹ (25 phút), Passage 3 phải đánh lụi.',
    targetBand: 'Band 7.0',
    timeRemaining: '4 tuần',
    studyPace: '8h/tuần',
    readingMastery: 59,
    readingBand: '5.5 - 6.0',
    readingNote: 'Passage 1 đạt 92% nhưng Passage 3 rớt xuống 25% do hết thời gian',
    listeningMastery: 78,
    listeningBand: '7.0',
    listeningNote: 'Nghe rất tốt, phản xạ nhanh và ổn định',
    bottleneck: {
      title: 'Passage 1 Over-investment',
      subtitle: 'Dành tới 25.2 phút cho Passage 1 dẫn đến thiếu hụt nghiêm trọng ở Passage 3.',
      timePerQuestion: '3.1 phút (P1)',
      standardTime: '1.2p (P1)'
    },
    confidenceScore: {
      level: 'High',
      label: 'Mức Rất Cao (Telemetry)',
      testsCount: 6,
      sampleQuestionsCount: 160
    },
    diagnostics: [
      {
        id: 'diag-time-p3',
        questionType: 'Passage 3 Academic Completion & MCQs',
        sectionSub: 'Toàn bộ câu hỏi Passage 3',
        dotColor: 'red',
        mastery: 28,
        sampleCount: 14,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: '11/14 câu cuối làm trong < 7 phút',
          detail: 'Học viên làm Passage 1 mất 25.2 phút, Passage 2 mất 26 phút -> chỉ còn 8.8 phút cho Passage 3.',
          isError: true
        },
        rootCause: {
          tag: 'Perfectionism Trap',
          icon: 'timer_off',
          explanation: 'Hội chứng cầu toàn ở bài dễ dẫn đến thiếu giờ trầm trọng ở bài khó. Cần kỷ luật cắt lỗ thời gian.',
          colorClass: 'text-rose-900 bg-rose-50 border-rose-200'
        },
        confidence: 'Rất cao (Telemetry)',
        suggestedAction: {
          label: 'Luyện kỷ luật cắt lỗ 15-20-25p'
        }
      },
      {
        id: 'diag-p1-c',
        questionType: 'Passage 1 Fact Checking',
        sectionSub: 'Reading Academic Passage 1',
        dotColor: 'emerald',
        mastery: 92,
        sampleCount: 13,
        isInsufficientData: false,
        empiricalEvidence: {
          highlight: 'Đúng 12 / 13 câu',
          detail: 'Độ chính xác rất cao nhưng đánh đổi bằng thời gian gấp đôi mức quy định.',
          isSuccess: true
        },
        rootCause: {
          tag: 'Over-verification',
          icon: 'rule',
          explanation: 'Đọc đi đọc lại 3-4 lần để chắc chắn 100%, làm suy giảm hiệu suất tổng thể.',
          colorClass: 'text-emerald-900 bg-emerald-50 border-emerald-200'
        },
        confidence: 'Cao (N=13)',
        suggestedAction: {
          label: 'Giới hạn tối đa 16 phút cho Passage 1'
        }
      }
    ],
    pathway: [
      {
        stepNumber: 1,
        badge: 'Chiến thuật Tốc độ',
        status: 'active',
        statusBadge: 'Bước 1: Đang học • Ưu tiên cao nhất',
        title: 'Chiến thuật Phân bổ Thời gian 15 - 20 - 25 Phút & Kỷ luật Cắt Lỗ',
        description: 'Tập phản xạ chuyển bài đúng mốc: Passage 1 tối đa 15 phút, Passage 2 tối đa 20 phút, dành trọn 25 phút cho Passage 3. Chấm dứt tình trạng đánh lụi 4 câu cuối.',
        estimatedMinutes: 30
      },
      {
        stepNumber: 2,
        badge: 'Kỹ năng Nâng cao',
        status: 'locked',
        statusBadge: 'Bước 2 (Chờ mở khóa)',
        title: 'Tối ưu tốc độ giải quyết True / False / Not Given trong 1 phút',
        description: 'Rèn luyện kỹ năng định vị từ khóa trong 20s và phán đoán logic trong 40s.',
        unlockCondition: 'Vượt qua bài test bấm giờ 3 Passage với thời gian P1 ≤ 16 phút.'
      },
      {
        stepNumber: 3,
        badge: 'Thi thử Áp lực',
        status: 'scheduled',
        statusBadge: 'Bước 3',
        title: 'Mock Test Full 60 phút mô phỏng phòng thi chuẩn',
        description: 'Kiểm tra độ chịu tải và duy trì phong độ dưới áp lực đồng hồ đếm ngược.',
        unlockCondition: 'Kế hoạch tuần 2'
      }
    ],
    changelog: {
      time: '11:45 Hôm nay',
      ruleId: 'Rule ID #R-TIME-01',
      title: 'Tái cơ cấu lộ trình khẩn cấp theo Rule R-TIME-01',
      description: 'Hệ thống phát hiện Passage 1 vượt quá 25 phút và tỷ lệ đánh lụi Passage 3 lên tới 80%. Đẩy ngay chuyên đề phân bổ thời gian lên vị trí số 1; hoãn các bài lý thuyết logic.'
    },
    consoleLogs: [
      '[HỒ SƠ SINH VIÊN C ĐƯỢC CHỌN]',
      '> Dữ liệu đầu vào: Passage 1 Time = 25.2m (Vượt 48%), Passage 3 Time = 7.5m (Thiếu nghiêm trọng), Blind Guess Rate = 80%.',
      '> Phân tích: Điểm Passage 1 đạt 90%, nhưng Passage 3 rớt xuống 25% hoàn toàn do hết thời gian làm bài.',
      '> Kiểm định điều kiện: Rule R-TIME-01 [Triggered = TRUE]. Chẩn đoán: Hội chứng cầu toàn ở Passage 1 (Perfectionism Trap).',
      '> Quyết định can thiệp sư phạm: Đẩy bài tập "Chiến thuật Phân bổ Thời gian 15-20-25 phút" lên vị trí ưu tiên cao nhất ngay lập tức.',
      '> Kết quả xuất: Lộ trình thích ứng đã tái sắp xếp. Mục tiêu can thiệp: Phục hồi thời gian Passage 3.'
    ]
  }
};

/**
 * Pure pedagogical decision rule engine function
 */
export function evaluatePedagogicalRules(input: {
  falseRate: number;
  attemptsCount: number;
  p1TimeMinutes: number;
  vocabErrorRate: number;
  minSampleSizeN: number;
}): {
  activeRuleId: string;
  recommendedStep1: string;
  isTriggered: boolean;
  explanation: string;
} {
  const { falseRate, attemptsCount, p1TimeMinutes, vocabErrorRate, minSampleSizeN } = input;

  // Rule: Insufficient data guard
  if (attemptsCount < minSampleSizeN) {
    return {
      activeRuleId: 'RULE-INSUFFICIENT-DATA',
      recommendedStep1: 'Thu thập thêm dữ liệu kiểm tra',
      isTriggered: false,
      explanation: `Mẫu câu hỏi (N=${attemptsCount}) chưa đạt ngưỡng tối thiểu N >= ${minSampleSizeN}. Giữ nguyên lộ trình hiện hành để tránh kết luận sai lệch.`
    };
  }

  // Rule R-TIME-01
  if (p1TimeMinutes > 22) {
    return {
      activeRuleId: 'R-TIME-01',
      recommendedStep1: 'Chiến thuật Phân bổ Thời gian 15 - 20 - 25 Phút cho 3 Passages',
      isTriggered: true,
      explanation: `Passage 1 chiếm ${p1TimeMinutes} phút (vượt ngưỡng 22 phút). Nguy cơ vỡ kế hoạch làm bài Passage 3 rất cao.`
    };
  }

  // Rule R-VOCAB-02
  if (vocabErrorRate >= 0.5) {
    return {
      activeRuleId: 'R-VOCAB-02',
      recommendedStep1: 'Luyện Paraphrase Câu phức Học thuật Đoạn văn Passage 2',
      isTriggered: true,
      explanation: `Tỷ lệ lỗi từ vựng học thuật (${Math.round(vocabErrorRate * 100)}%) vượt ngưỡng cảnh báo 50%. Cần bổ sung vốn từ trước khi luyện kỹ xảo.`
    };
  }

  // Rule R-LOGIC-08
  if (falseRate >= 0.4) {
    return {
      activeRuleId: 'R-LOGIC-08',
      recommendedStep1: "Kỹ thuật phân biệt 'False' vs 'Not Given' qua Phân tích Mâu thuẫn Trực tiếp",
      isTriggered: true,
      explanation: `Tỷ lệ sai lệch False/Not Given (${Math.round(falseRate * 100)}%) vượt ngưỡng 40%. Yêu cầu rèn luyện kỹ năng phân biệt direct contradiction.`
    };
  }

  return {
    activeRuleId: 'R-MAINTENANCE-01',
    recommendedStep1: 'Duy trì luyện tập đề tổng hợp chuẩn Cambridge',
    isTriggered: true,
    explanation: 'Các chỉ số đều trong vùng an toàn. Duy trì tần suất luyện tập định kỳ.'
  };
}

/**
 * Parse answer submission vector string
 * Example: "1:TRUE, 2:FALSE (User: NG), 3:NOT GIVEN (User: FALSE), 4:TRUE"
 */
export function parseAnswerVector(input: string): {
  totalParsed: number;
  correctCount: number;
  falseWrongCount: number;
  ngWrongCount: number;
  errorRatio: number;
} {
  const parts = input.split(',').map(s => s.trim()).filter(Boolean);
  let totalParsed = 0;
  let correctCount = 0;
  let falseWrongCount = 0;
  let ngWrongCount = 0;

  for (const part of parts) {
    totalParsed++;
    if (part.includes('(User:')) {
      if (part.toUpperCase().includes('FALSE')) {
        falseWrongCount++;
      } else if (part.toUpperCase().includes('NG') || part.toUpperCase().includes('NOT GIVEN')) {
        ngWrongCount++;
      }
    } else {
      correctCount++;
    }
  }

  const errorRatio = totalParsed > 0 ? (totalParsed - correctCount) / totalParsed : 0;
  return {
    totalParsed,
    correctCount,
    falseWrongCount,
    ngWrongCount,
    errorRatio
  };
}
