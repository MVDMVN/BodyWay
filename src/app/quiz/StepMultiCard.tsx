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

  if (cfg.kind !== "multi") return null;

  const [gender, setGender] = useState<"male" | "female">("female");
  useEffect(() => {
    try {
      const g = localStorage.getItem("gender");
      if (g === "male" || g === "female") setGender(g);
    } catch {}
  }, []);

  const options = useMemo(() => cfg.options[gender], [cfg.options, gender]);

  function toggle(value: string) {
    if (value === "none") {
      // если "none" уже выбран → убираем его
      if (selected.includes("none")) {
        setAnswer(stepKey, []);
      } else {
        setAnswer(stepKey, ["none"]);
      }
    } else {
      setAnswer(
        stepKey,
        selected.includes(value)
          ? selected.filter((v) => v !== value && v !== "none") // убираем "value" и "none"
          : [...selected.filter((v) => v !== "none"), value], // добавляем value и чистим "none"
      );
    }
  }

  const needMin = cfg.kind === "multi" && typeof cfg.min === "number";
  const notEnough = needMin && selected.length < (cfg.min as number);

  return (
    <>
      <h1 className={u.title}>{cfg.title}</h1>
      {"description" in cfg && cfg.description && <p className={u.description}>{cfg.description}</p>}

      <div className={u.list}>
        <>
          {options.map((item) => {
            const active = selected.includes(item.value);
            const disabled = selected.includes("none") && item.value !== "none";

            return (
              <button
                key={item.value}
                className={`${u.opt} ${active ? u.optActive : ""}`}
                onClick={() => toggle(item.value)}
                type='button'
                disabled={disabled}>
                <span className={s.checkboxWrap}>
                  {active ? (
                    <img src='/images/checked.svg' alt='checked' className={s.checkbox} />
                  ) : (
                    <img src='/images/unchecked.svg' alt='unchecked' className={s.checkbox} />
                  )}
                </span>
                <span className={s.label}>{item.label}</span>
                {item.image && <img className={u.img} src={item.image} alt={item.label} />}
                {item.icon && <img className={u.imgIcon} src={item.icon} alt={item.label} />}
              </button>
            );
          })}

          {/* None of the above */}
          {cfg.hasUltiButton &&
            (() => {
              const noneActive = selected.includes("none");
              return (
                <div className={s.noneBtnWrapper}>
                  <button
                    className={`${u.opt} ${noneActive ? u.optActive : ""} ${s.noneBtn}`}
                    onClick={() => toggle("none")}
                    type='button'>
                    <span className={s.checkboxWrap}>
                      {noneActive ? (
                        <img src='/images/checked.svg' alt='checked' className={s.checkbox} />
                      ) : (
                        <img src='/images/unchecked.svg' alt='unchecked' className={s.checkbox} />
                      )}
                    </span>
                    <span className={s.label}>None of the above</span>
                  </button>
                </div>
              );
            })()}
        </>
      </div>
    </>
  );
}
