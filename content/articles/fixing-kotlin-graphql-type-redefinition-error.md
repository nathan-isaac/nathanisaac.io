---
title: "Fixing Kotlin GraphQL Type Redefinition Error"
date: 2025-03-20T20:59:33-07:00
tags: ["Kotlin", "GraphQL"]
---

While working on a GraphQL API project using Ktor and GraphQL Kotlin, I encountered a type redefinition error. The issue
stemmed from an incorrect use of union types, which GraphQL does not support as input types. Debugging this was tricky,
especially since the error message wasn’t particularly clear. This post breaks down the issue and how to resolve it.

> {{< collapse summary="**You have redefined the type 'Pet' from being a 'GraphQLUnionType' to a 'GraphQLUnionType**" >}}

```
Exception in thread "main" graphql.AssertException: All types within a GraphQL schema must have unique names. No two provided types may have the same name.
No provided type may have a name which conflicts with any built in types (including Scalar and Introspection types).
You have redefined the type 'Pet' from being a 'GraphQLUnionType' to a 'GraphQLUnionType'
	at graphql.schema.impl.GraphQLTypeCollectingVisitor.assertUniqueTypeObjects(GraphQLTypeCollectingVisitor.java:156)
	at graphql.schema.impl.GraphQLTypeCollectingVisitor.assertTypeUniqueness(GraphQLTypeCollectingVisitor.java:148)
	at graphql.schema.impl.GraphQLTypeCollectingVisitor.visitGraphQLUnionType(GraphQLTypeCollectingVisitor.java:88)
	at graphql.schema.impl.MultiReadOnlyGraphQLTypeVisitor.lambda$visitGraphQLUnionType$15(MultiReadOnlyGraphQLTypeVisitor.java:142)
	at java.base/java.util.Arrays$ArrayList.forEach(Arrays.java:4204)
	at graphql.schema.impl.MultiReadOnlyGraphQLTypeVisitor.visitGraphQLUnionType(MultiReadOnlyGraphQLTypeVisitor.java:142)
	at graphql.schema.GraphQLUnionType.accept(GraphQLUnionType.java:185)
	at graphql.schema.SchemaTraverser$TraverserDelegateVisitor.enter(SchemaTraverser.java:109)
	at graphql.util.Traverser.traverse(Traverser.java:144)
	at graphql.schema.SchemaTraverser.doTraverse(SchemaTraverser.java:96)
	at graphql.schema.SchemaTraverser.depthFirst(SchemaTraverser.java:86)
	at graphql.schema.SchemaTraverser.depthFirst(SchemaTraverser.java:79)
	at graphql.schema.impl.SchemaUtil.visitPartiallySchema(SchemaUtil.java:68)
	at graphql.schema.GraphQLSchema$Builder.buildImpl(GraphQLSchema.java:927)
	at graphql.schema.GraphQLSchema$Builder.build(GraphQLSchema.java:904)
	at com.expediagroup.graphql.generator.SchemaGenerator.generateSchema(SchemaGenerator.kt:88)
	at com.expediagroup.graphql.generator.SchemaGenerator.generateSchema$default(SchemaGenerator.kt:58)
	at com.expediagroup.graphql.server.ktor.GraphQL$schema$1.invokeSuspend(GraphQL.kt:118)
	at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(ContinuationImpl.kt:33)
	at kotlinx.coroutines.DispatchedTask.run(DispatchedTask.kt:100)
	at kotlinx.coroutines.scheduling.CoroutineScheduler.runSafely(CoroutineScheduler.kt:586)
	at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.executeTask(CoroutineScheduler.kt:829)
	at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.runWorker(CoroutineScheduler.kt:717)
	at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.run(CoroutineScheduler.kt:704)
```

{{</ collapse >}}

## Problem Example

In my project, I defined an interface representing different union types. The issue arose when I used this 
interface as part of an input type in a query. Since GraphQL does not support union types in input definitions,
the schema validation failed, leading to the redefinition error.

**Simplified Example:**

```kotlin
import com.expediagroup.graphql.server.operations.Query

interface Pet

class Cat(
    val name: String
) : Pet

class Dog(
    val name: String
) : Pet

class Input(
    // Contrived example but here to illustrate the issue
    val pet: Pet
)

object PetQuery : Query {
    fun pet(input: Input): Pet {
        TODO()
    }
}
```


## Solution

GraphQL does not support union types as input types. If you run into a type redefinition error, check your schema 
for any union types used in input definitions and refactor them accordingly! 🚀

Hopefully, this saves you some debugging time! 
