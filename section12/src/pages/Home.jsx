/**
 * pages/Home.jsx
 */
import {
  useState,
  useContext, // context
} from 'react';
import { DiaryStateContext } from '../App';
import usePageTitle from '../hooks/usePageTitle'; // title을 바꿔주는 커스텀 훅

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

const getMonthlyData = (pivotDate, data) => {
  // 이번 달의 시작 시간 구하기
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime(); // 비교를 위해 숫자값 형식으로 저장

  // 이번 달의 종료 시간 구하기
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, // <- 0으로 설정하면 이전 달의 마지막 날이 됨
    23,
    59,
    59
  ).getTime(); // 비교를 위해 숫자값 형식으로 저장

  return data.filter(
    // 월의 시작 시간보다 크고, 월의 종료 시간보다 작은 일기만 필터링
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  // DiaryStateContext가 공급하는 일기 데이터를 받아옴
  const data = useContext(DiaryStateContext);

  usePageTitle('감정 일기장'); // 커스텀 훅을 호출하고 사용할 title 값을 인수로 주기

  // 날짜를 보관하는 상태값
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  // 한 달 뒤로 이동하는 이벤트 핸들러
  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(
        pivotDate.getFullYear(), // 연도는 그대로
        pivotDate.getMonth() + 1 // 월만 +1 해 줌
      )
    );
  };
  // 한 달 전으로 이동하는 이벤트 핸들러
  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(
        pivotDate.getFullYear(), // 연도는 그대로
        pivotDate.getMonth() - 1 // 월만 -1 해 줌
      )
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        // 각각 한 달 전으로, 뒤로 이동하는 버튼
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      <DiaryList
        // DiaryList에 월 별로 필터링 된 데이터를 data라는 이름의 props로 전달
        data={monthlyData}
      />
    </div>
  );
};

export default Home;
