"use client";
import { useEffect, useState, useMemo } from "react";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import styled from "styled-components";
import { Title, Description, List, Opt, Img, ImgIcon, SideImage } from "./QuizCardUI";

type Props = { stepKey: StepKey };

export default function StepSingleCard({ stepKey }: Props) {
  const { answers, setAnswer } = useQuiz();
  const cfg = QUIZ[stepKey];
  const current = answers[stepKey] as string;

  // этот компонент отрисосывавает только "single" компоненты
  if (cfg.kind !== "single") return null;
  const single = cfg;

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

  const options = useMemo(() => single.options[gender], [single.options, gender]);

  const sideImage = useMemo(() => {
    return gender === "male" ? single.sideImageMale ?? null : single.sideImageFemale ?? null;
  }, [single.sideImageMale, single.sideImageFemale, gender]);

  const [showTip, setShowTip] = useState(false);

  function choose(value: string) {
    setAnswer(stepKey, value);
    if (single.tooltipTitle) setShowTip(true);
  }

  const hasSide = !!sideImage;

  return (
    <>
      <Title>{single.title}</Title>
      {single.description && <Description>{single.description}</Description>}
      {hasSide ? (
        <WithSide>
          <SideWrapper>
            <SideCol>{sideImage && <SideImg src={sideImage} alt='' loading='eager' />}</SideCol>

            <ContentCol>
              <List>
                {options.map((item) => {
                  const active = current === item.value;
                  return (
                    <Opt key={item.value} $active={active} onClick={() => choose(item.value)}>
                      {item.label}
                      {item.image && <Img src={item.image} alt={item.label} />}
                      {item.icon && <ImgIcon src={item.icon} alt={item.label} />}
                    </Opt>
                  );
                })}
              </List>
            </ContentCol>
          </SideWrapper>

          {single.tooltipTitle && showTip && (
            <Tip role='status'>
              {single.tooltipIcon && single.tooltipIcon}
              <div>
                <TipTitle>{single.tooltipTitle}</TipTitle>
                {single.tooltipText && <TipText>{single.tooltipText}</TipText>}
              </div>
            </Tip>
          )}
        </WithSide>
      ) : (
        <List>
          {options.map((item) => {
            const active = current === item.value;
            return (
              <Opt key={item.value} $active={active} onClick={() => choose(item.value)}>
                {item.label}
                {item.image && <Img src={item.image} alt={item.label} />}
                {item.icon && <ImgIcon src={item.icon} alt={item.label} />}
              </Opt>
            );
          })}

          {single.tooltipTitle && showTip && (
            <Tip role='status'>
              {single.tooltipIcon && single.tooltipIcon}
              <div>
                <TipTitle>{single.tooltipTitle}</TipTitle>
                {single.tooltipText && <TipText>{single.tooltipText}</TipText>}
              </div>
            </Tip>
          )}
        </List>
      )}
      {/* {(single.sideImageMale || single.sideImageFemale) && (
        <div>
          {single.sideImageMale && gender === "male" && <SideImage src={single.sideImageMale} alt={single.title} />}
          <List>
            {options.map((item) => (
              <Opt key={item.value} $active={current === item.value} onClick={() => setAnswer(stepKey, item.value)}>
                {item.label}
                {item.image && <Img src={item.image} alt={item.label} />}
                {item.icon && <ImgIcon src={item.icon} alt={item.label} />}
              </Opt>
            ))}
          </List>
        </div>
      )} */}
      {/* <List>
        {options.map((item) => (
          <Opt key={item.value} $active={current === item.value} onClick={() => setAnswer(stepKey, item.value)}>
            {item.label}
            {item.image && <Img src={item.image} alt={item.label} />}
            {item.icon && <ImgIcon src={item.icon} alt={item.label} />}
          </Opt>
        ))}
      </List> */}
    </>
  );
}

const WithSide = styled.section``;

const SideWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: start;
`;
const SideCol = styled.aside`
  // display: flex;
  // justify-content: center;
`;
const SideImg = styled.img`
  width: 160px;
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadow};
  background: ${({ theme }) => theme.colors.panel};
`;
const ContentCol = styled.div`
  width: 100%;
`;

const SideList = styled.div`
  display: grid;
  gap: 12px;
`;
const SideOpt = styled.button<{ $active?: boolean }>`
  font: inherit;
  text-align: left;
  padding: 16px 18px;
  border-radius: 14px;
  cursor: pointer;

  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active, theme }) => ($active ? "#e7fbf4" : theme.colors.panel)};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
const LabelWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Tip = styled.div`
  margin-top: 14px;
  padding: 14px 16px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #e9f3ff;
  color: #223;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
const TipIcon = styled.img`
  width: 22px;
  height: 22px;
`;
const TipTitle = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
`;
const TipText = styled.div`
  opacity: 0.9;
  line-height: 1.45;
  font-size: 14px;
`;
