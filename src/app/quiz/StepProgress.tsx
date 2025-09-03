"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ, type StepKey, nextKey, pathOf } from "./schema";
import u from "./quiz-ui.module.css"; // заголовки/описания, если используете
import s from "./StepProgress.module.css"; // локальные стили блока
import ProgressCircle from "./_ui/ProgressCircle"; // ваш готовый кружок

type Props = { stepKey: StepKey };

export default function StepProgress({ stepKey }: Props) {
  const cfg = QUIZ[stepKey];
  const router = useRouter();

  // отрисовываем только для progress-шага
  if (cfg.kind !== "progress") return null;

  // сколько длится анимация
  const duration = cfg.durationMs ?? 3500;
  const afterDelay = cfg.afterDelayMs ?? 400; // небольшая пауза после 100%

  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  // плавная анимация 0 → 100
  useEffect(() => {
    function tick(ts: number) {
      if (start.current == null) start.current = ts;
      const elapsed = ts - start.current;
      const p = Math.min(1, elapsed / duration);
      setValue(Math.round(p * 100));
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    }
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [duration]);

  // переход на следующий шаг, когда анимация завершилась
  useEffect(() => {
    if (value < 100) return;
    const nxt = nextKey(stepKey);
    if (!nxt) return;
    const t = setTimeout(() => router.push(pathOf(nxt)), afterDelay);
    return () => clearTimeout(t);
  }, [value, stepKey, router, afterDelay]);

  // звёздочки для отзывов (если нужны)
  const Stars = useMemo(() => {
    const count = Math.max(0, Math.min(5, cfg.stars ?? 5));
    return (
      <span className={s.stars} aria-hidden>
        {"★".repeat(count)}
      </span>
    );
  }, [cfg.stars]);

  return (
    <section className={s.wrap}>
      {/* заголовок/подзаголовок */}
      <h1 className={u.title}>{cfg.title}</h1>
      {cfg.subtitle && <p className={u.description}>{cfg.subtitle}</p>}

      {/* центр: прогресс-кружок с числом внутри */}
      <div className={s.center}>
        <div className={s.circleWrap}>
          <ProgressCircle value={value} />
        </div>
      </div>

      {/* блок с отзывами */}
      {cfg.reviews?.length ? (
        <>
          {cfg.socialProofTitle && <div className={s.proofTitle}>{cfg.socialProofTitle}</div>}

          <div className={s.cards}>
            {cfg.reviews.map((r, i) => (
              <article key={i} className={s.card}>
                <header className={s.cardHead}>
                  {r.avatar && <img src={r.avatar} alt='' className={s.avatar} />}
                  <div className={s.person}>
                    <div className={s.name}>{r.name}</div>
                    <div className={s.meta}>
                      {Stars}
                      {/* {r.badge && <span className={s.badge}>{r.badge}</span>} */}
                    </div>
                  </div>
                </header>
                <p className={s.text}>{r.text}</p>
              </article>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
