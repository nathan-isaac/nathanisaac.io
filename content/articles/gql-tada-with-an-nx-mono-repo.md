---
title: "Setup GQL Tada With an Nx Mono Repo"
date: 2024-07-21T21:06:04-07:00
draft: true
---

In this article we will learn how to setup [gql.tada](https://gql-tada.0no.co/) with an [Nx](https://nx.dev/) mono repo.
We will also learn how to setup graphql type checking when you use graphql operations in multiple libraries.

## Project Setup

In this simple example I have one application with two libraries. 

```
apps/
  app/
    project.json
    tsconfig.app.json
libs/
  features/
    project.json
    tsconfig.lib.json
  graphql-api/
    src/
      graphql.ts
      index.ts
    project.json
    tsconfig.lib.json
```

I setup the `graphql-api` package to be used in the `features` and `app` packages. 

```json {hl_lines=["6-12"]}
// libs/graphql-api/tsconfig.lib.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "types": ["node"],
    "plugins": [
      {
        "name": "@0no-co/graphqlsp",
        "schema": "./src/schema.gen.graphql",
        "tadaOutputLocation": "./src/introspection.d.ts"
      }
    ]
  },
  "files": [
    "../../../node_modules/@nx/react/typings/cssmodule.d.ts",
    "../../../node_modules/@nx/react/typings/image.d.ts"
  ],
  "exclude": [
    "**/*.spec.ts",
    "**/*.test.ts",
    "**/*.spec.tsx",
    "**/*.test.tsx",
    "**/*.spec.js",
    "**/*.test.js",
    "**/*.spec.jsx",
    "**/*.test.jsx"
  ],
  "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
}
```

In order to get typesafety on compile time I setup a script in the `project.json` file to validate the graphql operations. 

```json {hl_lines=["8-15"]}
// libs/graphql-api/project.json
{
  "name": "graphql-api",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/graphql-api/src",
  "projectType": "library",
  "targets": {
    // ...
    "codegen": {
      "executor": "nx:run-commands",
      "options": {
        "color": true,
        "cwd": "{projectRoot}",
        "commands": ["gql-tada check -c ./tsconfig.lib.json"]
      }
    }
  }
}
```

```ts
// libs/graphql-api/src/graphql.ts
import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '../introspection.d.ts';
import type { Scalars } from '../scalars.gen';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: Scalars;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';
```
