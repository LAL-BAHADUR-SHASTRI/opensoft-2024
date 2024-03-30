# Backend Setup for OpenSoft 2024 Project

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

    Before running the server, ensure that you have the necessary configuration in place. The database credentials are stored in the `db.go` file. Make sure to review and update these credentials according to your database setup (e.g., database configuration, API keys, etc.).

4. **Running the Server**

    Start the backend server using the following command:

    ```bash
    go run main.go
    ```

    This will start the server on `localhost:8080` and will include the following routes:

    - **User Management**
        - `DELETE /user/`: Delete all users
        - `POST /user/sign_in`: Sign in a user
        - `GET /user/`: Get all users
        - `POST /user/sign_up`: Sign up a user
        - `PUT /user/`: Update a user
        - `GET /user/with_token`: Get user with token
        - `POST /user/bookmark`: Add a bookmark
    - **Movies**
        - `GET /movie/id/:id`: Get movie by ID
        - `GET /movie/`: Get all movies
        - `GET /movie/topimdb`: Get top IMDB movies
        - `GET /movie/genre/:genre`: Get movies by genre
        - `GET /movie/language/:language`: Get movies by language
        - `GET /movie/country/:country`: Get movies by country
        - `GET /movie/latest`: Get latest movies
        - `GET /movie/genres`: Get list of genres
        - `GET /movie/languages`: Get list of languages
        - `GET /movie/countries`: Get list of countries
        - `GET /movie/filter`: Get movies by filter
    - **Payments**
        - `DELETE /payment/`: Delete all payments
        - `POST /payment/create`: Create a payment
        - `PUT /payment/update`: Update a payment
        - `GET /payment/`: Get all payments
        - `GET /payment/user/:user_id`: Get payment by user ID
    - **Search**
        - `GET /search/semantic/:searchTerm`: Semantic search
        - `GET /search/fuzzy/:searchTerm`: Fuzzy search
        - `GET /search/autocomplete/:searchTerm`: Autocomplete search
    - **WebSockets**
        - `GET /ws`: WebSocket endpoint

5. **Security Warning**

    Be aware of the security implications of trusting all proxies. For production, configure the trusted proxies appropriately. Refer to the [official Gin documentation](https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies) for more details.

## Additional Information

For further details on the API endpoints and other functionalities, refer to the project's API documentation (if available) or explore the source code in the repository.
