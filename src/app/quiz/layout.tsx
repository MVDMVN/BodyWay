"use client";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { kebabToCamel } from "./_utils/case";
import { ORDER, pathOf, nextKey, prevKey, type StepKey } from "./schema";
import { QuizProvider, useQuiz } from "./QuizContext";

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
  const lastSeg = pathname.split("/").pop() || "step-age-range";
  const currentKey = kebabToCamel(lastSeg) as StepKey;

  const { isAnswered } = useQuiz();

  const idx = Math.max(0, ORDER.indexOf(currentKey));
  const progress = Math.round(((idx + 1) / ORDER.length) * 100);
  const prev = prevKey(currentKey);
  const next = nextKey(currentKey);

  function goPrev() {
    !prev ? router.push("/") : router.push(pathOf(prev));
  }

  function goNext() {
    if (!next) return;
    if (!isAnswered(currentKey)) return;
    router.push(pathOf(next));
  }

  return (
    <Wrap>
      <Container>
        <Header>
          <BackBtn onClick={() => goPrev()}>
            <img src='/images/back-arrow.svg' alt='' />
          </BackBtn>
          <Logo>
            <img src='/images/logo.png' alt='' />
          </Logo>
          <Meta>
            {idx + 1}/{ORDER.length}
          </Meta>
        </Header>

        <Progress>
          <Bar>
            <Fill style={{ width: `${progress}%` }} />
          </Bar>
        </Progress>

        <Card>{children}</Card>
      </Container>
      <BtnPrimary onClick={goNext} disabled={!isAnswered(currentKey)}>
        Next
      </BtnPrimary>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  max-width: 1032px;
  margin: 0 auto;
`;
const Container = styled.div`
  width: 100%;
`;
const Header = styled.header`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BackBtn = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  cursor: pointer;
  width: 16px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const Logo = styled.div`
  font-weight: 700;
  letter-spacing: 0.3px;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 120px;
  }
`;
const Progress = styled.div`
  margin-bottom: 24px;
`;
const Bar = styled.div`
  height: 5px;
  background: #e8e8e8;
  border-radius: 999px;
  overflow: hidden;
`;
const Fill = styled.i`
  display: block;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
`;
const Meta = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;
const Card = styled.main`
  padding: 16px 0;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;

const Btn = styled.button`
  background: #222642;
  color: #e7eaf6;
  padding: 10px 16px;
  text-decoration: none;
  max-width: 350px;
  width: 100%;
  margin: 0 auto 24px auto;

  align-items: center;
  border-radius: 8px;
  display: flex;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.14px;
  border: 0px;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  padding: 14px 16px;
`;

const BtnPrimary = styled(Btn)`
  background: ${({ theme }) => theme.colors.primaryButtons};
  border-color: transparent;
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: 600;
  width: 100%;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
