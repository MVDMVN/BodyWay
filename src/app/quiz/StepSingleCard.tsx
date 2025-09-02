"use client";
import { useEffect, useState, useMemo } from "react";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import u from "./quiz-ui.module.css"; // общие классы
import s from "./StepSingle.module.css"; // локальные стили side/tooltip

type Props = { stepKey: StepKey };

export default function StepSingleCard({ stepKey }: Props) {
  const { answers, setAnswer } = useQuiz();
  const cfg = QUIZ[stepKey];
  const current = answers[stepKey] as string;

  if (cfg.kind !== "single") return null;
  const single = cfg;

  const [gender, setGender] = useState<"male" | "female">("female");
  useEffect(() => {
    try {
      const g = localStorage.getItem("gender");
      if (g === "male" || g === "female") setGender(g);
    } catch {}
  }, []);

  const options = useMemo(() => single.options[gender], [single.options, gender]);

  const sideImage = useMemo(
    () => (gender === "male" ? single.sideImageMale ?? null : single.sideImageFemale ?? null),
    [single.sideImageMale, single.sideImageFemale, gender],
  );

  const [showTip, setShowTip] = useState(false);

  function choose(value: string) {
    setAnswer(stepKey, value);
    if (single.tooltipTitle) setShowTip(true);
  }

  const hasSide = !!sideImage;

  // найдём выбранную опцию и её группу
  const selectedOpt = options.find((o) => o.value === current);
  const groupKey = selectedOpt?.group;

  // попробуем взять tooltip по группе
  const groupTip = groupKey ? single.tooltipByGroup?.[groupKey] : undefined;

  // решаем, что показывать
  const hasGroupedTip = !!groupTip?.title || !!groupTip?.text;
  const hasLegacyTip = !!single.tooltipTitle || !!single.tooltipText;

  return (
    <>
      <h1 className={u.title}>{single.title}</h1>
      {"description" in single && single.description && <p className={u.description}>{single.description}</p>}

      {hasSide ? (
        <section className={s.withSide}>
          <div className={s.sideWrapper}>
            <aside className={s.sideCol}>
              {sideImage && <img className={s.sideImg} src={sideImage} alt='' loading='eager' />}
            </aside>

            <div className={s.contentCol}>
              <div className={u.list}>
                {options.map((item) => {
                  const active = current === item.value;
                  return (
                    <button
                      key={item.value}
                      className={`${u.opt} ${active ? u.optActive : ""}`}
                      onClick={() => choose(item.value)}
                      type='button'>
                      {item.label}
                      {item.image && <img className={u.img} src={item.image} alt={item.label} />}
                      {item.icon && <img className={u.imgIcon} src={item.icon} alt={item.label} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {single.tooltipTitle && showTip && (
            <div className={s.tip} role='status'>
              {single.tooltipIcon && single.tooltipIcon}
              <div>
                <div className={s.tipTitle}>{single.tooltipTitle}</div>
                {single.tooltipText && <div className={s.tipText}>{single.tooltipText}</div>}
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          <div className={u.list}>
            {options.map((item) => {
              const active = current === item.value;
              return (
                <button
                  key={item.value}
                  className={`${u.opt} ${active ? u.optActive : ""}`}
                  onClick={() => choose(item.value)}
                  type='button'>
                  {item.label}
                  {item.image && <img className={u.img} src={item.image} alt={item.label} />}
                  {item.icon && <img className={u.imgIcon} src={item.icon} alt={item.label} />}
                </button>
              );
            })}
          </div>

          {hasGroupedTip ? (
            <>
              <div className={s.tip} role='status'>
                {groupTip?.iconSrc && <span className={s.tipIcon}>{groupTip.iconSrc}</span>}
                <div>
                  <div className={s.tipTitle}>{groupTip?.title}</div>
                  {groupTip?.text && <div className={s.tipText}>{groupTip.text}</div>}
                </div>
              </div>
              {groupTip?.note && <p className={s.tipNote}>{groupTip.note}</p>}
            </>
          ) : hasLegacyTip ? (
            <div className={s.tip} role='status'>
              {single.tooltipIcon}
              <div>
                <div className={s.tipTitle}>{single.tooltipTitle}</div>
                {single.tooltipText && <div className={s.tipText}>{single.tooltipText}</div>}
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
