import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import scroll_Handle from './modules/scroll_Handle';
import likeget from './modules/likeget';

const rootReducer = (state: any, action: any) => {
  // HYDRATE는 SSR사용시 필요하여 설정
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    // modules의 리듀서들 모으는 곳
    default:
      return combineReducers({ scroll_Handle, likeget })(state, action);
  }
};

export default rootReducer;
