/**
 * src/index.js
 */

// ES 모듈 시스템
// import multiply from './math.js';
// import { add, sub } from './math.js';
import multiply, { add, sub } from './math';

let result = add(1, 2);
console.log(result); // 3

result = sub(1, 2);
console.log(result); // -1
