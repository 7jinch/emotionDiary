/**
 * pages/Diary.jsx
 */
// 현재 경로의 url params 값을 가져오는 커스텀 훅 임포트
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';

// 일기 데이터를 불러오는 커스텀 훅 불러오기
import useDiary from '../hooks/useDiary';
import usePageTitle from '../hooks/usePageTitle'; // title을 바꿔주는 커스텀 훅

import { getStringedDate } from '../util/get-stringed-date'; // 날짜를 "yyyy-mm-dd"의 문자열 형태로 변환하는 함수

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  usePageTitle(`${params.id}번 일기`); // 커스텀 훅을 호출하고 사용할 title 값을 인수로 주기

  // 커스텀 훅을 활용해서 일기 데이터를 불러옴
  const currentDiaryItem = useDiary(params.id);

  // 현재 useDiary에서 currentDiaryItem의 초기값은 undefined임
  // currentDiaryItem 상태값에는 useEffect가 실행되고 나서야 정상적인 값이 저장됨
  // 하지만 useEffect는 컴포넌트가 렌더링이 되고 마운트 후에 실행됨
  // 따라서 Diary 컴포넌트에서 최초로 useDiary는 호출된 때의 currentDiaryItem의 값은 undefined임
  // undefined 일 떄의 로직도 처리해줘야 함
  if (!currentDiaryItem) {
    return <div>일기를 불러오는 중...</div>;
  }

  // 구조분해할당으로 꺼내기
  const { createdDate, emotionId, content } = currentDiaryItem;

  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={'< 뒤로가기'}
          />
        }
        rightChild={
          <Button
            onClick={() => {
              nav(`/edit/${params.id}`);
            }}
            text={'수정하기'}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
