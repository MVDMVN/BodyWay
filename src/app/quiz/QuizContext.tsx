"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { StepKey } from "./schema";
import { QUIZ } from "./schema";

type Answers = Record<string, any>;

type Ctx = {
  answers: Answers;
  setAnswer: <K extends string>(key: K, value: Answers[K]) => void;
  toggleFromArray: (key: string, value: string) => void;
  isAnswered: (key: StepKey) => boolean;
};

const QuizCtx = createContext<Ctx | null>(null);

// Версионированный ключ — можно поменять v1 -> v2, чтобы сбросить старые сохранённые ответы
const LS_KEY = "quizAnswers:v1";
const IS_BROWSER = typeof window !== "undefined";

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({});

  // Загрузка из localStorage (только в браузере)
  useEffect(() => {
    if (!IS_BROWSER) return;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // Подстрахуемся: в хранилище могли оказаться не-объекты
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        setAnswers(parsed as Answers);
      }
    } catch {}
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    if (!IS_BROWSER) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  function setAnswer<K extends string>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFromArray(key: string, value: string) {
    setAnswers((prev) => {
      const set = new Set<string>(Array.isArray(prev[key]) ? (prev[key] as string[]) : []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });
  }

  /** Валидация шага по конфигу QUIZ */
  function isAnswered(key: StepKey): boolean {
    const cfg = QUIZ[key];
    if (!cfg) return true;

    if (cfg.kind === "praise" || cfg.kind === "graphic") return true; // промежуточная страница — всегда разрешаем Next

    if (cfg.kind === "single") {
      const v = answers[key];
      return cfg.validate ? cfg.validate(v) : !!v;
    }

    if (cfg.kind === "multi") {
      const arr = Array.isArray(answers[key]) ? (answers[key] as string[]) : [];
      if (cfg.min != null && arr.length < cfg.min) return false;
      return arr.length > 0;
    }

    if (cfg.kind === "input") {
      const v = answers[key];
      if (cfg.validate) return cfg.validate(v);
      return v != null && String(v).trim() !== "";
    }

    return true;
  }

  const value = useMemo<Ctx>(
    () => ({
      answers,
      setAnswer,
      toggleFromArray,
      isAnswered,
    }),
    [answers],
  );

  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}

export const useQuiz = () => {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz must be used within <QuizProvider>");
  return ctx;
};
