import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import RouteParams from '../utils/route-params';

export default class RouteParamsHelper extends Helper {
  @service router;

  compute(params) {
    return new RouteParams(this.router, params);
  }
}
