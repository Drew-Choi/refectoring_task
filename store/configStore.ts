import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './index';
import { configureStore } from '@reduxjs/toolkit';

// dev모드인지, build모드인지 분간하기 위해 설정
const devtoolIsProduction = process.env.NODE_ENV === 'production';

const makeStore = () => {
  const store = configureStore({
    // 리덕스 리듀서 스토어 루트 설정
    reducer: rootReducer,
    // build시에는 reduxDevTool이 브라우저에서 작동 안하도록 설정
    devTools: !devtoolIsProduction,
  });
  return store;
};

const wrapper = createWrapper(makeStore, {
  // build시에는 debug 안하도록
  debug: !devtoolIsProduction,
});

export default wrapper;
