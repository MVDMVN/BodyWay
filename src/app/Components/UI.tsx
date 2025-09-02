"use client";
import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: #faf2e8;
  backdrop-filter: blur(10px);
  .row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    min-height: 64px;
  }
  .logo {
    font-weight: 700;
    letter-spacing: 0.3px;
  }
  .logo span {
    color: ${({ theme }) => theme.colors.primary};
  }
  nav {
    margin-left: auto;
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;

export const Logo = styled.div`
  font-weight: 700;
  letter-spacing: 0.3px;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 140px;
  }
`;

export const SectionHeader = styled.section<{ alt?: boolean }>`
  display: flex;
  position: relative;
  background: #faf2e8;
  padding: 24px 16px;

  &:before {
    content: "";
    position: absolute;
    top: -116px;
    left: 0;
    z-index: -1;
    height: 116px;
    width: 100%;
    background-color: #faf2e8;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -62px;
    width: 100%;
    height: 62px;
    z-index: -1;
    background: transparent url(images/firstblock-after.svg) no-repeat center top;
    -webkit-background-size: 100% auto;
    background-size: 100% auto;
  }

  @media (min-width: 768px) {
    padding: 40px 0 24px;
  }

  @media (min-width: 1280px) {
    padding: 40px 0 0;
    background-image: url(images/leaf2.svg), url(images/strawberry.svg), url(images/pumpkin.svg),
      url(images/broccoli2.svg), url(images/strawberry.svg), url(images/banana.svg), url(images/currant.svg),
      url(images/carrot.svg);
    background-repeat: no-repeat, no-repeat;
    background-position: calc(50% - 650px) 20%, calc(50% - 650px) 80%, calc(50% - 150px) 0, calc(50% - 270px) 100%,
      calc(50% + 200px) 5%, calc(50% + 200px) 100%, calc(50% + 600px) 20%, calc(50% + 650px) 80%;
    background-size: 38px 41px, 39px 32px, 52px 55px, 85px 66px, 39px 32px, 72px 65px, 14px 14px, 91px 62px;
  }
`;

export const BoyElement = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: block;
    position: absolute;
    width: 259px;
    height: 625px;
    top: 50px;
    left: calc(50% - 545px);
    background: url(images/left-boy.svg) 0 0 no-repeat;
    z-index: 2;
  }
`;

export const GirlElement = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: block;
    position: absolute;
    top: 50px;
    left: calc(50% + 315px);
    width: 225px;
    height: 635px;
    background: url(images/right-girl.svg) 0 0 no-repeat;
    z-index: 2;
  }
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0 auto;

  &:after {
    display: none;
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-24px);
    bottom: -54px;
    width: 46px;
    height: 60px;
    background: transparent url(images/arrow.svg) no-repeat center top;
    -webkit-background-size: contain;
    background-size: contain;
    z-index: 9;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    width: 630px;
    align-items: center;
    text-align: left;

    &:after {
      bottom: -70px;
    }
  }

  @media (min-width: 1280px) {
    flex-direction: column;
    width: 540px;
    align-items: center;
    text-align: center;
    margin-top: 90px;
    margin-bottom: 50px;
  }

  &:after {
    bottom: -20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: #292929;
    margin-bottom: 20px;
  }

  .content-description {
    font-weight: 400;
    margin-bottom: 24px;
  }

  .content-gender {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.1px;
    line-height: 26px;
    text-transform: none;
    margin-bottom: 12px;
  }

  @media (min-width: 768px) {
    width: 335px;
    padding-right: 40px;

    h1 {
      font-size: 40px;
      line-height: 124%;
      letter-spacing: -0.3px;
      margin-bottom: 24px;
    }
  }

  @media (min-width: 1280px) {
    width: 100%;
    padding-right: 0;

    h1 {
      font-size: 60px;
      line-height: 120%;
      letter-spacing: -0.03em;
    }

    .content-description {
      margin-bottom: 42px;
      padding: 0 80px;
    }
  }
`;

export const QuizButtonsWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  gap: 24px;
  margin: 0 auto 40px;

  a {
    width: 100%;
    padding: 14px 0;
    color: #ffffff;
    border-radius: 8px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.14px;
    line-height: 28px;
    text-transform: none;
    transition: 0.3s all;
  }

  .content-male-button {
    background-color: #ab8ddb;
  }

  .content-male-button:hover {
    background-color: #bda6e3;
  }

  .content-female-button {
    background-color: #00857a;
  }

  .content-female-button:hover {
    background-color: #129c90;
  }

  @media (min-width: 768px) {
    max-width: 100%;
  }

  @media (min-width: 1280px) {
    max-width: 412px;

    a {
      width: 256px;
    }
  }
`;

export const MobileGuysBlock = styled.div`
  display: flex;
  width: 305px;
  height: 339px;
  min-width: 305px;
  min-height: 339px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const TabletGuysBlock = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    width: 308px;
    height: 340px;
    min-width: 308px;
    min-height: 340px;
  }

  @media (min-width: 1280px) {
    display: none;
  }
`;

export const Footer = styled.footer`
  background-color: rgb(250, 242, 232);
  margin-bottom: 62px;
  padding: 60px 0;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 16px;
  line-height: 20px;
`;
