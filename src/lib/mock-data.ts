import type { DashboardData, Article, VocabList, Profile, Lesson, WordLookup, ReviewQueue } from './api/types';

export const mockUser = {
  id: 'usr_wei01',
  name: 'Wei Chen',
  email: 'wei@lumo.app',
  avatarUrl: null,
  level: 'B1' as const,
  streakDays: 7,
  createdAt: '2026-01-12T03:20:00Z',
};

export const mockDashboard: DashboardData = {
  greeting: 'Good morning, Wei',
  date: '2026-06-03',
  dailyGoal: { targetMin: 20, doneMin: 11 },
  streakDays: 7,
  stats: { streak: 7, newWordsThisWeek: 12, completionPct: 95 },
  todayLesson: {
    id: 'les_dxb90',
    title: { en: 'Working in Dubai: Your First 90 Days', zh: '在迪拜工作：你的前 90 天' },
    topic: 'career',
    level: 'B1',
    durationMin: 20,
    wordCount: 480,
    coverUrl: null,
    tags: ['B1', 'For You', 'Career'],
    aiGenerated: true,
    progress: { tasksDone: 2, tasksTotal: 4 },
  },
  tasks: [
    { id: 't1', type: 'read',   title: 'Read the article',   sub: '6 min · 480 words', estMin: 6, state: 'done' },
    { id: 't2', type: 'listen', title: 'Listen & shadow',    sub: '5 min',              estMin: 5, state: 'done' },
    { id: 't3', type: 'vocab',  title: 'Learn 8 new words',  sub: 'Vocabulary',         estMin: 4, state: 'active' },
    { id: 't4', type: 'quiz',   title: 'Quick recall quiz',  sub: '4 min',              estMin: 4, state: 'todo' },
  ],
  wordsDue: { count: 6, estMinutes: 3 },
};

export const mockLesson: Lesson = {
  ...mockDashboard.todayLesson,
  tasks: mockDashboard.tasks,
  audioAvailable: true,
};

export const mockArticle: Article = {
  lessonId: 'les_dxb90',
  mode: 'bilingual',
  paragraphs: [
    {
      index: 0,
      en: 'Dubai has become one of the world\'s most popular destinations for expats seeking job opportunities. With over 200 nationalities working in the city, it\'s a truly multicultural place.',
      zh: '迪拜已成为全球最受欢迎的目的地之一，许多外籍人士在这里寻求工作机会。这座城市有超过 200 个国籍的人工作，是一个真正多元文化的地方。',
      highlights: [
        { word: 'destinations', start: 41, end: 53, kind: 'key' },
        { word: 'expats', start: 58, end: 64, kind: 'dotted' },
        { word: 'multicultural', start: 150, end: 163, kind: 'key' },
      ],
    },
    {
      index: 1,
      en: 'Your first 90 days as an expat in Dubai are crucial. This is the time to set up your Emirates ID, open a bank account, and understand the local workplace culture.',
      zh: '作为迪拜外籍人士的前 90 天至关重要。这段时间你需要办理酋长国身份证、开立银行账户，并了解当地的职场文化。',
      highlights: [
        { word: 'Emirates ID', start: 56, end: 67, kind: 'key' },
        { word: 'workplace culture', start: 114, end: 131, kind: 'dotted' },
      ],
    },
    {
      index: 2,
      en: 'Networking is essential in Dubai\'s business landscape. Many job opportunities arise through personal connections and professional events. Joining industry groups and attending meetups can accelerate your career significantly.',
      zh: '在迪拜的商业环境中，建立人脉至关重要。许多工作机会来自个人关系和专业活动。加入行业团体并参加见面会可以显著加速你的职业发展。',
      highlights: [
        { word: 'Networking', start: 0, end: 10, kind: 'key' },
        { word: 'connections', start: 83, end: 94, kind: 'dotted' },
      ],
    },
    {
      index: 3,
      en: 'The tax-free income in Dubai is a major attraction for professionals worldwide. However, it\'s important to budget carefully, as the cost of living — especially housing — can be substantial.',
      zh: '迪拜免税收入对全球专业人士具有极大吸引力。然而，精心预算非常重要，因为生活成本——尤其是住房——可能相当高昂。',
      highlights: [
        { word: 'tax-free', start: 4, end: 12, kind: 'key' },
        { word: 'cost of living', start: 120, end: 134, kind: 'dotted' },
      ],
    },
  ],
  figures: [
    { afterParagraph: 1, caption: { en: 'Downtown Dubai at dusk', zh: '黄昏的迪拜市中心' }, url: null },
  ],
};

export const mockVocabList: VocabList = {
  summary: { total: 56, new: 18, reviewing: 26, mastered: 12, dueCount: 6 },
  items: [
    { id: 'voc_1',  word: 'destination',   translation: '目的地',     status: 'mastered',  srs: { ease: 2.6, intervalDays: 21, dueAt: '2026-06-24', reps: 5 }, lessonId: 'les_dxb90', addedAt: '2026-05-10' },
    { id: 'voc_2',  word: 'multicultural', translation: '多元文化的', status: 'reviewing', srs: { ease: 2.3, intervalDays: 3,  dueAt: '2026-06-04', reps: 2 }, lessonId: 'les_dxb90', addedAt: '2026-05-28' },
    { id: 'voc_3',  word: 'expat',         translation: '外籍人士',   status: 'reviewing', srs: { ease: 2.4, intervalDays: 5,  dueAt: '2026-06-06', reps: 3 }, lessonId: 'les_dxb90', addedAt: '2026-05-28' },
    { id: 'voc_4',  word: 'networking',    translation: '建立人脉',   status: 'new',       srs: { ease: 2.5, intervalDays: 0,  dueAt: '2026-06-03', reps: 0 }, lessonId: 'les_dxb90', addedAt: '2026-06-03' },
    { id: 'voc_5',  word: 'accelerate',    translation: '加速',       status: 'new',       srs: { ease: 2.5, intervalDays: 0,  dueAt: '2026-06-03', reps: 0 }, lessonId: 'les_dxb90', addedAt: '2026-06-03' },
    { id: 'voc_6',  word: 'substantial',   translation: '相当大的',   status: 'new',       srs: { ease: 2.5, intervalDays: 0,  dueAt: '2026-06-03', reps: 0 }, lessonId: 'les_dxb90', addedAt: '2026-06-03' },
    { id: 'voc_7',  word: 'negotiate',     translation: '谈判；协商', status: 'mastered',  srs: { ease: 2.8, intervalDays: 30, dueAt: '2026-07-01', reps: 6 }, lessonId: 'les_dxb90', addedAt: '2026-04-20' },
    { id: 'voc_8',  word: 'relocate',      translation: '搬迁；迁移', status: 'reviewing', srs: { ease: 2.2, intervalDays: 2,  dueAt: '2026-06-04', reps: 1 }, lessonId: 'les_dxb90', addedAt: '2026-05-30' },
  ],
  nextCursor: null,
};

export const mockProfile: Profile = {
  topics: [
    { key: 'career',  label: { en: 'Work & Career', zh: '职业' }, weight: 0.45 },
    { key: 'culture', label: { en: 'Culture',       zh: '文化' }, weight: 0.30 },
    { key: 'food',    label: { en: 'Food',          zh: '美食' }, weight: 0.15 },
    { key: 'other',   label: { en: 'Other',         zh: '其他' }, weight: 0.10 },
  ],
  stats: { masterySpeedDays: 3, accuracyPct: 85, streakDays: 7, newWordsThisWeek: 12, completionPct: 95 },
  recommendation: { topicKey: 'housing', label: { en: 'Housing & Living', zh: '租房生活' }, reason: 'Predicted from your evolving interests' },
};

export const mockWordLookup: WordLookup = {
  word: 'destinations',
  phonetic: '/ˌdestɪˈneɪʃənz/',
  pos: 'noun',
  definitionEn: 'The places to which someone is going or being sent.',
  definitionZh: '目的地；终点',
  example: { en: 'Dubai is a popular destination for young professionals.', zh: '迪拜是年轻职场人热门的目的地。' },
  audioUrl: null,
};

export const mockReviewQueue: ReviewQueue = {
  dueCount: 6,
  estMinutes: 3,
  cards: [
    { id: 'voc_2', word: 'multicultural', prompt: '多元文化的', options: ['multicultural', 'monolingual', 'multinational', 'cultivated'], answer: 'multicultural' },
    { id: 'voc_3', word: 'expat',         prompt: '外籍人士',   options: ['expert', 'expat', 'export', 'expand'],                        answer: 'expat' },
    { id: 'voc_8', word: 'relocate',      prompt: '搬迁；迁移', options: ['relocate', 'revoke', 'remote', 'resolve'],                     answer: 'relocate' },
  ],
};
