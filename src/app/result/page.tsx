"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import s from "./result.module.css";
import { Images } from "../quiz/schema";

type Answers = Record<string, unknown>;

function num(v: unknown) {
  if (typeof v === "number") return v;
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

/** Собираем строку запроса ИЗ "utm:v1" — берём все ключи, не только utm_* */
function getAllParamsQueryString(): string {
  try {
    const raw = localStorage.getItem("utm:v1");
    if (!raw) return "";

    // Попытка как JSON-объект
    try {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      const params = new URLSearchParams();
      Object.entries(obj).forEach(([k, v]) => {
        const key = String(k).trim();
        const val = v == null ? "" : String(v).trim();
        if (!key || !val) return;
        params.set(key, val); // кладём ВСЁ (utm, idpxl, token, и т.д.)
      });
      return params.toString();
    } catch {
      // Иначе считаем, что там уже готовая query-строка
      const str = raw.trim().replace(/^[?#]/, "");
      const parsed = new URLSearchParams(str);
      const params = new URLSearchParams();
      parsed.forEach((value, key) => {
        if (key && value) params.set(key, value);
      });
      return params.toString();
    }
  } catch {
    return "";
  }
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
    const z = (answers as any).stepTargetZones;
    return Array.isArray(z) && z.length ? z.join(", ") : "Arms, Legs, Abs";
  }, [answers]);

  // 👉 кнопка перехода на оффер: offer:v1 + все пары из utm:v1
  function handleGetProgram() {
    try {
      const offer = localStorage.getItem("offer:v1") || "{offer}";
      const q = getAllParamsQueryString();
      const sep = offer.includes("?") ? "&" : "?";
      const targetUrl = q ? `${offer}${sep}${q}` : offer;
      window.location.replace(targetUrl);
    } catch (e) {
      console.error("Error building offer URL", e);
    }
  }

  return (
    <div className={s.app}>
      <header className={s.header}>
        <div className={`${s.container} ${s.headerRow}`}>
          <Link href='/' className={s.logo}>
            <img src={Images.logo} alt='Unimeal' />
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
                  <img src={Images.resultFatMale} alt='Before' />
                ) : (
                  <img src={Images.resultFatFemale} alt='Before' />
                )}
              </div>
              <div className={`${s.baImg} ${s.imgR}`}>
                {gender === "male" ? (
                  <img src={Images.resultFitMale} alt='After' />
                ) : (
                  <img src={Images.resultFitFemale} alt='After' />
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

              <img className={s.baArrow} src={Images.arrowRight} alt='' aria-hidden='true' />
            </div>

            <p className={s.subtitle} style={{ marginTop: 8 }}>
              Results are not typical. Individual results may vary.
            </p>
          </div>

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
                <img className={s.cardIcon} src={Images.resultGoal} alt='' />
                <div>
                  <div className={s.cardTitle}>Goal</div>
                  <div className={s.cardValue}>{goalDiffLabel}</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src={Images.resultAge} alt='' />
                <div>
                  <div className={s.cardTitle}>Age</div>
                  <div className={s.cardValue}>{String(answers.stepAge ?? "—")}</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src={Images.resultEnergy} alt='' />
                <div>
                  <div className={s.cardTitle}>Energy level</div>
                  <div className={s.cardValue}>Drained</div>
                </div>
              </article>

              <article className={s.card}>
                <img className={s.cardIcon} src={Images.resultTarget} alt='' />
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
                    <img src={Images.resultCheck} alt='' />
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
            <img className={s.moneyBadge} src={Images.resultMoney} alt='Money-back' />
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
