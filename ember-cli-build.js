'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('node_modules/owasp-password-strength-test/owasp-password-strength-test.js');

  // Bootstrap JS and source maps.
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', { destDir: 'assets' });
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css.map', { destDir: 'assets' });

  return app.toTree();
};
