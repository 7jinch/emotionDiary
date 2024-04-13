/**
 * pages/Edit.jsx
 */
import {
  useParams, // 현재 경로의 url params 값을 가져오는 커스텀 훅 임포트
  useNavigate,
} from 'react-router-dom';
import {
  useContext, // context로부터 데이터를 공급받기 위해서 useContext 임포트
  useEffect,
  useState,
} from 'react';
import {
  DiaryDispatchContext, // App.jsx에서 createContext로 생성해준 context를 불러오기
  DiaryStateContext, // App.jsx에서 createContext로 생성해준 context를 불러오기
} from '../App';
import usePageTitle from '../hooks/usePageTitle'; // title을 바꿔주는 커스텀 훅
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';

// 일기 데이터를 불러오는 커스텀 훅 불러오기
import useDiary from '../hooks/useDiary';

const Edit = () => {
  const params = useParams();
  const nav = useNavigate(); // navigate 함수 불러오기
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext); // context로부터 구조분해할당으로 onDelete, onUpdate 함수를 공급받음

  usePageTitle(`${params.id}번 일기 수정`); // 커스텀 훅을 호출하고 사용할 title 값을 인수로 주기

  // hooks/useDiary 커스텀 훅으로 분리해줌
  // const data = useContext(DiaryStateContext); // context로부터 일기 데이터를 공급받음
  // const [currentDiaryItem, setCurrentDiaryItem] = useState();

  // hooks/useDiary 커스텀 훅으로 분리해줌
  // // nav 함수는 컴포넌트가 렌더링 된 이후에 동작하기 때문에 useEffect 안에서 사용해줘야 함
  // // 아래의 onClickDelete 함수는 이벤트 핸들러라서 useEffect없이 써도 괜찮음
  // useEffect(() => {
  //   // 일기 배열 중에서 현재 일기의 아이디 값이 일치하는 일기의 데이터를 받아옴
  //   const currentDiary = data.find(
  //     (item) => String(item.id) === String(params.id)
  //   );

  //   // 만약 일기를 찾지 못 했다면(없는 일기의 페이지로 접근했다면)
  //   if (!currentDiary) {
  //     window.alert('존재하지 않는 일기예요.');
  //     nav('/', { replace: true }); // 뒤로가기 금지
  //   }

  //   setCurrentDiaryItem(currentDiary); // 상태값 변경
  // }, [params.id, data]);

  // 커스텀 훅을 활용해서 일기 데이터를 불러옴
  const currentDiaryItem = useDiary(params.id);

  // 삭제 버튼 클릭시 동작할 이벤트 함수
  const onClickDelete = () => {
    // 확인과 취소 버튼이 있는 팝업창이 나오는 윈도우 내장 함수 활용
    // 반환값: 확인 버튼 -> true, 취소 버튼 -> false
    if (window.confirm('일기를 삭제할까요? 다시 복구할 수 없어요!')) {
      // 확인 버튼 클릭하면 일기를 삭제함
      onDelete(params.id); // 공급받은 onDelete 함수를 호출하고 인수로 id값을 줌
      nav('/', { replace: true }); // 삭제 후 홈페이지로 이동시키고 뒤로가기는 막기
    }
  };

  // 하위(Editor) 컴포넌트에서 해당 함수 실행시
  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      // context로부터 받은 onCreate 함수를 실행
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
    }
    nav(
      '/', // 홈페이지로 이동
      { replace: true } // 뒤로가기 방지 옵션
    );
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
        rightChild={
          <Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />
        }
      />
      <Editor
        // Editor 컴포넌트에게 초기값을 줌
        initData={currentDiaryItem}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Edit;
