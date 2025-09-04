"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import s from "./result.module.css";

type Answers = Record<string, unknown>;

function num(v: unknown) {
  if (typeof v === "number") return v;
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

export default function ResultPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("quizAnswers:v1");
      if (raw) setAnswers(JSON.parse(raw));
      setGender(localStorage.getItem("gender"));
    } catch {}
  }, []);

  const name = useMemo(() => String(answers.stepName ?? "Alex").trim(), [answers]);

  const goalDiffLabel = useMemo(() => {
    const cur = num(answers.stepWeight);
    const target = num(answers.stepWeightGoal);
    if (!Number.isFinite(cur) || !Number.isFinite(target)) return "- kg";
    const diff = cur - target;
    const sign = diff > 0 ? "-" : diff < 0 ? "+" : "";
    return `${sign}${Math.abs(diff)} kg`;
  }, [answers]);

  const zones = useMemo(() => {
    const z = answers.stepTargetZones;
    return Array.isArray(z) && z.length ? z.join(", ") : "Arms, Legs, Abs";
  }, [answers]);

  // 👉 обработчик кнопки перехода на оффер
  function handleGetProgram() {
    const offer = "{offer}"; // макрос Keitaro подставит оффер-домен
    const qs = typeof window !== "undefined" ? window.location.search : "";
    const sep = offer.includes("?") ? "&" : "?";
    const targetUrl = qs ? `${offer}${sep}${qs.slice(1)}` : offer;
    window.location.replace(targetUrl);
  }

  return (
    <div className={s.app}>
      <header className={s.header}>
        <div className={`${s.container} ${s.headerRow}`}>
          <Link href='/' className={s.logo}>
            <img src='/images/logo.png' alt='Unimeal' />
          </Link>
        </div>
      </header>

      <main>
        <section className={s.section}>
          <div className={s.container}>
            <div className={s.ba}>
              {/* row 1 — labels */}
              <div className={`${s.baLabel} ${s.labelL}`}>Your weight</div>
              <div className={`${s.baLabel} ${s.labelR}`}>Goal</div>

              {/* row 2 — images */}
              <div className={`${s.baImg} ${s.imgL}`}>
                {gender === "male" ? (
                  <img src='/images/result/male-fat.webp' alt='Before' />
                ) : (
                  <img src='/images/result/female-fat.webp' alt='Before' />
                )}
              </div>
              <div className={`${s.baImg} ${s.imgR}`}>
                {gender === "male" ? (
                  <img src='/images/result/male-fit.webp' alt='After' />
                ) : (
                  <img src='/images/result/female-fit.webp' alt='After' />
                )}
              </div>

              <section className={`${s.bf} ${s.bfL}`}>
                <p className={s.bfTitle}>Body fat</p>
                <p className={s.bfValue}>&gt;32%</p>
              </section>
              <section className={`${s.bf} ${s.bfR}`}>
                <p className={s.bfTitle}>Body fat</p>
                <p className={s.bfValue}>14–20%</p>
              </section>

              <div className={`${s.barsWrapper} ${s.leftBar}`}>
                <p className={s.barTitle}>Energy level</p>
                <ul className={`${s.bars} ${s.barsL}`}>
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={s.bar} />
                  <li className={s.bar} />
                  <li className={s.bar} />
                </ul>
              </div>
              <div className={s.barsWrapper}>
                <p className={s.barTitle}>Energy level</p>
                <ul className={`${s.bars} ${s.barsR}`}>
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                </ul>
              </div>

              {/* overlay arrow */}
              <img className={s.baArrow} src='/images/result/arrow-right.svg' alt='' aria-hidden='true' />
            </div>

            <p className={s.subtitle} style={{ marginTop: 8 }}>
              Results are not typical. Individual results may vary.
            </p>
          </div>

          {/* скролл вниз */}
          <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleGetProgram}>
            Get My Results
          </button>
        </section>

        {/* Personalized plan */}
        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.cardMainTitle}>
              Personalized plan for <span className={s.accent}>{name || "Alex"}</span> is{" "}
              <span className={s.accent}>ready</span>!
            </h2>

            <div className={s.cards}>
              <article className={s.card}>
                <img className={s.cardIcon} src='/images/result/goal.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Goal</div>
                  <div className={s.cardValue}>{goalDiffLabel}</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src='/images/result/age.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Age</div>
                  <div className={s.cardValue}>{String(answers.stepAge ?? "—")}</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src='/images/result/energy.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Energy level</div>
                  <div className={s.cardValue}>Drained</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src='/images/result/target.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Target zones</div>
                  <div className={s.cardValue}>{zones}</div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Goals checklist */}
        <section className={`${s.section} ${s.sectionSoft}`}>
          <div className={s.container}>
            <h2 className={s.title}>Goals for your plan also include:</h2>
            <div className={s.checklist}>
              {["Reduce stress", "Feel healthier", "Form a healthy habit", "Improve sleep", "Self-discipline"].map(
                (t) => (
                  <div className={s.check} key={t}>
                    <img src='/images/result/check.svg' alt='' />
                    <span>{t}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Money-back */}
        <section className={`${s.section} ${s.moneyBlock}`}>
          <div className={`${s.container} ${s.money}`}>
            <img className={s.moneyBadge} src='/images/result/money.svg' alt='Money-back' />
            <h2 className={s.moneyTitle}>Money-Back Guarantee</h2>
            <p className={s.moneySubtitle}>
              In case you don’t get visible results, you can get a full refund within 30 days after purchase.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
