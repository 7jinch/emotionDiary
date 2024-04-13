/**
 * App.jsx
 */
import {
  Routes, // switch - case처럼 위에서부터 순서대로 브라우저의 경로와 path 속성값이 일치하는 Route 컴포넌트를 찾아서
  Route, // element 속성으로 준 컴포넌트를 렌더링을 해 주는 컴포넌트
  Link, // 유저가 클릭해서 다른 경로로 이동하는데 사용되는 컴포넌트(a태그 대신 사용함)
  useNavigate, // 함수를 이용해서 특정 이벤트가 발생했을 때 페이지를 이동시켜주는 navigate 함수를 반환하는 hook
} from 'react-router-dom';
import {
  useReducer, // 일기 상태 관리 훅 임포트
  useRef,
  createContext,
  useEffect,
  useState,
} from 'react';
import './App.css';

// 페이지
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

// 페이지 설정
// 1. "/":  모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "/edit" : 일기를 수정하는 Edit 페이지

// dispatch가 호출되면 useReducer가 reducer 함수를 호출해서 상태값과 액션 객체를 인자로 전달함
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT': // localStorage로부터 불러온 데이터를
      return action.data; // 액션 객체로부터 꺼내서 상태값으로 저장
    case 'CREATE': {
      // 새로운 일기 배열 생성하고 액션 객체로부터 받은 일기와 이전 일기를 추가해줌 // 새로운 일기 생성
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      // 기존 일기 수정
      nextState = state.map((item) =>
        // 기존 일기 중에서 수정하려는 일기의 id값과 일치하는 일기를 찾아서 일치하면 해당 요소만 수정
        // 비교할 때 타입이 다를 수 있어서 형변환을 해 주고 비교함
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case 'DELETE': {
      // 기존 일기 삭제
      nextState = state.filter(
        (item) =>
          // 일기 중 id가 삭제하려는 일기의 id와 일치하지 않는 일기들만 필터링해서 반환해주면 됨
          String(item.id) !== String(action.id)
      );
      break;
    }
    default:
      return state;
  }

  // localStorage에 값을 저장
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

// 다른 컴포넌트에서 사용할 수 있도록 export
export const DiaryStateContext = createContext(); // 상태값 context
export const DiaryDispatchContext = createContext(); // 상태값 변경 함수 context

function App() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부 상태값 생성
  const [data, dispatch] = useReducer(reducer, []); // 일기 상태값 생성
  const idRef = useRef(0); // id값용 레퍼런스 객체 생성

  // localStorage에 값 저장하기(인수는 key, value)
  // 객체를 value에 저장할 때는 문자열로 변환해서 저장해야 함
  // localStorage.setItem('test', JSON.stringify({ name: 'king' }));

  // localStorage에 값 불러오기(인수는 key)
  // localStorage에서 객체를 불러올 때는 다시 객체로 변환해줘야 함
  // console.log(JSON.parse(localStorage.getItem('test')));
  // JSON.parse 함수는 값이 undefined일 경우 에러가 발생하기 때문에 주의해야 함

  // localStorage의 값 삭제하기
  // localStorage.removeItem('test');

  // localStorage에 일기 데이터를 저장해보기
  // 컴포넌트가 마운트 되었을 때에만 실행함
  useEffect(() => {
    const storedData = localStorage.getItem('diary'); // localStorage에 저장된 데이터 불러오기
    if (!storedData) {
      setIsLoading(false); // 데이터를 불러오지 못 했을 때에도 로딩 상태값 변경
      return;
    } // storedData에 저장된 데이터가 undefined이라면 에러가 발생하기 때문에 즉시 종료

    const parsedData = JSON.parse(storedData); // 문자열 형태에서 객체 형태로 파싱
    if (!Array.isArray(parsedData)) {
      setIsLoading(false); // 데이터를 불러오지 못 했을 때에도 로딩 상태값 변경
      return;
    } // 배열이 아닌데 forEach 메서드를 사용하면 에러가 발생하기 때문에 즉시 종료
    let maxId = 0;

    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) maxId = Number(item.id);
    });

    idRef.current = maxId + 1; // 새로운 일기가 생성되더라도 기존 일기의 id값과 겹치지 않도록 함

    dispatch({
      type: 'INIT',
      data: parsedData,
    });

    // dispatch 함수가 실행이 완료되고 localStorage에 상태값을 저장한 후에 로딩이 완료가 되도록 상태값 변경
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가 기능
  const onCreate = (createdDate, emotionId, content) => {
    // dispatch의 인자로 액션 객체 전달
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++, // 새로운 일기가 생성될 때마다 값이 ++(후위 연산자로 넣어주기)
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정 기능
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제 기능
  const onDelete = (id) => {
    dispatch({ type: 'DELETE', id });
  };

  // 일기 데이터인 data 상태값에 초기값이 설정되기 이전에는
  if (isLoading) <div>일기를 불러오는 중...</div>;

  // 일기 데이터인 data 상태값에 초기값이 설정된 후에는
  return (
    <>
      <DiaryStateContext.Provider
        // 하위 컴포넌트들이 data 값을 공급받을 수 있음
        value={data}
      >
        <DiaryDispatchContext.Provider
          // 하위 컴포넌트들이 상태 변화 함수들을 공급받을 수 있음
          value={{ onCreate, onUpdate, onDelete }}
        >
          <Routes
          // Routes 주의사항: Routes 컴포넌트 안에는 Route 컴포넌트 외의 컴포넌트는 못 씀
          >
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route
              // : 을 붙이면 해당 경로는 동적 경로인 url parameter를 의미하게 됨
              path="/diary/:id"
              element={<Diary />}
            />
            <Route path="/edit/:id" element={<Edit />} />
            <Route
              // 디폴트 경로 설정
              path="*"
              element={<Notfound />}
            />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
