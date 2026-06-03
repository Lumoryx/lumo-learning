export type ID = string;
export type Lang = 'en' | 'zh';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type ArticleMode = 'en' | 'bilingual' | 'zh';
export type TaskType = 'read' | 'listen' | 'vocab' | 'quiz';
export type TaskState = 'todo' | 'active' | 'done';
export type WordStatus = 'new' | 'reviewing' | 'mastered';
export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export interface I18n { en: string; zh: string; }
export interface Paginated<T> { items: T[]; nextCursor: string | null; total?: number; }
export interface Ok { ok: true; }

export interface AuthTokens { accessToken: string; refreshToken: string; expiresIn: number; }
export interface User { id: ID; name: string; email: string; avatarUrl: string | null; level: Level; streakDays: number; createdAt: string; }
export interface AuthResult { user: User; tokens: AuthTokens; isNewUser?: boolean; }

export interface Settings {
  appLanguage: Lang;
  dailyGoalMinutes: number;
  notifications: { dailyReminder: boolean; streakAlert: boolean; reviewDue: boolean };
}
export interface AiStatus { connected: boolean; provider: 'openai'; model: string; creditsUsd: number | null; lastValidatedAt: string | null; }

export interface Task { id: ID; type: TaskType; title: string; sub: string; estMin: number; state: TaskState; }
export interface LessonProgress { tasksDone: number; tasksTotal: number; positionSec?: number; }
export interface LessonCard { id: ID; title: I18n; topic: string; level: Level; durationMin: number; wordCount?: number; coverUrl: string | null; tags: string[]; aiGenerated?: boolean; progress?: LessonProgress; }
export interface Lesson extends LessonCard { tasks: Task[]; audioAvailable: boolean; }

export interface Highlight { word: string; start: number; end: number; kind: 'key' | 'dotted'; }
export interface Paragraph { index: number; en?: string; zh?: string; highlights: Highlight[]; }
export interface Figure { afterParagraph: number; caption: I18n; url: string | null; }
export interface Article { lessonId: ID; mode: ArticleMode; paragraphs: Paragraph[]; figures: Figure[]; }

export interface AudioTrack { url: string; durationSec: number; voice: string; }
export interface QuizResult { score: number; correct: number; total: number; wordsUpdated: ID[]; }

export interface WordLookup { word: string; phonetic: string; pos: string; definitionEn: string; definitionZh: string; example: I18n; audioUrl: string | null; }

export interface Srs { ease: number; intervalDays: number; dueAt: string; reps: number; }
export interface VocabEntry { id: ID; word: string; translation: string; status: WordStatus; srs: Srs; lessonId?: ID; addedAt: string; }
export interface VocabSummary { total: number; new: number; reviewing: number; mastered: number; dueCount: number; }
export interface VocabList { summary: VocabSummary; items: VocabEntry[]; nextCursor: string | null; }
export interface ReviewCard { id: ID; word: string; prompt: string; options: string[]; answer: string; }
export interface ReviewQueue { dueCount: number; estMinutes: number; cards: ReviewCard[]; }

export interface TopicPref { key: string; label: I18n; weight: number; }
export interface ProfileStats { masterySpeedDays: number; accuracyPct: number; streakDays: number; newWordsThisWeek: number; completionPct: number; }
export interface Profile { topics: TopicPref[]; stats: ProfileStats; recommendation: { topicKey: string; label: I18n; reason: string }; }

export interface DashboardData {
  greeting: string; date: string;
  dailyGoal: { targetMin: number; doneMin: number };
  streakDays: number;
  stats: { streak: number; newWordsThisWeek: number; completionPct: number };
  todayLesson: LessonCard;
  tasks: Task[];
  wordsDue: { count: number; estMinutes: number };
}
