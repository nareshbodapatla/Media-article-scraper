const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

let articles = [];

app.post('/scrape', async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://medium.com/search?q=${encodeURIComponent(topic)}`;

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('h2');

        articles = await page.evaluate(() => {
            const extractedArticles = [];
            const articleElements = document.querySelectorAll('h2');

            articleElements.forEach((articleElement, index) => {
                if (index < 5) {
                    const title = articleElement.innerText;
                    const parentAnchor = articleElement.closest('a');
                    const url = parentAnchor ? parentAnchor.href : null;

                    const authorElement = articleElement.closest('div').querySelector('div.l');
                    const authorName = authorElement ? authorElement.innerText : null;

                    const publishDateElement = articleElement.closest('div').querySelector('time');
                    const publishDate = publishDateElement ? publishDateElement.getAttribute('datetime') : null;

                    if (title && url) {
                        extractedArticles.push({ title, url, authorName, publishDate });
                    }
                }
            });

            return extractedArticles;
        });

        await browser.close();
        res.json(articles);

    } catch (error) {
        await browser.close();
        res.status(500).json({ error: 'Error scraping Medium' });
    }
});

app.get('/articles', (req, res) => {
    res.json(articles);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
