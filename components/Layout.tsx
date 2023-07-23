import { like } from '@/store/modules/likeget';
import { reset, value } from '@/store/modules/scroll_Handle';
import styled from '@emotion/styled';
import axios from 'axios';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  position: relative;
  width: 100vw;
  padding: 0px 10vw;
  margin: auto;
  transition: 0.2s ease;

  @media screen and (max-width: 820px) {
    padding: 0px 5vw;
  }
`;

// 레이아웃 props타입
type LayoutProps = {
  children: ReactNode;
  currentURL: string;
};

// 리덕스 state 타입
interface LikeRedux {
  likeget: { req: boolean };
}

const Layout: NextPage<LayoutProps> = ({ children, currentURL }) => {
  // 리덕스 설정
  const dispatch = useDispatch();
  // 좋아요 상태값 요청용
  const reqLike = useSelector((state: LikeRedux) => state.likeget.req);

  useEffect(() => {
    const handleScrollValue = () => {
      dispatch(value(window.scrollY));
    };

    if (currentURL !== '/write' && currentURL !== '/article/[id]') {
      window.addEventListener('scroll', handleScrollValue);
    }

    dispatch(reset());
    return () => {
      window.removeEventListener('scroll', handleScrollValue);
    };
  }, [currentURL]);

  // 좋아요 전역적인 업데이트
  useEffect(() => {
    const getLikeAll = async () => {
      try {
        const response = await axios.get('/api/getLike');

        if (response.status !== 200) return alert(response.data.message);
        dispatch(like(response.data.items));
      } catch (err) {
        console.error(err);
      }
    };
    getLikeAll();
  }, [reqLike]);

  return <Container>{children}</Container>;
};

export default Layout;
