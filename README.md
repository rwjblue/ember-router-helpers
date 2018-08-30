# ember-router-helpers


Installation
------------------------------------------------------------------------------

* `git clone <repository-url>` this repository
* `cd ember-router-helpers`
* `npm install`

## Usage

* `route-params`

```hbs
{{#with (route-params 'parent.child') as |routeParams|}}
  <a href="{{routeParams.url}}" class="{{if routeParams.isActive 'active' 'inactive'}}">Blah</a>
{{/with}}
```

* `transition-to`

```hbs
<button onclick={{transition-to 'parent.child'}}></button>
```

* `is-active`

```hbs
{{is-active '/parent/child'}}
```

* `url-for`
```hbs
{{url-for 'parent.child'}}
```




### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
