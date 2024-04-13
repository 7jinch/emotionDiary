/**
 * components/DiaryList.jsx
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 함수를 이용해서 특정 이벤트가 발생했을 때 페이지를 이동시켜주는 navigate 함수를 반환하는 hook
import Button from './Button';
import DiaryItem from './DiaryItem';
import './DiaryList.css';

const DiaryList = ({ data }) => {
  const nav = useNavigate(); // navigate 함수르 nav에 저장
  const [sortType, setSortType] = useState('latest'); // 정렬 상태값(기본값은 최신순)

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // 정렬 함수
  const getSortedData = () => {
    // sort() : 반환값이 없고 원본를 수정해버림
    // toSorted() : 원본은 수정하지 않고 정렬된 새로운 배열을 반환함
    return data.toSorted((a, b) => {
      // 반환값이 음수 : a가 b보다 앞
      // 반환값이 양수 : b가 a보다 앞
      if (sortType === 'oldest')
        return Number(a.createdDate) - Number(b.createdDate);
      // 오래된 순으로 정렬
      else return Number(b.createdDate) - Number(a.createdDate); // 최신순으로 정렬
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button
          // new 경로로 이동시켜주는 이벤트 핸들러 등록
          onClick={() => {
            nav(`/new`);
          }}
          text={'새로운 일기 쓰기'}
          type={'POSITIVE'}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => {
          return (
            <DiaryItem
              // 리스트 형태로 컴포넌트를 렌더링하려면 고유한 값을 key 속성으로 전달해야 함
              key={item.id}
              // 일기의 모든 값들을 DiaryItem 컴포넌트에게 props로 전달
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DiaryList;
