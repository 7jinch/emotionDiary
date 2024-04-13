/**
 * pages/New.jsx
 */
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // context에서 데이터를 꺼낼 때는 useContext
import { DiaryDispatchContext } from '../App'; // App.jsx에서 createContext로 생성해준 context를 불러오기
import usePageTitle from '../hooks/usePageTitle'; // title을 바꿔주는 커스텀 훅
import Editor from '../components/Editor';
import Header from '../components/Header';
import Button from '../components/Button';

const New = () => {
  // context로부터 구조분해할당으로 onCreate 함수를 공급받음
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  usePageTitle('새 일기 쓰기'); // 커스텀 훅을 호출하고 사용할 title 값을 인수로 주기

  // 하위(Editor) 컴포넌트에서 해당 함수 실행시
  const onSubmit = (input) => {
    // context로부터 받은 onCreate 함수를 실행
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav(
      '/', // 홈페이지로 이동
      { replace: true } // 뒤로가기 방지 옵션
    );
  };

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={
          <Button
            onClick={() =>
              // nav에 인수로 -1을 주면 뒤로 이동함
              nav(-1)
            }
            text={'< 뒤로 가기'}
          />
        }
      />
      <Editor
        // 하위 컴포넌트로 onSubmit 함수 전달
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default New;
