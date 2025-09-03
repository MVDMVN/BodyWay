"use client";
import { useEffect, useState } from "react";
import s from "./ProgressCircle.module.css";

type Props = {
  /** Процент 0..100. Если не передан — кружок сам анимируется 0→100. */
  value?: number;
  /** Диаметр в px */
  size?: number;
  /** Толщина дуги */
  stroke?: number;
  /** Цвет трека */
  trackColor?: string;
  /** Цвет прогресса */
  barColor?: string;
  /** Показывать число в центре */
  showLabel?: boolean;
  /** Длительность авто-анимации (мс), если value не задан */
  duration?: number;
  /** Коллбек, когда авто-анимация дошла до 100% */
  onComplete?: () => void;
};

export default function ProgressCircle({
  value,
  size = 120,
  stroke = 8,
  trackColor = "#eee",
  barColor = "#00857A",
  showLabel = true,
  duration = 2000,
  onComplete,
}: Props) {
  // внутренний прогресс используется только если проп value не передан
  const [internal, setInternal] = useState(0);

  useEffect(() => {
    if (value !== undefined) return; // контролируемый режим — таймер не нужен

    let current = 0;
    const end = 100;
    const step = Math.max(10, Math.floor(duration / end)); // частота тиков
    const timer = setInterval(() => {
      current += 1;
      if (current >= end) {
        current = end;
        clearInterval(timer);
        onComplete?.();
      }
      setInternal(current);
    }, step);

    return () => clearInterval(timer);
  }, [value, duration, onComplete]);

  const progress = Math.max(0, Math.min(100, value ?? internal));

  const radius = size / 2;
  const r = radius - stroke * 0.5;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - progress / 100);

  return (
    <div className={s.wrapper} role='img' aria-label={`Progress ${progress}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={s.track}
          stroke={trackColor}
          fill='transparent'
          strokeWidth={stroke}
          r={r}
          cx={radius}
          cy={radius}
        />
        <circle
          className={s.bar}
          stroke={barColor}
          fill='transparent'
          strokeWidth={stroke}
          strokeLinecap='round'
          strokeDasharray={`${C} ${C}`}
          strokeDashoffset={offset}
          r={r}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      {showLabel && <span className={s.label}>{progress}%</span>}
    </div>
  );
}
