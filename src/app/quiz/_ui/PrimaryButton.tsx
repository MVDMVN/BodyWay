"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string; // пробрасываем стили снаружи (например, s.btnPrimary)
};

export default function PrimaryButton({ className, children, ...rest }: Props) {
  return (
    <button type='button' className={className} {...rest}>
      {children}
    </button>
  );
}
