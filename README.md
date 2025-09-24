# ChillAbode

**Live demo: [Live demo](https://chill-abode.onrender.com)


---

## Overview

ChillAbode is a web application for browsing and managing rental/home listings (or replace with a short description of what your project does). It is built with Node.js, Express and EJS for server-rendered views, with static assets in the `public/` folder.

This README shows how to run the project locally, where to put environment variables, and how to contribute.

---

## Features

* Server-rendered UI using EJS templates (views in `views/`).
* REST-style routes (check `routes/`).
* Simple data model (see `models/` and `schema.js`).
* Static assets served from `public/`.

---

## Tech stack

* Node.js
* Express
* EJS
* CSS
* MongoDB 

---

## Prerequisites

* Node.js (v16 or newer recommended)
* npm 
* MongoDB 

---

## Quick start (run locally)

1. **Clone the repository**

```bash
git clone https://github.com/Rhythmchoudhary25/ChillAbode.git
cd ChillAbode
```

2. **Install dependencies**

```bash
npm install

```

3. **Create a `.env` file**

Create a file named `.env` in the project root and add the environment variables your app expects. A common example :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chillabode
SESSION_SECRET=your_session_secret
# Add any other keys your app needs (API keys, cloud config, etc.)
```

> If you are not sure which env variables are required, open `app.js`, `config` or `cloudconfig.js` to see what the project expects.

4. **Run the app**

```bash
npm start
# or, if you use nodemon during development
# npm run dev
```

Then open `http://localhost:3000` (or the `PORT` you set) in your browser.

---


## Project structure (high level)

```
ChillAbode/
├─ .vscode/
├─ controllers/      # route controllers
├─ models/           # data models
├─ public/           # static files (css, images, js client)
├─ routes/           # route definitions
├─ utils/            # helper utilities
├─ views/            # EJS templates
├─ app.js            # application entry
├─ cloudconfig.js    # cloud/deploy configuration
├─ package.json
└─ README.md
```
