import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

export function replaceWith(_params, router) {
  let params = handleQueryParams(_params);

  return router.replaceWith(...params);
}

export default Helper.extend({
  router: service(),

  compute(_params) {
    return (maybeEvent) => {
      if (maybeEvent !== undefined && typeof maybeEvent.preventDefault === 'function') {
        maybeEvent.preventDefault();
      }

      return replaceWith(_params, this.get('router'));
    };
  }
});
