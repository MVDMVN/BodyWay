"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ, nextKey, pathOf, type StepKey } from "./schema";
import { useQuiz } from "./QuizContext";
import u from "./quiz-ui.module.css";
import s from "./StepEmail.module.css";

type Props = { stepKey: StepKey };

// простая проверка e-mail
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const WEB_APP_URL = process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL || "";

export default function StepEmail({ stepKey }: Props) {
  const router = useRouter();

  const { answers, setAnswer } = useQuiz();
  const cfg = QUIZ[stepKey];
  if (cfg.kind !== "email") return null;

  const [email, setEmail] = useState<string>(String(answers[stepKey] ?? ""));
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // если значение в контексте поменяли снаружи — синхронизируем поле
  useEffect(() => {
    setEmail(String(answers[stepKey] ?? ""));
  }, [answers, stepKey]);

  const valid = EMAIL_RE.test(email.trim());
  const next = nextKey(stepKey);

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    const sp = new URLSearchParams(window.location.search);
    const obj: Record<string, string> = {};
    sp.forEach((v, k) => (obj[k] = v));
    return obj;
  }, []);

  async function submit() {
    setError(null);

    const clean = email.trim();
    if (!EMAIL_RE.test(clean)) {
      setError("Please enter a valid email.");
      return;
    }

    // сохраняем в контекст (он сам положит в localStorage)
    setAnswer(stepKey, clean);

    // готовим полезные поля для таблицы
    const payload = {
      email: clean,
      step: String(stepKey),
      utm,
      url: typeof window !== "undefined" ? window.location.href : "",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      ts: new Date().toISOString(),
      answers, // можно убрать, если не хотите отправлять всё
    };

    // отправка в Apps Script
    setSending(true);
    try {
      if (!WEB_APP_URL) throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not set");

      // таймаут, чтобы не подвисать, если GAS долго отвечает
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 4000);

      // no-cors + keepalive повышают шанс, что запрос уйдёт и не заблокирует переход
      await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
        keepalive: true,
        signal: controller.signal,
      }).catch(() => {
        // в no-cors промис обычно резолвится успешно; если упал — не блокируем UX
      });

      // переходим дальше независимо от статуса отправки
      if (next) router.push(pathOf(next));
    } catch (e) {
      console.error(e);
      // даже при ошибке отправки не удерживаем пользователя,
      // но подсветить можно (если хочешь блокировать — верни return)
      if (next) router.push(pathOf(next));
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={s.wrap}>
      <div className={s.emailTop}>
        {/* допускаем HTML в заголовке (подчёркивания и т.п.) */}
        <h1 className={u.title} dangerouslySetInnerHTML={{ __html: cfg.title }} />
        {"description" in cfg && cfg.description && <p className={u.description}>{cfg.description}</p>}

        <div className={s.field}>
          <label htmlFor={`${stepKey}-email`} className={s.label}>
            {cfg.label ?? "Your email"}
          </label>

          <div className={s.inputWrap}>
            <input
              id={`${stepKey}-email`}
              type='email'
              className={`${s.input} ${email && !valid ? s.inputInvalid : ""}`}
              placeholder={cfg.placeholder ?? "you@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              inputMode='email'
            />
            <span className={s.inputIcon} aria-hidden />
          </div>

          {/* при желании: иконка и подпись под полем */}
          {cfg.descriptionIcon && (
            <div className={s.noteWrapper}>
              <img src={cfg.descriptionIcon} alt='info' />
              <p className={s.note}>
                {cfg.description ?? "We respect your privacy and use your email only to send the program."}
              </p>
            </div>
          )}

          {error && <p className={u.err}>{error}</p>}
        </div>
      </div>

      <button
        type='button'
        className={s.cta}
        onClick={submit}
        disabled={sending || !valid}
        aria-busy={sending ? "true" : "false"}>
        {sending ? "Loading…" : "Get my program"}
      </button>
    </section>
  );
}
