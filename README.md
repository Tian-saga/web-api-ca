# Assignment 2 - Web API.

Name: Zitian Zhong

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
User Authentication: Implemented JWT-based authentication for user login and protected routes.
Favorites Management:
Added functionality to store and manage user-specific favorite movies.
Enabled users to add or remove movies from their favorites list.
Token Validation: Middleware to ensure protected routes can only be accessed by authorized users.
Integration with React Frontend: Updated frontend to interact with backend API for user login, authentication, and favorites management.

## Setup requirements.

MongoDB: Ensure you have access to a MongoDB instance and note the connection URI.
Node.js: Install Node.js (version 16 or higher recommended).
Environment Variables: Create an .env file in the movies-api directory with the following content:
plaintext
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
Frontend Configuration: In the react-movies directory, create a .env file:
plaintext
REACT_APP_TMDB_KEY=YourTMDBApiKey

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
The API includes the following endpoints:

Movies
GET /api/movies
Returns a list of movies.
GET /api/movies/{movieid}
Returns details of a specific movie.
GET /api/movies/{movieid}/reviews
Retrieves all reviews for a specific movie.
POST /api/movies/{movieid}/reviews
Adds a new review to a specific movie.
Users
POST /api/users
?action=register to register a new user.
Without ?action, the endpoint logs in an existing user and returns a JWT.
GET /api/users/{id}/favourites
Retrieves the favorite movies of a specific user. (Protected)
POST /api/users/{id}/favourites
Adds a movie to the user's favorite list. (Protected)
DELETE /api/users/{id}/favourites/{movieid}
Removes a movie from the user's favorite list. (Protected)

## Security and Authentication

Authentication: Implemented using JWT (JSON Web Tokens). Users must log in to obtain a token, which is required for accessing protected routes.
Protected Routes:
Adding/removing favorites.
Viewing a user's favorite movies.

## Integrating with React App

User Authentication: Integrated React frontend with the backend for user login and token-based authentication.
Token is stored in localStorage and attached to all protected API requests.
Favorites Management:
The "Favorites" page now displays user-specific favorite movies retrieved from the backend.
Users can add or remove movies from their favorites list, and the changes are synced with the backend.
Protected Views:
Certain views, such as "Favorites," require the user to log in before accessing them.
Implemented a ProtectedRoute component to handle this functionality.

## Independent learning (if relevant)

Token-Based Authentication: Researched and implemented middleware for verifying JWTs to protect sensitive routes.
React Context API: Used context to manage authentication and favorites state across the React app.
Backend-Frontend Integration: Worked on synchronizing the React frontend with the backend for seamless user experience. 
