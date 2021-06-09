# IT Logger Full-Stack (MERN)

## Express server setup

## Create package.json

```zsh
npm init -y
```

## Install dependencies

```zsh
npm i express config express-validator mongoose
```

## Install dev dependencies

```zsh
npm i -D nodemon concurrently
```

After installing and configuring the dependencies you could just copy the config, models, routes, and server.js and the API should be up and running with full CRUD functionality.

## Setting up React

## Create React App in client folder

```zsh
npx create-react-app client
```

## Add scripts in package.json on the root to run front and back ends concurrently

```json
"scripts": {
    "client": "npm start --prefix client",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
}
```

## Add proxy server in the /client/package.json

```json
"proxy": "http://localhost:5000"
```

## Basic React Clean up (in client folder)

- Remove README file, .gitignore
- Remove git repository

```zsh
rm -rf .git
```

- Add new ignored files in .gitignore (root)

## Install React dependencies (inside client folder)

```zsh
npm i react-router-dom
```

## Install Materialize

```zsh
npm i materialize-css
```

# Install Moment and React-Moment

```zsh
npm i moment react-moment
```

# Implement Redux

After developing the React Components and the UI we have to implement Redux

# Install redux and other tools

```zsh
npm i redux react-redux redux-thunk redux-devtools-extension
```

- Create store.js
- Wrap the app with the Provider(store)
- Create the reducers
- Add the types
- Create the actions
