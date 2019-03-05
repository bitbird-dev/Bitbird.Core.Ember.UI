import { helper } from '@ember/component/helper';
// BEGIN-SNIPPET fixedFloatString.js
export function fixedFloatString([num, dec]) {
  return `${num.toFixed(dec)}`;
}
// END-SNIPPET
export default helper(fixedFloatString);