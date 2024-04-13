/**
 * hooks/useDiary.jsx
 *
 * 일기 데이터를 가져오는 커스텀 훅으로 분리
 * 일반적인 자바스크립트 파일에서는 useState나 useEffect와 같은 훅은 사용 못 함
 */
import {
  useContext, // context로부터 데이터를 공급받기 위해서 useContext 임포트
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DiaryStateContext, // App.jsx에서 createContext로 생성해준 context를 불러오기
} from '../App';

const useDiary = (id) => {
  const nav = useNavigate();
  const data = useContext(DiaryStateContext); // context로부터 일기 데이터를 공급받음
  const [currentDiaryItem, setCurrentDiaryItem] = useState();

  // nav 함수는 컴포넌트가 렌더링 된 이후에 동작하기 때문에 useEffect 안에서 사용해줘야 함
  // 아래의 onClickDelete 함수는 이벤트 핸들러라서 useEffect없이 써도 괜찮음
  useEffect(() => {
    // 일기 배열 중에서 현재 일기의 아이디 값이 일치하는 일기의 데이터를 받아옴
    const currentDiary = data.find((item) => String(item.id) === String(id));

    // 만약 일기를 찾지 못 했다면(없는 일기의 페이지로 접근했다면)
    if (!currentDiary) {
      window.alert('존재하지 않는 일기예요.');
      nav('/', { replace: true }); // 뒤로가기 금지
    }

    setCurrentDiaryItem(currentDiary); // 상태값 변경
  }, [id, data]);

  return currentDiaryItem;
};

export default useDiary;
