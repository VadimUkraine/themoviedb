# The Movies Database Service

## Description

This is a full stack app with NodeJS, Apollo Client, React, MaterialUI, TypeScript and GraphQL.
The application is a database of movies with user interactions.
The source of data is https://developers.themoviedb.org/3.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Yarn - [Download & Install Yarn](https://classic.yarnpkg.com/en/docs/getting-started) - package manager.

## Downloading

```
git clone https://github.com/VadimUkraine/themoviedb.git

cd themoviedb

```

## Running application

First you need to install the dependencies using yarn in the folders client, server
and in the main folder.

After it the application is ready to run.
Use the command below in the main folder to start the application

```
yarn start
```

After starting the app on port (4200 as default) it will open in browser.

## App pages descriptions

### Dashboard Page

Displaying a list of movies in three categories: now playing, upcoming, popular.
Each list contains 5 movies.
Registered users can add movies to their wishlists.

### Movies Page

Displaying a list of movies with pagination and filters: by genre, release date (from-to). Filters are applied by clicking the Apply button. After applying filters, the page is reset to the first one.
Registered users can add movies to their wishlists.

### Random Movie Page

Displaying a random movie with filtering, the filters are the same as in Movies page.
Registered users can add movies to their wishlists.

### Movie Details Page

Displaying movie details with a crew list and recommendations.

### Wishlists Page

Movie list management page, available only to registered users: allows to create and delete lists, view movies in lists and delete them.

### Additional Services

- Localization - RU/EN languages
- User authorization
- Information about users and wishlists is stored in a local database

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
