import { AppProps } from 'next/app';
import './globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { head_title } from '@/function/head_title';
import Proptypes from 'prop-types';
import { Provider } from 'react-redux';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import wrapper from '@/store/configStore';
import { useMemo } from 'react';

// Navbar로 보내는 타입
interface NavTextArr {
  text: string;
  href: string;
}

// Navbar컴포넌트로 전달하는 객체 배열
// Navbar 추가하고 싶을 땐 여길 사용하시면 됩니다.
const navTextArr: NavTextArr[] = [
  { text: 'Home', href: '/' },
  { text: 'Write', href: '/write' },
];

const App = ({ Component, ...rest }: AppProps) => {
  // 현재 URL 확인하기
  const router = useRouter();
  const currentURL = router.pathname;

  // 리덕스 & next.js 랩퍼
  const { store, props } = wrapper.useWrappedStore(rest);

  // Head - title 생성 함수 의미없이 반복되지 않게 url변동시에만 작동하도록 useMemo사용
  const head_title_memo = useMemo(() => {
    return head_title(currentURL);
  }, [currentURL]);

  return (
    <>
      <Head>
        <title>{`Re:Cine${head_title_memo}`}</title>
        <meta
          name="description"
          content="다르게 영화 읽기 - 영화비평 & 리뷰 커뮤니티 Re_Cine"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <meta property="og:title" content="My Page Title" />
        <meta
          property="og:description"
          content="This is a description of my page."
        />
        <meta property="og:image" content="/thumbnail.png" /> */}
      </Head>

      <Provider store={store}>
        <Layout currentURL={currentURL}>
          <Navbar navTextArr={navTextArr} currentURL={currentURL} />
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

// App컴포넌트 타입 설정
App.Proptypes = {
  Component: Proptypes.elementType,
  store: Proptypes.object,
};

export default App;
