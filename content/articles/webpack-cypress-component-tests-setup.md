---
title: "Webpack Cypress Component Tests Setup"
date: 2021-05-29T00:53:48-07:00
draft: false
---

I recently installed the cypress component testing library in a custom webpack project.
In doing so I ran into a few issues. Here are my notes on what I did to solve these issues.

Most of these notes can be found on the [cypress component testing introduction](https://docs.cypress.io/guides/component-testing/introduction) documentation but with a few tweaks.

## Install Node Packages

```shell
yarn add --dev cypress @cypress/react @cypress/webpack-dev-server webpack-dev-server html-webpack-plugin@^4.0
```

In my case I was using webpack version 4 but if you are using webpack version 5 then you can install `html-webpack-plugin@^5.0`.

## Customize Cypress Plugin Config

Since my custom webpack config included the `devserver` config I needed to remove that config from the webpack config only for cypress tests. Otherwise I would randomly get start errors when running `yarn cypress open-ct`.

Since I was using webpack's function config to retrieve the environment in the webpack config I hard coded `development` as the webpack environment.

```typescript
// cypress/plugins/index.ts
import { startDevServer } from '@cypress/webpack-dev-server';

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  if (config.testingType === 'component') {
    // Your project's Webpack configuration
    const { devServer, ...webpackConfig } = require('../../webpack.config.js')(
      'development'
    );

    on('dev-server:start', options =>
      startDevServer({ options, webpackConfig })
    );
  }

  config.env.reactDevtools = true;

  return config;
};
```

## Cypress Config

Add the following config to `cypress.json` in the root of the project.

```json
{
  "component": {
    "video": false,
    "componentFolder": "src",
    "testFiles": "**/*spec.{js,jsx,ts,tsx}"
  }
}
```

## Creating first test

```tsx
// src/components/Example/Example.tsx
import React from 'react';

function Example() {
  return <div>Example</div>;
}

export default Example;
```

```tsx
// src/components/Example/Example.spec.tsx
import React from 'react';
import { mount } from '@cypress/react';
import Example from './Example';

it('should see example', () => {
  mount(<Example />);

  cy.get('div').contains('Example');
});
```

## Running tests

To open visual test runner use `open-ct`.

```shell
yarn cypress open-ct
```

To run in CI or headlessly use `run-ct`.

```shell
yarn cypress run-ct
```

## References

- [Cypress Introduction](https://docs.cypress.io/guides/component-testing/introduction)
- [Load Webpack Plugin](https://github.com/cypress-io/cypress/blob/develop/npm/react/plugins/load-webpack/index.js) from the [react examples](https://github.com/cypress-io/cypress/tree/develop/npm/react)
