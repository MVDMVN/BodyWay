"use client";

import Link from "next/link";
import s from "./marketing.module.css";

function setGender(gender: "male" | "female") {
  try {
    localStorage.setItem("gender", gender);
  } catch (e) {
    console.error("Ошибка записи в localStorage", e);
  }
}

export default function Page() {
  return (
    <>
      <header className={s.header}>
        <div className={s.headerRow}>
          <div className={s.logo}>
            <img src='/images/logo.png' alt='BodyWay' />
          </div>
        </div>
      </header>

      <main>
        <section className={s.sectionHeader}>
          <div className={s.boyElement}></div>
          <div className={s.girlElement}></div>

          <div className={s.contentBlock}>
            <div className={s.contentWrapper}>
              <h1>
                A new scientific weight loss method developed by experts at the Institute of Health - 100% guaranteed
                results! Based on the principles of a healthy lifestyle and behavior change.
              </h1>
              <p className={s.contentDescription}>
                Take our Quiz to get a personal meal plan and workout program to achieve your weight goals!
              </p>
              <p className={s.contentGender}>Select your gender</p>
              <div className={s.quizButtonsWrapper}>
                <Link href='/quiz/step-age-range' className={s.contentMaleButton} onClick={() => setGender("male")}>
                  Male
                </Link>
                <Link href='/quiz/step-age-range' className={s.contentFemaleButton} onClick={() => setGender("female")}>
                  Female
                </Link>
              </div>
            </div>

            <div className={s.mobileGuysBlock}>
              <img loading='lazy' src='/images/mobile-guys.svg' alt='' />
            </div>
            <div className={s.tabletGuysBlock}>
              <img loading='lazy' width='308' height='340' src='/images/tablet-guys.svg' alt='' />
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <p className={s.footerText}>
            *Cleveland Clinic Bariatric & Metabolic Institute Evidence-Based: Clinical Research DiRECT (Lancet, 2025) -
            Total Diet Replacement (TDR)
          </p>
        </footer>
      </main>
    </>
  );
}
