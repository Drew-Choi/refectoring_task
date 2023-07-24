import { IndexDataType } from '@/function/types';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { AiTwotoneHeart } from 'react-icons/ai';
import { color } from '@/theme/theme_other';
import FadeIn from './FadeIn';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

// ssr 프롭스 데이터 타입 설정
type SsrDataType = {
  article: IndexDataType;
  index: number;
  heartOnClick?: any;
};

const ArticleThum: NextPage<SsrDataType> = ({
  article,
  index,
  heartOnClick,
}) => {
  console.log('ArticleThum 컴포넌트 재랜더링');

  // 좋아요는 리덕스에서 정보 바로바로 업데이트
  // 리덕스 state 타입
  interface LikeRedux {
    likeget: { like: { like_count: number }[] };
  }
  const likeCount = useSelector(
    (state: LikeRedux) => state.likeget.like,
    // state배열 내부 요소가 바뀌지 않는 이상 이전 값을 유지
    (pre, next) => {
      if (pre.length !== next.length) {
        return false;
      }

      return pre.every((el, index) => el.like_count === next[index].like_count);
    },
  );

  return (
    <FadeIn index={index % 3 === 0 ? 0 : index % 3 === 2 ? 1 : 0.5}>
      <div
        css={css`
          position: relative;
          width: 25vw;
          box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.5);
          background-color: white;
          padding: 30px 20px;
          border-radius: 10px;
          @media screen and (max-width: 800px) {
            width: 30vw;
          }
          @media screen and (max-width: 600px) {
            width: 40vw;
          }
          @media screen and (max-width: 462px) {
            width: 90vw;
          }
        `}
      >
        <Link href={`/article/${article.id}?index=${index}`}>
          <Image
            css={css`
              border-radius: 10px;
              margin: auto;
              cursor: pointer;
              transition: 0.4s ease-in-out;
              :hover {
                transform: scale(1.1);
                transform-origin: center;
              }
              :active {
                transform: scale(1.4);
              }
            `}
            src={`/${article.img}`}
            width={200}
            height={285}
            alt="mainPoster"
          />
        </Link>
        <Link href={`/article/${article.id}?index=${index}`}>
          <p
            css={css`
              position: relative;
              font-size: 15px;
              margin-top: 30px;
              text-align: justify;
              cursor: pointer;

              :hover {
                color: gray;
              }
              :active {
                color: #bdbdbd;
              }
            `}
          >
            {article.title}
          </p>
        </Link>

        <div
          css={css`
            display: flex;
            justify-content: right;
            align-items: center;
            padding-top: 15px;
          `}
        >
          <span
            css={css`
              font-size: 20px;
              margin-top: 10px;
              margin-right: 20px;
            `}
          >
            {likeCount[index]?.like_count}
          </span>
          <AiTwotoneHeart
            onClick={heartOnClick}
            css={css`
              font-size: 40px;
              color: ${color.primary};
              cursor: pointer;
              :hover {
                color: #ffcf55;
              }
              :active {
                color: #fff3d3;
              }
            `}
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default React.memo(ArticleThum, (prevProps, nextProps) => {
  // props의 얕은 비교를 커스텀하여 변경 여부 판단
  return (
    prevProps.article.title === nextProps.article.title &&
    prevProps.index === nextProps.index &&
    prevProps.heartOnClick === nextProps.heartOnClick
  );
});
