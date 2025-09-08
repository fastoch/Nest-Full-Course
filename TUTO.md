src = https://www.youtube.com/watch?v=8_X0nSrzrCw  
Nest.js tutorial by **Dave Gray**  

In this tutorial, we'll be building a fully functional **REST API** with NestJS.   

# 1. Intro

NestJS is a framework **built on top of Node.js**, providing a **structured** and **opinionated** approach
to building **server-side** applications.  

Nest follows the **MVC** (model-view-controller) design pattern while **Express** doesn't.  
In programming, MVC is an architectural design pattern that organizes an application's logic into distinct layers.  

NestJS's rapid rise in popularity can be attributed to its opinionated, **well-structured** architecture, **TypeScript**
support, **scalability**, and a strong community.  

Choosing NestJS over plain Node.js offers advantages in terms of **maintainability**, type safety, productivity, 
and integration options.  

Under the hood, Nest makes use of robust **HTTP server** frameworks like **Express** (the default), 
and optionally can be configured to use **Fastify** as well.  

---

# 2. Project setup

- Of course, we need **Node.js** installed.  
- We also should install the NestJS **CLI**, this will be very **useful**
  - For that, open up a terminal and run `npm i -g @nestjs/cli`
- then, generate the starter code by creating a new Nest project in the current folder:
  - `nest new .`
  - if you already have a `README.md` file, you'll need to rename it

Once the starter code has been generated, we can start our Nest app in **watch** mode via:   
`npm run start:dev`

---

# 3. Starter code

- in the `main.ts` file located in the src folder, we can see our app will be listening on port **3000**
- this `main.ts` file is the **entry point**, it's what kicks off our application
- the `app.module` file is the **root module**
- we also have a default `app.controller` file and an `app.controller.spec`
- the `app.controller.spec` file is where we would write the **tests** for the `app.controller`
- the `app.service` file is where we will implement the app **provider**

In NestJS, the following words/concepts are **very important**:
- module
- controller
- service/provider
- decorator

## The controller

In the app.controller file, we can see: 
- a default `@Get()` **route** 
- and a default`getHello()` **method**

The getHello method returns `this.appService.getHello()`.  
This is because the `getHello` method is actually implemented in `app.service`.  

Now, if we visit http://localhost:3000, we will get a nice 'Hello World!' message.  

In NestJS, the **controller** is responsible for defining:
- the **routes** 
- and the **request handlers** (methods) that will be called when sending requests to these routes. 

Controllers are **decorated** with `@Controller()`, and include methods that will handle incoming 
**HTTP requests** for the specified routes. 

Each **method** is typically associated with a **decorator** like `@Get()`, `@Post()`, etc., which determines 
what kind of HTTP request it handles and at which path.  

However, the actual **implementation** of these **methods** is done in the **service** class.  
Which is why the controller needs to **import** the service.  

## Our first custom Module

We will use the NestJS CLI to create our first module:  
`nest g module users`  

This cmd does 3 things:
- creates a 'users' directory inside of the 'src' directory.  
- creates a users.module.ts file inside the users folder
- updates the app.module (the root module) to make it **import** the users module

## Our first controller

Let's run `nest g controller users`  
This cmd creates a users.controller.ts file, and a users.controller.spec.ts file.  

The first file will contain the **routing** logic and the request **handlers**.  
The second one will contain the **tests** related to the users controller.  

This cmd has also updated the users.module with the newly created controller.  

## Our first provider

Let's run `nest g service users`  
Same as before, this creates 2 files: users.service.ts and users.service.spec.ts.  
And this updates the users.module with the newly created provider.  

The provider (or service) will contain the logic for our **request handlers**.  
Then the service will be **injected** into the controller so the controller can use the handlers.  

---

# 4. Controllers (chapter 2)

## REST API debugging tool

I will be using the **Bruno** extension for VSCodium to test my HTTP requests.  
Bruno is a Fast and Git-Friendly **Opensource API client**.  
https://www.usebruno.com/

## What are controllers?

Controllers are responsible for handling incoming HTTP requests and returning responses to the client.  
The routing mechanism controls which controller receives which requests.  

Controllers are classes marked with the `@Controller()` decorator.  
`@Controller('users')` means "this is going to handle the /users route", whatever our domain is.  

## Decorators

They are special functions prefixed with the `@` symbol.   
They can be applied to classes, methods, properties, or parameters to modify their behavior or add metadata.  

For example, a method decorated with `@Get()` in a controller will be registered as an HTTP GET route.  

## Controller implementation (pre-building our routes)

check the users.controller.ts file to see the implementation of the users' **routes**.  
In a **controller**, we simply define our **routes** (in a specific **order**), and we also declare the
**request handlers** that will get called when a request is made to those routes.  

### Parameters & Query parameters

- The `@Param` decorator extracts a **parameter** (or many) from the request URL, such as a user's id.  
  <u>for example</u>: `/users/:id`
- The `@Query` decorator extracts a **query parameter** from the request URL, such as a user's role.  
  <u>for example</u>: `/users?role=value`  

## Logic belongs to services

The logic for the request handlers will be implemented in the users.**service**.ts file.  
This service will then be **injected** into the controller = **dependency injection** = DI.  

## Routes' definition - ORDER does matter

For that section, check Dave gray's video at 24min: https://youtu.be/8_X0nSrzrCw?si=FRur-VI6R-ANZLEF&t=1469  

The **order** in which we define our routes in the controller is **VERY IMPORTANT**.  
The general rule for ordering routes is to go from most specific to least specific.  

The router processes routes sequentially from top to bottom and stops at the first one that matches the incoming URL.  

For example, in our users.controller, the `@Get('interns')` route cannot come after the `@Get(':id')` route, 
because the `:id` parameter is a **wildcard** that matches any string in that segment of the URL.  
The`@Get(':id')` route would match /users/123, /users/abc, and even /users/interns...  

When a request comes in, the router looks for a matching handler in the order they are defined in our controller.  

If the `@Get(':id')` route is placed before the `@Get('interns')` route, when a request for `GET /users/interns` 
arrives, the router first checks against `@Get(':id')`. Since `:id` is a wildcard, it's a match! 
The router will then execute the `findOne()` method, passing the string "interns" as the id parameter. 
The `findAllInterns()` handler is never even considered.  

We can easily test this behavior with a tool like Postman (VSCodium extension).  
- For that, we just need to place `@Get(':id')` before `@Get('interns')`.  
- Then send a GET request to http://localhost:3000/users/interns.  
- This will return `{"id":"interns"}`, because everything after `/users/` will be read as an id value.  

In conclusion, specific **static** routes like `/users/interns` need to come BEFORE a **dynamic** route 
like `/users/:id`.  
Because `/users/:id` could accept any id, including 'interns'.  

---

# 5. Providers (chapter 3)

## About providers

The main idea of a provider is that it can be <u>**injected**</u> as a <u>**dependency**</u> into other classes.  

A provider is not necessarily a service.  
Providers include other Nest classes such as: repositories, factories, or helpers.

## What we have done so far

So now we know how to handle both **params** (/user/:id) and **query params** (/user?role=value) in the **URL**.  
We also how to get the **body** out of a POST or PATCH request.  

Now, we're going to cover the **logic**, what we'll create inside of our users.service before **injecting** it 
into users.controller.  

Right now, we're not getting the data we want, we're just getting something back to prove that our **routes** are 
correct. What we have now is the **skeleton** of the controller.  

## `users.service.ts`

We have already created the users' provider via `nest g service users`  
Now we need to implement the methods (request handlers) for the routes that we have created in users.controller.  

Note that not all providers are services, although they are often associated.  
A service is a type of provider, but providers include other types.  

In users.service, notice the `@Injectable` decorator at the top.  
This decorator attaches metadata that says: "this class is a provider".  

We previously talked about injecting a service into a controller, let's be more specific:  
Providers can be injected into other classes via **constructor parameter injection**, using Nest's 
built-in **Dependency Injection (DI) system**.  

## Importing the provider into the controller

When we've created the users.service, it was automatically imported into the module and added to the providers list:  
```ts
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
```

But we also need to import that service into the controller:
```ts
import { UsersService } from './users.service';
```

## Injecting the service into the controller

Now, we can inject the service into the controller via its constructor:
```ts
@Controller('users') 
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  // Routes defined here
}
```

### Singleton by default

When NestJS instantiates the `UsersModule`, it creates a single instance of `UsersService`.  
By default, all providers in NestJS have a "singleton" scope.  
This means the framework creates the object once and shares that exact same instance across the entire application.  

### How does Dependency Injection (DI) work in NestJS? (this is crucial)

NestJS uses TypeScript's features to implement a powerful and clean DI system.  
In Nest, thanks to TypeScript capabilities, it's very easy to manage dependencies since they're resolved just by type.  

In the example below, Nest will resolve the `catsService` by creating and returning an instance 
of `CatsService`:
```ts
constructor(private readonly catsService: CatsService) {}
```

In our case, the line `constructor(private readonly usersService: UsersService) {}` uses a TypeScript feature 
called "**parameter properties** for **constructor injection**".  

When NestJS needs to create an instance of ``UsersController``, it calls the **constructor**.  
The **parameter** passed to the constructor tells Nest that the creation of a `UsersController` instance requires 
an argument that is an instance of `UsersService`. NestJS's DI container reads this **type** information.  

Actually, this `constructor(private readonly)` line is a TypeScript shorthand for:
```ts
private readonly usersService: UsersService;

constructor(usersService: UsersService) {
  this.usersService = usersService;
}
```

When an HTTP request comes in that needs to be handled by `UsersController`, NestJS does the following:
- creates an instance of `UsersController`
- looks at the controller's **constructor** and sees that ie needs an instance of `UsersService`
- Nest's **IoC** (inversion of control) **container** looks for a provider that can supply an instance of `UsersService`
- It finds it because `UsersService` was registered in the providers array of the `UsersModule`
- The IoC container gets (or creates if it doesn't exist yet) a singleton instance of `UsersService` and 
  automatically passes it as an argument to the `UsersController` constructor.

In short, that single line of code `constructor(private readonly usersService: UsersService) {}` tells NestJS:
- to create a `UsersController`, you must first find or create a `UsersService` and pass it to me
- then, make it available inside the controller as a private, read-only property called `this.usersService`

This decouples your controller from the responsibility of creating its own dependencies, making our code
more modular, easier to manage, and simpler to test.

### Inversion of Control (IoC)

Instead of classes instantiating their own dependencies directly (**tight** coupling), NestJS manages dependencies 
through its **IoC container**.  

Classes declare their dependencies in their **constructors**, and the IoC container takes responsibility for creating 
and injecting those dependencies automatically at **runtime**.   

This is typically done using: 
- the `@Injectable()` decorator to mark providers (services) 
- and "**constructor injection**" in classes like controllers or other services.

## Updating our routes with the usersService instance

Now that we've injected **UsersService** into **UsersController**, we can use UsersService inside our routes.  
So let's go ahead and update our routes in the `users.controller.ts` file.  

For example, instead of returning an empty array, here's what the `findAll` method will return:
```ts
@Get() // GET /users or /users?role=value
findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER' ) {
  return this.usersService.findAll(role)
}
```  

For the `findOne()` method, we need to use the "**unary plus operator**" `+` to convert the id parameter to a number.  
When we'll use the `ParseIntPipe` later on, we won't need the unary plus operator (because `id` will be a number already).  

For the `create()` method, we're using the same 'user' type in both `users.service` and `users.controller`.  
It's best practice to put **shared** type definitions in a **dedicated** file.  
We'll do that in the next section => **DTO** Validation (Data Transfer Object)

# 6. Testing our new endpoints (routes)

For that, we can use the **Bruno** extension for VSCodium, which allows us to test HTTP requests.   

### GET requests

First, we can send a GET request to http://localhost:3000/users/ to fetch the list of all users.  
Our 5 users have been added through the `users` private property inside the `users.service.ts` file.  

Then, we can try and get the user with an id of '2' via a GET request to http://localhost:3000/users/2.  

### POST request

Now, let's create a new user.  
To do that, we send a POST request with a JSON body to localhost:3000/users.  

The request body should look like this:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "INTERN"
}
```

This request should return the newly created user: 
```json
{"id":6,"name":"John Doe","email":"john.doe@example.com","role":"INTERN"}
```
Note that our `create()` method works well since the new user's id is 6.  

Now, we should have 6 users, which can be verified via a GET request to localhost:3000/users.  

### PATCH request

Let's update the last user's role via a PATCH request with a JSON body to localhost:3000/users/6.  

The request body should look like this:
```json
{
  "role": "ENGINEER"
}
```

We can verify the result via a GET request to localhost:3000/users/6.  

### DELETE request

Let's remove the last user via a DELETE request to localhost:3000/users/6.  

---

# 7. Data Validation (Chapter 4)

Now that our endpoints are working, we need to implement some data **validation** for incoming requests.  
Because right now, we're not **handling** any **errors** when the requests are bad.  

To help with that, we use a Nest's feature called **Pipes**.  

## Pipes 

Pipes are a specific type of **<u>middleware</u>** that have 2 typical use cases:
- **transformation**: transform input data to the desired form
- **validation**: evaluate input data and throw an exception if not valid, otherwise pass it through unchanged

In both cases, pipes operate on the **arguments** being processed by a **controller route handler**.  

Nest interposes a pipe **just before** a method is invoked, and the pipe receives the arguments destined for the method.  
Any transformation or validation operation takes place at that time, after which the route handler is invoked with any  
(potentially) transformed arguments.  

## Using pipes in our users.controller

First, we must import the built-in pipe we want to use (`ParseIntPipe`) at the top of our file:
```ts
import { Controller, Get, Post, Delete, Patch, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
```

Then, we need to insert the pipe as **middleware** into a route handler.  
We will use the `ParseIntPipe` in the methods that needed the unary plus operator for the `id` parameter.  
`ParseIntPipe` transforms string numbers into integers, so we won't need the unary plus operator anymore.  

Here's an example applied to our `remove()` method:
```ts
// BEFORE adding the pipe
@Delete(':id') // DELETE /users/:id
remove(@Param('id') id: string) {
  return this.usersService.remove(+id)
}

// AFTER adding the pipe
@Delete(':id') // DELETE /users/:id
remove(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.remove(id)
}
```

## Testing GET requests after adding pipes

Now, if we send a GET request to localhost:3000/users/aa, we will get a specific error message:  
```json
{
  "message":"Validation failed (numeric string is expected)",
  "error":"Bad Request",
  "statusCode":400
}
```  

But if we send a GET request to localhost:3000/users/1, we will indeed get the user with an id of 1:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "role": "INTERN"
}
```  

Which means the `ParseIntPipe` is working well. It <u>transforms</u> those string numbers into integers.  
And it also <u>validates</u> the request data, because we get an error if we send letters instead of numbers.  

## DTO (Data Transfer Object)

We still need to validate data when we create a new user or update an existing one.  
We can begin by creating **data transfer object** (DTO) schemas for the data we expect to receive 
from the different requests.  

We need to determine the DTOs because we're using **TypeScript**.  
A DTO is an object that defines how the data will be sent over the network.  

**Example** of file named `create-cat.dto.ts`:
```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

We could use a TypeScript interface to define a DTO schema, but we use a class because
classes are part of the JavaSscript ES6 standard, and therefore classes are preserved as
real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces 
are removed during the transpilation, Nest can't refer to them at runtime.  

## DTO for our users

### User creation

- create a `dto` folder inside of /src/users/.  
- then, create a `create-user.dto.ts` file inside of this `dto` folder

Here's how it looks: 
```ts
export class CreateUserDto {
  name: string;
  email: string;
  role: "ADMIN" | "ENGINEER" | "INTERN";
}
```

The user's id gets created after the "backend" received the above data, hence its absence from `CreatUserDto`.

### User update

When building "input validation types" (also called "DTOs"), it's often useful to build `create` and `update` variations
on the same type. For example, the `create` variant may require all fields, while the `update` variant may make all 
fields **optional**.  

Nest provides the `PartialType()` utility function to make this task easier and minimize boilerplate.  

- create a new file `update-user.dto.ts` inside of the `dto` folder
- Here's how it looks:
```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

Note that we need to install the 'mapped-types' package via `npm i @nestjs/mapped-types -D`  
The `-D` is for adding the package to the dev dependencies.  

## Using our DTOs

Now, let's see how to use our DTOs in users.service and in users.controller.  
- first, we need to import our DTOs inside `users.controller.ts`:
```ts
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
```
- then, in the routes using the 'user' type, replace the union-type with the corresponding DTO:
```ts
@Post() // POST /users
create(@Body() user: CreateUserDto) {
  return this.usersService.create(user)
}

@Patch(':id') // PATCH /users/:id
update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto) {
  return this.usersService.update(id, userUpdate)
}
```  

Now, let's do the same in `users.service.ts`:
```ts
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

create(user: CreateUserDto) {
 // ...
}

update(id: number, updatedUser: UpdateUserDto) {
  // ...
}
```

## Data validation

We've created and used our DTOs in the controller and the service provider.  
But now we need to make them actually validate incoming data.  

We will use **Validation decorators** for that:  
https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators   

- first, we need to add the required dependencies as production dependencies:  
`npm i class-validator class-transformer`  

- then, we need to import the decorators at the top of create-user.dto.ts:
```ts
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
```

- after that, we need to use these decorators in our DTO:
```ts
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["ADMIN", "ENGINEER", "INTERN"], {
    message: 'Valid role required' // this 2nd parameter is in case we don't provide one of the enum values
  })
  role: "ADMIN" | "ENGINEER" | "INTERN";
}
```  

Note that we don't need to apply any **validation decorators** to `update-user.dto.ts`.  
This is because it extends the **partial type** of `CreateUserDto`, and therefore it inherits the decorators 
from `CreateUserDto`.  

## Validation decorators + Validation pipes

Now we've configured **validation** for our DTOs, but we cannot really check the requests that are coming in until 
we apply the **validation pipes**.

Back to our users.controller, let's import the validation pipe:  
`import { Controller, Get, Post, Delete, Patch, Param, Body, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';`  

Then, we must insert this pipe inside the body of our POST requests:
```ts
@Post() // POST /users
create(@Body(ValidationPipe) user: CreateUserDto) {
  return this.usersService.create(user)
}
```
This will validate data against our DTO, and if the body contains invalid data, we'll get meaningful messages.  

After that, we also need to add the `ValidationPipe` in the body of our PATCH requests:
```ts
@Patch(':id') // PATCH /users/:id
update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
  return this.usersService.update(id, userUpdate)
}
```

## Testing our POST and PATCH requests

- start the dev server via `npm run start:dev`

- send a valid POST request to localhost:3000/users with the following body:
```json
{
  "name": "Fantastic Four",
  "email": "marvel@universe.com",
  "role": "ENGINEER"
}
```

- send a bad POST request to localhost:3000/users with the following body:
```json
{
  "name": "Hulk",
  "email": "marvel@universe",
  "role": "ENGINEER"
}
```
We get the following response to the bad request: 
```json
{
  "message": [
    "email must be an email"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

- send a valid PATCH request to localhost:3000/users/1:
```json
{
  "role": "ENGINEER"
}
```  

- send a bad PATCH request to localhost:3000/users/1:
```json
{
  "role": "tester"
}
```
We get the following response to the bad request:  
```json
{
  "message": [
    "Valid role required"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```  

- we'll receive a "name should not be empty" if we send a POST or PATCH request with an empty string for the name.
- and we'll get a "name should be a string" if we send a request with a number for the name

These tests show that our validation is in place and working.  

## NestJS built-in HTTP exceptions

Right now, if we try to send a GET request to localhost:3000/users/99, we get an empty response.  
Instead, it would be nice to get a meaningful response such as "User 99 not found".  

To do that, we will use the `NotFoundException` in `users.service.ts`.  

- First of all, we must import the exception: `import { NotFoundException  } from '@nestjs/common';`
- then, use it in the `findOne` method:
```ts
findOne(id: number) {
  const user = this.users.find(user => user.id === id)
  if (!user) {
    throw new NotFoundException(`User ${id} not found`)
  }
  return user
}
```

We can apply the same logic for a query parameter such as http://localhost:3000/users?role=TOTO
This request should provide a message like "Users with role TOTO not found".  

To do that, we need to modify the `findAll` method:
```ts

```


---
@90/179