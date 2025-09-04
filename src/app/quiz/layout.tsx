"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { kebabToCamel } from "./_utils/case";
import { QUIZ, ORDER, pathOf, nextKey, prevKey, type StepKey } from "./schema";
import { QuizProvider, useQuiz } from "./QuizContext";
import s from "./layout.module.css";
import PrimaryButton from "./_ui/PrimaryButton";

// один раз, вне компонента
const fadeVariants: Variants = {
  init: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.25, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      <Shell>{children}</Shell>
    </QuizProvider>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // тек. шаг
  const seg = (pathname.split("/quiz")[1] || "").split("/").filter(Boolean)[0] || "step-age-range";
  const currentKey = kebabToCamel(seg) as StepKey;

  const cfg = QUIZ[currentKey];
  const { isAnswered } = useQuiz();

  const idx = Math.max(0, ORDER.indexOf(currentKey));
  const progress = Math.round(((idx + 1) / ORDER.length) * 100);
  const prev = prevKey(currentKey);
  const next = nextKey(currentKey);

  const hideHeader = cfg?.ui?.hideHeader === true;
  const hideNextBtn = cfg?.ui?.hideNextBtn === true;
  const maxWidth = cfg?.ui?.width ?? "500px";
  const canGoNext = isAnswered(currentKey) && (!!next || !!cfg?.ui?.nextPath);

  function goNext() {
    if (!isAnswered(currentKey)) return;
    if (cfg?.ui?.nextPath) return router.push(cfg.ui.nextPath);
    if (next) router.push(pathOf(next));
  }

  // ---- высота сцены (анти-скачок) ----
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);

  // 1) первичное измерение после маунта (без мигания)
  useLayoutEffect(() => {
    const el = sceneRef.current;
    if (el) setFixedHeight(el.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // один раз

  // 2) следим за изменением высоты контента (разные шаги — разная высота)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setFixedHeight(el.offsetHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [currentKey]);

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {hideHeader ? (
          <header className={s.header}>
            <Link href={prev ? pathOf(prev) : "/"} className={s.backBtn} aria-label='Back'>
              <img src='/images/back-arrow.svg' alt='' />
            </Link>
            <div className={`${s.logo} ${s.logoCenter}`}>
              <img src='/images/logo.png' alt='' />
            </div>
          </header>
        ) : (
          <header className={s.header}>
            <Link href={prev ? pathOf(prev) : "/"} className={s.backBtn} aria-label='Back'>
              <img src='/images/back-arrow.svg' alt='' />
            </Link>
            <div className={s.logo}>
              <img src='/images/logo.png' alt='' />
            </div>
            <p className={s.meta}>
              {idx + 1}/{ORDER.length}
            </p>
          </header>
        )}

        {!hideHeader && (
          <div className={s.progress}>
            <div className={s.bar}>
              <i className={s.fill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <main className={s.card} style={{ maxWidth }}>
          {/* ВАЖНО: пока нет замера — не навешиваем overflow:hidden и не задаём 0-высоту */}
          <div
            ref={stageRef}
            className={s.stage}
            style={{
              height: fixedHeight, // число -> px
              overflow: fixedHeight ? "hidden" : undefined, // не режем до первого замера
              position: "relative",
            }}>
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={currentKey}
                ref={sceneRef}
                className={s.scene}
                variants={fadeVariants}
                initial='init'
                animate='enter'
                exit='exit'>
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {!hideNextBtn && (
        <PrimaryButton className={s.btnPrimary} onClick={goNext} disabled={!canGoNext}>
          Next
        </PrimaryButton>
      )}
    </div>
  );
}
