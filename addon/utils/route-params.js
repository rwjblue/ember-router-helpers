import handleQueryParams from './handle-query-params';
import trackActiveRoute from './track-active-route';

export default class RouteParams {
  constructor(router, params) {
    this._router = router;
    this._inputParams = params;
    this._transitionTo = undefined;
    this._replaceWith = undefined;
    this._processedParams = undefined;
  }

  get isActive() {
    trackActiveRoute(this._router);

    return this._router.isActive(...this._params);
  }

  get url() {
    return this._router.urlFor(...this._params);
  }

  get transitionTo() {
    if (this._transitionTo === undefined) {
      this._transitionTo = (maybeEvent) => {
        if (maybeEvent !== undefined && typeof maybeEvent.preventDefault === 'function') {
          maybeEvent.preventDefault();
        }
        return this._router.transitionTo(...this._params);
      };
    }

    return this._transitionTo;
  }

  get replaceWith() {
    if (this._replaceWith === undefined) {
      this._replaceWith = () => {
        return this._router.replaceWith(...this._params);
      };
    }

    return this._replaceWith;
  }

  get _params() {
    if (!this._processedParams) {
      this._processedParams = handleQueryParams(this._inputParams);
    }

    return this._processedParams;
  }
}
