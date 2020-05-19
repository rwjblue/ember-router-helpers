import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

export default class IsActiveHelper extends Helper {
  @service router;

  compute(_params) {
    // ensure router.currentURL is auto-tracked
    this.router.currentURL;

    let params = handleQueryParams(_params);

    return this.router.isActive(...params);
  }
}
