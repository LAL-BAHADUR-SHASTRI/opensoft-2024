# Backend Setup for OpenSoft 2024 Project

<img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg" width="100" alt="Go Logo"/>
<img src="https://blog.golang.org/gopher/gopher.png" width="100" alt="Go Gopher"/>

This README provides instructions on how to set up and run the backend for the OpenSoft 2024 project using Go and the Gin web framework.

## Prerequisites

- Go (version 1.14 or later)
- Git (for version control)

## Setup Instructions

1. **Clone the Repository**

    Clone the project repository to your local machine using Git:

    ```bash
    git clone https://github.com/[your-username]/opensoft-2024.git
    cd opensoft-2024
    ```

    Replace `[your-username]` with your actual GitHub username or organization where the repository is hosted.

2. **Install Dependencies**

    Navigate to the backend directory and install the necessary Go modules:

    ```bash
    cd backend
    go mod tidy
    ```

    `go mod tidy` will automatically add missing and remove unused modules.

3. **Configuration**

    Before running the server, ensure that you have the necessary configuration in place. The database credentials are stored in the `db.go` file. Make sure to review and update these credentials according to your database setup.

4. **Running the Server**

    Start the backend server using the following command:

    ```bash
    go run main.go
    ```

    This will start the server on `localhost:8080` and will include the following routes for CRUD operations:

    - **User Management**
        - `POST /user/sign_up`: Create (Sign up) a new user
        - `GET /user/`: Read (Get) all users
        - `POST /user/sign_in`: Authenticate (Sign in) a user
        - `PUT /user/`: Update an existing user
        - `DELETE /user/`: Delete all users
        - `GET /user/with_token`: Get user details with token
        - `POST /user/bookmark`: Add a bookmark for a user

    - **Movies**
        - `GET /movie/id/:id`: Get a single movie by ID
        - `GET /movie/`: Get all movies
        - `GET /movie/topimdb`: Get top IMDB movies
        - `GET /movie/genre/:genre`: Get movies by genre
        - `GET /movie/language/:language`: Get movies by language
        - `GET /movie/country/:country`: Get movies by country
        - `GET /movie/latest`: Get the latest movies
        - `GET /movie/genres`: Get all genres
        - `GET /movie/languages`: Get all languages
        - `GET /movie/countries`: Get all countries
        - `GET /movie/filter`: Get movies based on various filters

    - **Payments**
        - `POST /payment/create`: Create a new payment
        - `GET /payment/`: Get all payments
        - `PUT /payment/update`: Update an existing payment
        - `DELETE /payment/`: Delete all payments
        - `GET /payment/user/:user_id`: Get payments by user ID

    - **Search**
        - `GET /search/semantic/:searchTerm`: Perform semantic search
        - `GET /search/fuzzy/:searchTerm`: Perform fuzzy search
        - `GET /search/autocomplete/:searchTerm`: Perform autocomplete search

    - **WebSockets**
        - `GET /ws`: Connect to the WebSocket endpoint

5. **Security Warning**

    Be aware of the security implications of trusting all proxies. For production, configure the trusted proxies appropriately. Refer to the [official Gin documentation](https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies) for more details.

## Search Functionality

- **Autocomplete Search**: Provides real-time suggestions to users as they type their query, making search faster and more efficient.

- **Fuzzy Search**: Allows for the matching of partial or misspelled queries to relevant results, overcoming user input errors and variations in spelling.

- **Semantic Search**: Goes beyond literal matching to understand the context and intent behind a search query, providing more relevant and contextually appropriate results.

## JWT Authentication

The application implements JWT (JSON Web Token) authentication for sign-in and sign-up features, ensuring secure transmission of user credentials and effective identity verification.

## WebSockets for Real-Time Communication

The backend utilizes WebSockets to enable real-time communication between the client and server, reducing latency and enhancing system scalability.

## Payment Gateway Integration

The backend includes a payment gateway integration for tier-based subscriptions, allowing users to subscribe to different tiers with varying levels of access and benefits.

## HTTP Routes for CRUD Operations

The backend uses HTTP routes to perform CRUD (Create, Read, Update, Delete) operations on various resources like users, movies, and payments, providing a structured and efficient way to manage data interactions in the application.

## Additional Information

For further details on the API endpoints and other functionalities, refer to the project's API documentation (if available) or explore the source code in the repository.
