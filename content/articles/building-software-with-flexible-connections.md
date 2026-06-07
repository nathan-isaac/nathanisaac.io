---
title: "Building Software With Flexible Connections"
date: 2025-11-09T13:32:24-07:00
draft: false
---

Writing software often requires numerous integrations. You need to integrate with web frameworks and libraries to talk to external systems.

With all these frameworks and libraries, it's important to insulate your core domain logic from these dependencies to make it easy to test and to make it easy to change when they ultimately need to change.

The goal is to make it easy to change frameworks or libraries that talk to an external service.

Let's say your software needs to talk to a calendar service.

There are many different options for talking to a calendar service, as well as various calendar providers, such as Google and Microsoft, to name a few. You can choose to use the provided SDK or communicate directly with their API through HTTP requests.

Let's create an interface with the low-level methods to create and find an event.

```ts
interface CalendarGateway {
	createEvent(event: NewCalendarEvent): Promise<CalendarEvent>
	findEvent(eventId: string): Promise<CalendarEvent | null>
}
```

Now that you have the given interface, you have the freedom to create different adapters for either the SDK version or the HTTP client version.

```ts
class MicrosoftSDKCalendarGateway implements CalendarGateway {}
class GoogleHttpClientCalendarGateway implements CalendarGateway {}
```

Let's now say you need to talk to a database, and the team has decided to switch from Prisma to Drizzle.

Given that your application has an interface for database queries, you would need to create a new implementation for Drizzle, and the conversion is complete.

```ts
interface DatabaseGateway {
	createProject(project: NewProject): Promise<Project>
	findProject(projectId: string): Promise<Project | null>
}
class PrismaDatabaseGateway implements DatabaseGateway {}
class DrizzleDatabaseGateway implements DatabaseGateway {}
```

I've often read that the reason to decouple your database layer is to allow you to swap databases, such as MySQL for PostgreSQL, for example. While this could happen, I've found that having this abstraction is more to decouple from the database libraries. Having this interface lets you defer that decision until later.

It should be noted that the types in these interfaces should not be derived from any library type. Since we want the flexibility to switch between implementations, the types need to be decoupled from the specific implementation.

Now all that is needed is to plug these adapters into your main function. Your main function may be a literal main function, or it might be a function that is called from a web framework for a given URL.

```ts
// scripts/create-event.ts
type AppContext = {
	calendar: CalendarGateway
}

async function main(context: AppContext, input: {name: string, date: string}) {
	await context.calendar.createEvent({
		name: input.name,
		date: Date.parse(input.date)
	})
}

main({
	calendar: new MicrosoftSDKCalendarGateway(),
}, {
	name: 'Work meeting',
	date: '2025-11-09T20:45:40.516Z'
})
```

Main function pseudo-code:

```ts
// plug into framework context or server singleton
type AppContext = {
	db: DatabaseGateway,
}

const context: AppContext = {
	db: new PrismaDatabaseGateway(prismaClient)
}

// register your routes
app.get('/projects/:projectId', (c) => {
	const projectId = c.params.get('projectId')

	const project = await c.context.db.findProject(projectId)

	if (project === null) {
		return c.json({error: 'not found'})
	}

	return c.json({id: project.id, name: project.name})
})
```

It requires some initial setup work, but once it is in place, the boundaries are available for testing and injecting different implementations when a change is needed.
