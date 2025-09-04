// layout.tsx (фрагмент)
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

// более мягкая кривая
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const fadeVariants: Variants = {
  init: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.28, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: EASE } },
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

  // 🔮 префетчим следующий шаг — уменьшает «паузу» на монтировании нового экрана
  useEffect(() => {
    if (next) router.prefetch(pathOf(next));
  }, [next, router]);

  function goNext() {
    if (!isAnswered(currentKey)) return;
    if (cfg?.ui?.nextPath) return router.push(cfg.ui.nextPath);
    if (next) router.push(pathOf(next));
  }

  // ---------- фиксация высоты на время кросс-фейда ----------
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [lockedH, setLockedH] = useState<number | undefined>(undefined);
  const [animating, setAnimating] = useState(false);

  // первичный замер
  useLayoutEffect(() => {
    const el = sceneRef.current;
    if (el) setLockedH(el.offsetHeight);
  }, []);

  // перед СМЕНОЙ шага — зафиксируем текущую высоту (чтобы не дёргалось в процессе)
  useLayoutEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    // как только ключ поменялся, старый слой ещё на месте — фиксируем его высоту
    setAnimating(true);
    setLockedH(el.offsetHeight);
  }, [currentKey]);

  // по завершении выхода — отпускаем высоту и меряем новую
  function handleExitComplete() {
    requestAnimationFrame(() => {
      const el = sceneRef.current;
      if (!el) return;
      setLockedH(el.offsetHeight);
      setAnimating(false);
    });
  }

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
          <div
            ref={stageRef}
            className={s.stage}
            style={{
              height: lockedH, // ← фиксируем на время анимации
              overflow: lockedH ? "hidden" : undefined,
              position: "relative",
            }}>
            <AnimatePresence
              /* ВАЖНО: синхронный режим для кросс-фейда */
              initial={false}
              onExitComplete={handleExitComplete}>
              <motion.div
                key={currentKey}
                ref={sceneRef}
                className={s.scene}
                variants={fadeVariants}
                initial='init'
                animate='enter'
                exit='exit'
                style={{
                  // GPU-композитинг, чтобы opacity шёл без рефлоу
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                  willChange: "opacity",
                  pointerEvents: animating ? "none" : undefined, // чтобы не словить клики во время кросс-фейда
                }}>
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
