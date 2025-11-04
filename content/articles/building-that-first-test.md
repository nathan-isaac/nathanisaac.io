---
title: "Building that First Test"
date: 2025-10-28T07:00:00-08:00
draft: false
tags: ["Testing"]
cover:
  image: "/images/a18eaaee-9a04-4f41-b97f-375a8ae8548f.png"
  alt: "Developer working with code on multiple screens"
  caption: "Writing that first test can be challenging, but it's worth the investment"
  relative: false
---

One of the hardest parts of [TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html) is writing that first test. There is so much stacked against you, with many questions you have to answer.

At what level should I be testing? Should this be an integration test or a unit test?

What do all the test levels mean - Integration, Unit, Acceptance, E2E testing, and so on?

Do I have time to write this test? Is it worth writing tests for this change?

Is the codebase built with tests in mind? Is there any test infrastructure setup?

How many tests should be written?

Can I test this code? What code should be in the test?

All these questions build mental roadblocks, making it hard to start writing that first test. Is it worth writing tests?

It is worth writing tests. But the sooner you start, the sooner you will start benefiting.

Writing tests is an investment. Just like investing, you put money in now, and over time, you will earn a significant return on your investment. At the time, it may not seem worth it. But most projects last longer than you might expect, and having a good test suite will return dividends for yourself and your team by giving you freedom to refactor and update dependencies with confidence.

Writing tests is a form of documentation. Being able to read through the feature set by looking over the tests is a form of living documentation. It's living because the tests prove how the code works now, and if the production changes, the tests will also need to change. Reading through the tests puts you in the mind of the developer as they were building the feature. This gives context to what needs to be considered when making changes or understanding how the feature is supposed to work.

Writing tests help you define the application interface. If you have ever heard of [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) software, this is what I think of when writing tests for a feature or a piece of functionality. When writing tests, you can interact with the feature before shipping it. You get to see how the feature or functionality will be used. It's a great way to see whether the API design is good or needs tweaking. Since you have to write tests to use the API, it is a great way to vet and prove that it is a good fit. If the tests are hard to write, it is a good sign that the production code may need to be tweaked.

Even though it can seem daunting to start writing tests, I encourage you to start. The benefits are in front of you.
