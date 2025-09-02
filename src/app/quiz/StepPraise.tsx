"use client";
import { useEffect, useState } from "react";
import { QUIZ, type StepKey } from "../quiz/schema";
import s from "./StepPraise.module.css";

type Props = { stepKey: StepKey };

export default function StepPraise({ stepKey }: Props) {
  const cfg = QUIZ[stepKey];
  if (cfg.kind !== "praise") return null;

  const [gender, setGender] = useState<"male" | "female">("female");

  useEffect(() => {
    try {
      const g = localStorage.getItem("gender");
      if (g === "male" || g === "female") setGender(g);
    } catch {
      /* noop */
    }
  }, []);

  // alt-тексты (если нет в конфиге — используем заголовок)
  const altMale = (cfg as any).altMale || cfg.title;
  const altFemale = (cfg as any).altFemale || cfg.title;

  return (
    <section className={s.wrap}>
      {/* polite — чтобы экранный диктор мягко озвучил новый блок при смене шага */}
      <div className={s.text} aria-live='polite'>
        <h1 className={s.title}>{cfg.title}</h1>
        {cfg.description && <p className={s.body}>{cfg.description}</p>}
      </div>

      {gender === "male" && (
        <img
          className={s.pic}
          src={cfg.imageMale}
          alt={altMale}
          loading='lazy'
          decoding='async'
          sizes='(max-width: 600px) 100vw, 350px'
          fetchPriority='low'
        />
      )}

      {gender === "female" && (
        <img
          className={s.pic}
          src={cfg.imageFemale}
          alt={altFemale}
          loading='lazy'
          decoding='async'
          sizes='(max-width: 600px) 100vw, 350px'
          fetchPriority='low'
        />
      )}
    </section>
  );
}
