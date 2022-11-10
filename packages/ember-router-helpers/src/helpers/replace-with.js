import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

export default class ReplaceWithHelper extends Helper {
  @service router;

  compute(_params) {
    return (maybeEvent) => {
      if (
        maybeEvent !== undefined &&
        typeof maybeEvent.preventDefault === 'function'
      ) {
        maybeEvent.preventDefault();
      }

      let params = handleQueryParams(_params);
      return this.router.replaceWith(...params);
    };
  }
}
