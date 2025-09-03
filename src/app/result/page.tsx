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

  useEffect(() => {
    try {
      const raw = localStorage.getItem("quizAnswers:v1");
      if (raw) setAnswers(JSON.parse(raw));
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

  return (
    <div className={s.app}>
      <header className={s.header}>
        <div className={`${s.container} ${s.headerRow}`}>
          <Link href='/' className={s.logo}>
            <img src='/images/logo.png' alt='Unimeal' />
          </Link>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
            Get My Results
          </button>
        </div>
      </header>

      <main>
        {/* Before / After */}
        <section className={s.section}>
          <div className={s.container}>
            <div className={s.ba}>
              <div className={s.baCol}>
                <div className={s.baLabel}>Your weight</div>
                <img src='/images/before.png' alt='Before' width={155} height={230} />
                <ul className={s.bars}>
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={s.bar} />
                  <li className={s.bar} />
                  <li className={s.bar} />
                </ul>
              </div>

              <div className={s.baArrow}>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M8 4l8 8-8 8' fill='none' stroke='currentColor' strokeWidth='2' />
                </svg>
              </div>

              <div className={s.baCol}>
                <div className={s.baLabel}>Goal</div>
                <img src='/images/after.png' alt='After' width={155} height={230} />
                <ul className={s.bars}>
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                  <li className={`${s.bar} ${s.barOn}`} />
                </ul>
              </div>
            </div>

            <p className={s.subtitle} style={{ marginTop: 8 }}>
              Results are not typical. Individual results may vary.
            </p>
          </div>
        </section>

        {/* Personalized plan */}
        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.title}>
              Personalized plan for <span className={s.accent}>{name || "Alex"}</span> is{" "}
              <span className={s.accent}>ready</span>!
            </h2>

            <div className={s.cards}>
              <article className={s.card}>
                <img className={s.cardIcon} src='/images/goal.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Goal</div>
                  <div className={s.cardValue}>{goalDiffLabel}</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src='/images/meta.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Metabolic age</div>
                  <div className={s.cardValue}>{String(answers.stepAge ?? "—")}</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src='/images/energy.svg' alt='' />
                <div>
                  <div className={s.cardTitle}>Energy level</div>
                  <div className={s.cardValue}>Drained</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src='/images/target.svg' alt='' />
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
                    <svg viewBox='0 0 24 24' aria-hidden='true'>
                      <path d='M20 6l-11 11-5-5' fill='none' stroke='currentColor' strokeWidth='2' />
                    </svg>
                    <span>{t}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Money-back */}
        <section className={s.section}>
          <div className={`${s.container} ${s.money}`}>
            <img className={s.moneyBadge} src='/images/moneyback.svg' alt='Money-back' />
            <h2 className={s.title}>Money-Back Guarantee</h2>
            <p className={s.subtitle}>
              If you don’t get visible results, you can get a full refund within 30 days after purchase.
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.container}>
          <p>Copyright © 2022 AmoApps Limited — All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
