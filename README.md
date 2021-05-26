# SellerFinder REST API

<img src=".github/sellerFinder.png" alt="SellerFinder REST API" width="80%">

Server project to conclude Server-side Development with NodeJS, Express and MongoDB on Coursera - Honors content, Project Implementation and Final Report.

## User Authentication

<img src=".github/googleoauth.png" alt="SellerFinder Google OAuth Authentication" width="60%">

The server uses JWT token based authentication, since it allows stateless server side authentication. Once the user is logged in, an access token in send to the client so that future requests _Bear_ the token, either registering and signing in through local strategy or logging in using **Google OAuth** service.

> The authentication is made through Passport library, that performs Local, JWT and Google stratregies.

## Resources & data model

Products:

- Authenticated users are able to create, read, update and delete Products and Comments in a product.
- These actions follows business rules like only the user that is the owner of the product, is able to modify it.
- Role-based access control, only admin users can delete all the Comments in a Product.

**Data Model:**

<img src=".github/googleoauth.png" alt="SellerFinder Google OAuth Authentication" width="60%">

## NestJs & ExpressJs

NestJs is a Node.js framework for building server-side applications, it is built on top of Express. The lessons on the course teaches a lot of things about Express like Middlewares, Authentication, Authorization and so on. I've made use of Nest because I just wanted to learn a little on how to use NestJs. I've described some informations about this framework [in this repository example.](https://github.com/NietoCurcio/Nestjs-REST-API-Example) and an overview of what is shown in the Server-side Development with NodeJS course in the [Confusion server project in the course](https://github.com/NietoCurcio/Confusion-REST-API-Server).

## Requirements

- NodeJs.
- MongoDB local service or Atlas cloud database service.
- Google OAuth project registration.

<hr>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
