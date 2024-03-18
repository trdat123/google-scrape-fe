# Google scape

This project is for educational purpose.

## Technology used

### Front-end

-   Front-end uses [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [Bun](https://bun.sh/): Vite for starting local server. Bun for installing dependencies. Both of them are blazingly fast.
-   UI library: [shadcn/ui](https://ui.shadcn.com/examples/mail) and [Tailwindcss](https://tailwindcss.com/)
-   Authentication: [Auth0](https://auth0.com/)

### Back-end

-   [Bun](https://bun.sh/) as JavaScript run time, managing dependencies, and testing
-   Scraping library: [Puppeteer](https://pptr.dev/). Puppeteer will run Chrome or Chromium based browser in headless mode (Like a normal user). Allow it to do automate task and scraping data in browser easily.
-   Database & ORM: [vercel/postgres](https://vercel.com/docs/storage/vercel-postgres) & [Drizzle](https://orm.drizzle.team/)
-   API layer: [Express](https://expressjs.com/)

---

## Installation

(Use for both front-end and back-end)

-   Install Bun: See [Bun docs](https://bun.sh/)

```
curl -fsSL https://bun.sh/install | bash
```

```
bun i
```

-   Add Env file to root folder
-   Run server: `bun dev`

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
