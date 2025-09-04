"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { kebabToCamel } from "./_utils/case";
import { QUIZ, ORDER, pathOf, nextKey, prevKey, type StepKey } from "./schema";
import { QuizProvider, useQuiz } from "./QuizContext";
import { AnimatePresence, motion } from "framer-motion";
import s from "./layout.module.css";
import PrimaryButton from "./_ui/PrimaryButton";

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

  const afterQuiz = pathname.split("/quiz")[1] || "";
  const seg = afterQuiz.split("/").filter(Boolean)[0] || "step-age-range";
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
    if (cfg?.ui?.nextPath) {
      router.push(cfg.ui.nextPath);
      return;
    }
    if (next) {
      router.push(pathOf(next));
    }
  }

  // fade-only
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

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
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={currentKey}
              variants={variants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              {children}
            </motion.div>
          </AnimatePresence>
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
