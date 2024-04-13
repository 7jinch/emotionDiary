/**
 * util/get-stringed-date.js
 */
// 날짜를 "yyyy-mm-dd"의 문자열 형태로 변환하는 함수
export const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

  return `${year}년 ${month}월 ${date}일의`;
};
