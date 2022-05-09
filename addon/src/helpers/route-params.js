import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import _RouteParams from '../utils/route-params';

let RouteParams = _RouteParams;
export function setRouteParamsClass(klass) {
  RouteParams = klass;
}

export default class RouteParamsHelper extends Helper {
  @service router;

  compute(params) {
    return new RouteParams(this.router, params);
  }
}
