"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { kebabToCamel } from "./_utils/case";
import { QUIZ, ORDER, pathOf, nextKey, prevKey, type StepKey } from "./schema";
import { QuizProvider, useQuiz } from "./QuizContext";
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

  function goNext() {
    if (!next) return;
    if (!isAnswered(currentKey)) return;
    router.push(pathOf(next));
  }

  const hideHeader = cfg?.ui?.hideHeader === true;
  const hideNextBtn = cfg?.ui?.hideNextBtn === true;
  const maxWidth = cfg?.ui?.width ?? cfg?.ui?.width ?? "500px";

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {hideHeader && (
          <header className={s.header}>
            <Link href={prev ? pathOf(prev) : "/"} className={s.backBtn} aria-label='Back'>
              <img src='/images/back-arrow.svg' alt='' />
            </Link>
            <div className={`${s.logo} ${s.logoCenter}`}>
              <img src='/images/logo.png' alt='' />
            </div>
          </header>
        )}
        {!hideHeader && (
          <header className={s.header}>
            {/* Back как ссылка: если нет prev — уводим на "/" */}
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

        <main className={s.card} style={{ maxWidth: maxWidth ?? "500px" }}>
          {children}
        </main>
      </div>

      {!hideNextBtn && (
        <PrimaryButton className={s.btnPrimary} onClick={goNext} disabled={!isAnswered(currentKey) || !next}>
          Next
        </PrimaryButton>
      )}
    </div>
  );
}
