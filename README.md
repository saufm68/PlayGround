# PlayGround

[PlayGround](https://play-g.herokuapp.com/) is a platform for users to share games they created and get feedbacks from others. The site includes a built-in pac-man style game maker for users to create simple arcade style games and publish it in Playground. It's built with Node.js, Express, Bootstrap, jQuery, JSX and PostgreSQL.

## Getting Started 

### Prerequisite

1. Install Node.js
2. Install PostgreSQL
3. Create a Cloudinary account

### Setting Up

Create a `.env` file at the project root directory, and add your Cloudinary credentials.

```
CLOUD_NAME=<username>
API_KEY=<api_key>
API_SECRET=<api_secret>
```
Install all dependencies

```
npm install
```
Run the project in localhost:3000

```
nodemon index.js
```

