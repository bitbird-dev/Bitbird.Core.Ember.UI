import { helper } from '@ember/component/helper';
import { camelize } from '@ember/string';

export function camelizeString(params/*, hash*/) {
  return camelize(params);
}

export default helper(camelizeString);
