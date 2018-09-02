import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

import { transitionTo } from './transition-to';
import { replaceWith } from './replace-with';

export default Helper.extend({
  router: service(),

  compute(positionalArgs, namedArgs) {
    const [to] = positionalArgs;
    const { models, replace, queryParams } = namedArgs;

    return (maybeEvent) => {
      if (maybeEvent !== undefined && typeof maybeEvent.preventDefault === 'function') {
        maybeEvent.preventDefault();
      }

      let params = [to, ...(models || [])];

      if (queryParams) params.push({ queryParams });

      if (replace) {
        return replaceWith(params, this.router);
      }

      return transitionTo(params, this.router);
    };
  }
});
