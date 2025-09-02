"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { StepKey } from "./schema";
import { QUIZ } from "./schema";

type Answers = Record<string, any>; // можно сузить по полям, если хочешь строгость

type Ctx = {
  answers: Answers;
  setAnswer: <K extends string>(key: K, value: Answers[K]) => void;
  toggleFromArray: (key: string, value: string) => void;
  isAnswered: (key: StepKey) => boolean;
};

const QuizCtx = createContext<Ctx | null>(null);
const KEY = "quizAnswers";

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(answers));
  }, [answers]);

  function setAnswer<K extends string>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFromArray(key: string, value: string) {
    setAnswers((prev) => {
      const arr = new Set<string>(Array.isArray(prev[key]) ? prev[key] : []);
      arr.has(value) ? arr.delete(value) : arr.add(value);
      return { ...prev, [key]: Array.from(arr) };
    });
  }

  /** ВАЖНО: валидация шага читает правила из конфигурации QUIZ */
  function isAnswered(key: StepKey): boolean {
    const cfg = QUIZ[key];
    if (!cfg) return true;

    if (cfg.kind === "praise") return true; // 👈 всегда можно идти дальше

    if (cfg.kind === "single") {
      const v = answers[key];
      return cfg.validate ? cfg.validate(v) : !!v;
    }

    if (cfg.kind === "multi") {
      const arr = Array.isArray(answers[key]) ? (answers[key] as string[]) : [];
      if (cfg.min != null && arr.length < cfg.min) return false;
      return arr.length > 0;
    }

    // if (cfg.kind === "input") {
    //   if (cfg.validate) return cfg.validate(v);
    //   return !!v; // по умолчанию не пусто
    // }

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
