"use client";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 28px;
  line-height: 32px;
  margin: 0 0 12px;
`;

export const Description = styled.p`
  margin: 0 0 12px;
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;

export const Opt = styled.button<{ $active?: boolean }>`
  background: ${({ $active, theme }) => ($active ? theme.colors.bg : theme.colors.bg)};
  color: ${({ $active, theme }) => ($active ? theme.colors.textBlack : theme.colors.textBlack)};
  border: ${({ $active }) => ($active ? "1px solid #00857A" : "1px solid transparent")};
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  padding: 16px 0 16px 16px;
  // padding: 0 0 0 16px;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryButtonsHover};
  }
`;

export const Img = styled.img`
  // height: 80px;
  margin: -16px 1px -16px 0;
  width: 120px;
  object-fit: contain;
  object-position: right center;
`;

export const ImgIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 16px;
`;

export const SideImage = styled.img``;
