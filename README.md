# ember-router-helpers

[![Build Status](https://travis-ci.org/rwjblue/ember-router-helpers.svg?branch=master)](https://travis-ci.org/rwjblue/ember-router-helpers)

## Installation

```
ember install ember-router-helpers
```

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

---------------------------------------


This rest of this README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-router-helpers`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
