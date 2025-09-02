"use client";
import { useEffect, useState } from "react";
import { QUIZ, type StepKey } from "../quiz/schema";
import styled from "styled-components";

type Props = { stepKey: StepKey };

export default function StepPraise({ stepKey }: Props) {
  const cfg = QUIZ[stepKey];
  if (cfg.kind !== "praise") return null;

  // получаем gender из localStorage
  const [gender, setGender] = useState<"male" | "female">("female"); // дефолт
  useEffect(() => {
    try {
      const genderValue = localStorage.getItem("gender");
      if (genderValue === "male" || genderValue === "female") {
        setGender(genderValue);
      }
    } catch {}
  }, []);

  return (
    <Wrap>
      <Text>
        <Title>{cfg.title}</Title>
        {cfg.description && <Body>{cfg.description}</Body>}
      </Text>
      {gender === "male" && <Pic src={cfg.imageMale} alt='' />}
      {gender === "female" && <Pic src={cfg.imageFemale} alt='' />}
    </Wrap>
  );
}

/* styles */
const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;

  @media (max-width: 720px) {
    text-align: center;
  }
`;
const Text = styled.div``;
export const Title = styled.h1`
  font-size: 28px;
  margin: 0 0 12px;
`;
const Body = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.8;
`;
const Pic = styled.img`
  max-width: 350px;
  width: 100%;
  height: auto;
  object-fit: cover;
`;
