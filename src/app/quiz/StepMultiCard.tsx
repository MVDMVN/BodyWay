"use client";
import { useEffect, useState, useMemo } from "react";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import { Title, List, Opt, Img } from "./QuizCardUI";

type Props = { stepKey: StepKey };

export default function StepMultiCard({ stepKey }: Props) {
  const { answers, setAnswer } = useQuiz();

  // текущее значение шага — массив строк
  const selected = (answers[stepKey] as string[] | undefined) ?? [];
  const cfg = QUIZ[stepKey];

  // ⛔ если это praise (или input), у него нет options — ничего не рендерим
  if (cfg.kind !== "single" && cfg.kind !== "multi") {
    return null;
  }

  // получаем gender из localStorage
  const [gender, setGender] = useState<"male" | "female">("female");
  useEffect(() => {
    try {
      const gender = localStorage.getItem("gender");
      if (gender === "male" || gender === "female") setGender(gender);
    } catch {}
  }, []);

  // массив опций для текущего пола
  const options = useMemo(() => {
    return cfg.options[gender];
  }, [cfg.options, gender]);

  // переключение элемента в массиве
  function toggle(value: string) {
    setAnswer(stepKey, selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  }

  return (
    <>
      <Title>{cfg.title}</Title>

      <List>
        {options.map((item) => {
          const active = selected.includes(item.value);
          return (
            <Opt key={item.value} $active={active} onClick={() => toggle(item.value)}>
              {item.label}
              {item.image && <Img src={item.image} alt={item.label} />}
            </Opt>
          );
        })}
      </List>
    </>
  );
}
