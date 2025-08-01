src = https://www.youtube.com/watch?v=8_X0nSrzrCw  
Nest.js tutorial by Dave Gray  

In this tutorial, we'll be building a fully functional **REST API** with NestJS.   

# 1. Intro

NestJS is a framework **built on top of Node.js**, providing a **structured** and **opinionated** approach
to building **server-side** applications.  

Nest follows the **MVC** (model-view-controller) design pattern while Express doesn't.  
In programming, MVC is an architectural design pattern that organizes an application's logic into distinct layers.  

NestJS's rapide rise in popularity can be attributed to its opinionated, **well-structured** architecture, **TypeScript**
support, **scalability**, and a strong community.  

Choosing NestJS over plain Node.js offers advantages in terms of **maintainability**, type safety, productivity, 
and integration options.  

Under the hood, Nest makes use of robust **HTTP server** frameworks like **Express** (the default).  

# 2. Project setup

- Of course, we need **Node**.js installed.  
- We also should install the NestJS **CLI**, this will be very **useful**
  - For that, open up a terminal and run `npm i -g @nestjs/cli`
- then, generate the starter code by creating a new Nest project in the current folder:
  - `nest new .`
  - if you already have a README file, you'll need to rename it

Once the starter code has been generated, we can start our Nest app in **watch** mode via:   
`npm run start:dev`

# 3. Starter code

- in the **main**.ts file located in the src folder, we can see our app will be listening on port **3000**
- this main.ts file is the **entry point**, it's what kicks off our application
- the app.**module** file is the **root module**
- we also have a default app.**controller** file and an app.controller.spec
- the app.controller.**spec** file is where we would write the **tests** for the app.controller
- the app.**service** file is where we will implement the app **provider**

In NestJS, the following words/concepts are very important:
- module
- controller
- service/provider
- decorator

## The controller

In the app.controller file, we can see: 
- a default `@Get()` **route** 
- and a default`getHello()` **method**

The getHello method returns `this.appService.getHello()`.  
This is because the getHello method is actually implemented in app.service.  

Now, if we visit http://localhost:3000, we will get a nice 'Hello World!'.  

In NestJS, the controller is responsible for defining:
- the **routes** 
- and the **request handlers** (methods) that correspond to these routes. 

Controllers are **decorated** with `@Controller()` and include methods that handle incoming **HTTP requests** to specified routes. 

Each method is typically associated with a **decorator** like `@Get()`, `@Post()`, etc., which determines what kind of HTTP request it handles and at which path.  

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
The second one will contain the tests related to the users controller.  

This cmd has also updated the users.module with the newly created controller.  

## Our first provider

Let's run `nest g service users`  
Same as before, this creates 2 files: users.service.ts and users.service.spec.ts.  
And this updates the users.module with the newly created provider.  

The provider (or service) will contain the logic for our request handlers.  
Then the service will be **injected** into the controller so the controller can use the handlers.  

# 4. Controllers

Controllers are responsible for handling incoming HTTP requests and returning responses to the client.  
The routing mechanism controls which controller receives which requests.  

Controllers are classes marked with the `@Controller()` decorator.  
`@Controller('users')` means "this is going to handle the /users route", whatever our domain is.  

## Decorators

They are special functions prefixed with the `@` symbol.   
They can be applied to classes, methods, properties, or parameters to modify their behavior or add metadata.  

For example, a method decorated with `@Get()` in a controller will be registered as an HTTP GET route.  

## Controller implementation

check the users.controller.ts file.  

The logic for the request handlers will be implemented in the users.**service**.ts file.  



---
@24/179