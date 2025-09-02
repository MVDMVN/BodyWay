"use client";
import { useEffect, useState, useMemo } from "react";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import u from "./quiz-ui.module.css";
import s from "./StepMulti.module.css";

type Props = { stepKey: StepKey };

export default function StepMultiCard({ stepKey }: Props) {
  const { answers, setAnswer } = useQuiz();

  const selected = (answers[stepKey] as string[] | undefined) ?? [];
  const cfg = QUIZ[stepKey];

  if (cfg.kind !== "single" && cfg.kind !== "multi") return null;

  const [gender, setGender] = useState<"male" | "female">("female");
  useEffect(() => {
    try {
      const g = localStorage.getItem("gender");
      if (g === "male" || g === "female") setGender(g);
    } catch {}
  }, []);

  const options = useMemo(() => cfg.options[gender], [cfg.options, gender]);

  function toggle(value: string) {
    setAnswer(stepKey, selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  }

  const needMin = cfg.kind === "multi" && typeof cfg.min === "number";
  const notEnough = needMin && selected.length < (cfg.min as number);

  return (
    <>
      <h1 className={u.title}>{cfg.title}</h1>
      {"description" in cfg && cfg.description && <p className={u.description}>{cfg.description}</p>}

      <div className={u.list}>
        {options.map((item) => {
          const active = selected.includes(item.value);
          return (
            <button
              key={item.value}
              className={`${u.opt} ${active ? u.optActive : ""}`}
              onClick={() => toggle(item.value)}
              type='button'>
              {item.label}
              {item.image && <img className={u.img} src={item.image} alt={item.label} />}
            </button>
          );
        })}
      </div>

      {needMin && notEnough && (
        <p className={s.minHint}>
          Choose at least {cfg.min}
          {cfg.min === 1 ? "" : " options"} (selected: {selected.length})
        </p>
      )}
    </>
  );
}
