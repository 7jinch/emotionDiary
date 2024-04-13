/**
 * hooks/usePageTitle.jsx
 *
 * title 태그를 가져와서 title 명을 바꾸는 커스텀 훅
 * 일반적인 자바스크립트 파일에서는 useState나 useEffect와 같은 훅은 사용 못 함
 */
import { useEffect } from 'react';

const usePageTitle = (title) => {
  // 컴포넌트가 마운트되면 호출되도록 함
  useEffect(() => {
    // title 태그를 가져옴
    // $는 dom요소를 다룰 때 붙이는 관행
    const $title = document.getElementsByTagName('title')[0];

    $title.innerText = title;
  }, [title]); // 마운트 되었을 때 뿐만 아니라 title 값이 변경되었을 때도 호출되서 페이지의 title을 바꿔줌
};

export default usePageTitle;
