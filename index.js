'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    let hasEmberHrefTo = this.project.addons.some(a => a.name === 'ember-href-to');
    if (hasEmberHrefTo) {
      throw new Error('`ember-href-to` add-on detected, please migrate from `{{href-to}} to `{{url-for}}` helper.');
    }
  }
};
