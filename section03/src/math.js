/**
 * src/math.js
 */

// math 모듈
export const addFunc = (a, b) => a + b;
export const subFunc = (a, b) => a - b;

export default function multiply(a, b) {
  return a * b;
}

const addFunc = (a, b) => a + b;
const subFunc = (a, b) => a - b;

// ES 모듈 시스템
export { addFunc as add, subFunc as sub };
// export { addFunc, subFunc }; // 바로 내보내기
