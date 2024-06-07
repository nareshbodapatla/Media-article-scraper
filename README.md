# Medium Article Scraper

This is the backend component of the Medium Article Scraper and Viewer application. It scrapes Medium for articles related to a user-specified topic and provides an API to fetch the article details.

## Features

- Scrapes Medium for articles based on a topic.
- Extracts and returns article details: title, author, publication date, and URL.
- Provides a RESTful API with endpoints for scraping and fetching articles.

## Technologies Used

- Node.js
- Express
- Puppeteer

## Installation

### Prerequisites

- Node.js and npm installed

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/medium-scraper.git
    cd medium-scraper
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    node index.js
    ```

    The server will run at `http://localhost:3001`.

## API Endpoints

- `POST /scrape`
  - Description: Accepts a topic and initiates the scraping process.
  - Request Body: `{ "topic": "your search term" }`
  - Response: JSON array of the top 5 articles.

- `GET /articles`
  - Description: Returns the details of the scraped articles.
  - Response: JSON array of articles.

## Usage

1. Start the server (`http://localhost:3001`).
2. Use the POST `/scrape` endpoint to scrape articles based on a topic.
3. Use the GET `/articles` endpoint to retrieve the scraped articles.

## Deployment

To deploy the backend, you can use platforms like Heroku, AWS, or DigitalOcean. Follow their respective guides for deploying Node.js applications.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
