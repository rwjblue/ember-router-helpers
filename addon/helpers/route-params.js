import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-observers
import { observer } from '@ember/object';
import { join } from '@ember/runloop';
import Helper from '@ember/component/helper';
import _RouteParams from '../utils/route-params';

let RouteParams = _RouteParams;
export function setRouteParamsClass(klass) {
  RouteParams = klass;
}

export default Helper.extend({
  router: service(),

  compute(params) {
    return new RouteParams(this.router, params);
  },

  // eslint-disable-next-line ember/no-observers
  didTransition: observer('router.currentURL', function() {
    join(this, this.recompute);
  })
});
