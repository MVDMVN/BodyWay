"use client";
import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import u from "./quiz-ui.module.css";
import s from "./StepGraphic.module.css";

type Props = { stepKey: StepKey };

export default function StepGraphic({ stepKey }: Props) {
  const { answers } = useQuiz();
  const cfg = QUIZ[stepKey];
  if (cfg.kind !== "graphic") return null;

  // шаги, из которых берём значения
  const curKey = cfg.currentKey;
  const tgtKey = cfg.targetKey;
  const unit = cfg.unit ?? "kg";

  const [current, setCurrent] = useState<number | null>(null);
  const [target, setTarget] = useState<number | null>(null);

  useEffect(() => {
    const aCur = answers[curKey];
    const aTgt = answers[tgtKey];

    const lsCur = typeof window !== "undefined" ? localStorage.getItem(curKey) : null;
    const lsTgt = typeof window !== "undefined" ? localStorage.getItem(tgtKey) : null;

    const cur = Number(aCur ?? lsCur);
    const tgt = Number(aTgt ?? lsTgt);

    setCurrent(Number.isFinite(cur) ? cur : null);
    setTarget(Number.isFinite(tgt) ? tgt : null);
  }, [answers, curKey, tgtKey]);

  // набор/снижение
  const isGain = useMemo(() => {
    if (current == null || target == null) return false;
    return target > current;
  }, [current, target]);

  const chartSrc = isGain ? cfg.imageGain : cfg.imageLoss;

  // координаты баблов (в % от контейнера)
  const pos = isGain ? cfg.positions?.gain : cfg.positions?.loss;
  const startPos = pos?.start ?? { top: 28, left: 10 };
  const endPos = pos?.end ?? { top: 62, left: 70 };

  // дата: сегодня + 3 месяца
  const datePlus3m = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <>
      <h1 className={u.title}>{cfg.title}</h1>
      {cfg.description && <p className={u.description}>{cfg.description}</p>}

      {target != null && (
        <div className={s.goalWrap} aria-live='polite'>
          <span className={s.goalValue}>
            {target}
            {unit} by {datePlus3m}
          </span>
          <i className={s.goalUnderline} />
        </div>
      )}

      <div className={s.chartWrap}>
        <img src={chartSrc} alt={isGain ? "Weight gain chart" : "Weight loss chart"} className={s.chartImg} />

        {current != null && (
          <div
            className={`${s.bubble} ${s.bubbleStart}`}
            style={{ top: `${startPos.top}%`, left: `${startPos.left}%` }}>
            {current}
            {unit}
          </div>
        )}

        {target != null && (
          <div className={`${s.bubble} ${s.bubbleEnd}`} style={{ top: `${endPos.top}%`, left: `${endPos.left}%` }}>
            🔥 {target}
            {unit}
          </div>
        )}
      </div>

      {cfg.note && <p className={s.note}>{cfg.note}</p>}
    </>
  );
}
