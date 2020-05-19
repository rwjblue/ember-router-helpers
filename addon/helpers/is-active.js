import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-observers
import { observer } from '@ember/object';
import { join } from '@ember/runloop';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

export default Helper.extend({
  router: service(),

  compute(_params) {
    let params = handleQueryParams(_params);

    return this.router.isActive(...params);
  },

  // eslint-disable-next-line ember/no-observers
  didTransition: observer('router.currentURL', function() {
    join(this, this.recompute);
  })
});
