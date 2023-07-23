import { color } from '@/theme/theme_other';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import FadeIn from './FadeIn';

type StyledProps = {
  scrollValue: number;
  currentURL: string;
};

// 전체 Container---
const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  padding: 0px 10vw;
  width: 100%;
  height: 50px;
  z-index: 3;

  @media screen and (max-width: 820px) {
    padding: 0px 5vw;
  }
`;
// ---------

// Logo 부분---
const LogoWrap = styled.div`
  position: relative;
  display: ${({ scrollValue, currentURL }: StyledProps) =>
    currentURL === '/write' || currentURL === '/article/[id]'
      ? 'flex'
      : scrollValue < 10
      ? 'none'
      : 'flex'};
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;

  transform: ${({ scrollValue, currentURL }: StyledProps) =>
    currentURL === '/write' || currentURL === '/article/[id]'
      ? 'translateY(0)'
      : scrollValue < 70
      ? 'translateY(-60px)'
      : 'translateY(0)'};
  transition: 0.5s ease-in-out;
`;

const Logo = styled.p`
  position: relative;
  margin: 0px;
  letter-spacing: 3px;
  font-size: 30px;
  font-weight: 900;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
`;

// Menu 부분---
const StyleBox = styled.div`
  position: relative;
  display: ${({ scrollValue, currentURL }: StyledProps) =>
    currentURL === '/write' || currentURL === '/article/[id]'
      ? 'flex'
      : scrollValue < 10
      ? 'none'
      : 'flex'};
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #1c1c1c;
  color: white;
  padding: 0px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 1px 3px 0.5px rgba(0, 0, 0, 0.5);
  margin-right: 20px;

  transform: ${({ scrollValue, currentURL }: StyledProps) =>
    currentURL === '/write' || currentURL === '/article/[id]'
      ? 'translateY(0)'
      : scrollValue < 70
      ? 'translateY(-60px)'
      : 'translateY(0)'};
  transition: 0.5s ease-in-out;
`;
// ------------

// 서브타이틀----
const SubTitle = styled.p`
  margin: 0px;

  @media screen and (max-width: 630px) {
    padding-right: 0px;
  }
  @media screen and (max-width: 557px) {
    display: none;
  }
`;

// Navbar컴포넌트 props타입
type navProps = {
  navTextArr: { text: string; href: string }[];
  currentURL: string;
};

// 리덕스 state 타입
interface TestRedux {
  scroll_Handle: number;
}

const Navbar: NextPage<navProps> = ({ navTextArr, currentURL }) => {
  // 리덕스 설정
  const scrollValue = useSelector((state: TestRedux) => state.scroll_Handle);

  return (
    <Nav>
      <LogoWrap scrollValue={scrollValue} currentURL={currentURL}>
        <Logo>
          <span
            css={css`
              color: ${color.primary};
            `}
          >
            RE
          </span>
          <span
            css={css`
              color: ${color.secondary};
            `}
          >
            :
          </span>
          CINE
        </Logo>

        {currentURL === '/write' ? (
          <FadeIn index={0}>
            <SubTitle
              css={css`
                font-size: 15px;
                padding: 20px;
              `}
            >
              <span
                css={css`
                  padding-right: 15px;
                `}
              >
                |
              </span>{' '}
              Write Your Criticism
            </SubTitle>
          </FadeIn>
        ) : currentURL === '/article/[id]' ? (
          <FadeIn index={0}>
            <SubTitle
              css={css`
                font-size: 15px;
                padding: 20px;
              `}
            >
              <span
                css={css`
                  padding-right: 15px;
                `}
              >
                |
              </span>
              Welcom to Cinema Article
            </SubTitle>
          </FadeIn>
        ) : (
          <></>
        )}
      </LogoWrap>

      <StyleBox scrollValue={scrollValue} currentURL={currentURL}>
        {navTextArr.map((el) => (
          <Link
            css={css`
              margin: 0px;
              padding-right: 30px;
              font-size: 15px;
              :last-child {
                padding-right: 0px;
              }
            `}
            href={el.href}
            key={el.text}
          >
            {el.text}
          </Link>
        ))}
      </StyleBox>
    </Nav>
  );
};

export default Navbar;
