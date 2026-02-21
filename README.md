
# Moovee - Movie Discovery App

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="https://moovee-app.netlify.app/" target="blank">Live Demo</a></li>
  </ol>
</details>

## About The Project

A modern movie discovery application built with **Angular 21** and **SSR (Server-Side Rendering)**. The app features a high-performance search engine with RxJS-driven debouncing, centralized state management via services, and a polished, responsive user interface.

### Built With

Below are the frameworks and libraries used to bootstrap this project.

- ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
- ![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Netlify](https://img.shields.io/badge/netlify-%2300C7B7.svg?style=for-the-badge&logo=netlify&logoColor=white)
- ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

---

## Getting Started

Below are instructions on setting up your project locally.

### Prerequisites

- **Node.js**: v22.13.0 or higher
- **Angular CLI**: ~21.1.4
- **TypeScript**: ~5.9.2

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dnyaneshwargiri/movee-app.git
   ```

## JSON Server
To start a local JSON server, run:

```bash
cd server && pnpm install && pnpm start
```
Once the server is running, open your browser and navigate to `http://localhost:3000/`. This is our Json server serving movies data


## Frontend
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

```bash
cd frontend && pnpm install && pnpm start
```

## Building
To build the project run:

```bash
cd frontend && pnpm install && pnpm build
```

This will compile your project and store the build artifacts in the `frontend/dist/frontend` directory. By default, the production build optimizes your application for performance and speed. This application utilizes Angular SSR (Server-Side Rendering) to pre-render pages on the server, ensuring faster initial load times and significantly improved SEO by serving fully-formed HTML to search engines.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
cd frontend && pnpm install && pnpm test-unit
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
pnpm test-e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


## Known Issues

- The `Reset search` link in currently doesnt reset the search term in Search box(s) input. 
- I'm not happy with the way I handled JSON's wrong naming convention in typescript, it can be improved further.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
