import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';
import trackActiveRoute from '../utils/track-active-route';

export default class IsActiveHelper extends Helper {
  @service router;

  compute(_params) {
    trackActiveRoute(this.router);

    let params = handleQueryParams(_params);

    return this.router.isActive(...params);
  }
}
