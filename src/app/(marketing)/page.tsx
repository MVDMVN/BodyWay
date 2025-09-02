"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Header,
  SectionHeader,
  BoyElement,
  GirlElement,
  ContentBlock,
  ContentWrapper,
  QuizButtonsWrapper,
  MobileGuysBlock,
  TabletGuysBlock,
  Logo,
  Footer,
  FooterText,
} from "@/app/Components/UI";

function setGender(gender: "male" | "female") {
  try {
    localStorage.setItem("gender", gender);
  } catch (e) {
    console.error("Ошибка записи в localStorage", e);
  }
}

export default function Page() {
  return (
    <>
      <Header>
        <div className='container row'>
          <Logo>
            <img src='/images/logo.png' alt='' />
          </Logo>
        </div>
      </Header>

      <main>
        <SectionHeader>
          <BoyElement />
          <GirlElement />
          <ContentBlock>
            <ContentWrapper>
              <h1>
                A new scientific weight loss method developed by experts at the Institute of Health - 100% guaranteed
                results! Based on the principles of a healthy lifestyle and behavior change.
              </h1>
              <p className='content-description'>
                Take our Quiz to get a personal meal plan and workout program to achieve your weight goals!
              </p>
              <p className='content-gender'>Select your gender</p>
              <QuizButtonsWrapper>
                <Link className='content-male-button' href='/quiz/step-age-range' onClick={() => setGender("male")}>
                  Male
                </Link>
                <Link className='content-female-button' href='/quiz/step-age-range' onClick={() => setGender("female")}>
                  Female
                </Link>
              </QuizButtonsWrapper>
            </ContentWrapper>
            <MobileGuysBlock>
              <img loading='lazy' width='305' height='339' src='/images/mobile-guys.svg' alt='' />
            </MobileGuysBlock>
            <TabletGuysBlock>
              <img loading='lazy' width='308' height='340' src='/images/tablet-guys.svg' alt='' />
            </TabletGuysBlock>
          </ContentBlock>
        </SectionHeader>
        <Footer>
          <FooterText>
            *Cleveland Clinic Bariatric & Metabolic Institute Evidence-Based: Clinical Research DiRECT (Lancet, 2025) -
            Total Diet Replacement (TDR)
          </FooterText>
        </Footer>
      </main>
    </>
  );
}
