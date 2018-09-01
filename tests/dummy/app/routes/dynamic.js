import Route from '@ember/routing/route';


export default class DynamicRoute extends Route {
  model(params) {
    const { dynamic_id } = params;

    return {
      id: dynamic_id,
      foo: 'bar'
    };
  }
}
