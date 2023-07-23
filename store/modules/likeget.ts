// 초기 상태 설정
interface InitType {
  like: [];
  req: boolean;
}
const initState: InitType = {
  like: [],
  req: true,
};

// 액션 타입(문자열) 설정. user는 밑에 정의된 리듀서.
const LIKE = 'like/LIKE';
const REQLIKE = 'reqLike/REQLIKE';

// 액션 생성 함수. 바깥에서 사용하므로 export.
export const like = (data: any) => {
  // 바깥에서 정보를 받아와야.
  return {
    type: LIKE,
    payload: data,
  };
};

// 액션 생성 함수. 바깥에서 사용하므로 export.
export const reqLike = () => {
  // 바깥에서 정보를 받아와야.
  return {
    type: REQLIKE,
  };
};

interface Action {
  type: string;
  payload: any;
}

// 리듀서 일해라. export default ; 이 파일을 import 하면 기본으로 나가는.
export default function scroll_Handle(state = initState, action: Action) {
  switch (action.type) {
    case LIKE:
      return { ...state, like: action.payload };
    case REQLIKE:
      return { ...state, req: !state.req };
    default:
      return state;
  }
}
