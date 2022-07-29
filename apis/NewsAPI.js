import axios from 'axios';
import Properties from "../constants/properties";

/* News API Client */
export const api = axios.create({
    baseURL: Properties.newsAPIBaseUrl,
    timeout: Properties.defaultTimeout,
    headers: {
        'X-Api-key': Properties.newsAPIKey,
    }
});

/**
 * @apiNote A wrapper function for News API
 * @param searchText text to which the API will get related news
 * @param Promise
 */
async function getNews(searchText) {
    console.log("Getting news ...");

    const searchArea = "everything"; // valid values: everything, top-headlines,
    const sortBy = "publishedAt"; // valid values: popularity, relevancy, publishedAt

    try {
        // sources param to filter by the most famous news sources
        const sources = Properties.newsSources.join(',');

        const url = `/${searchArea}?q=${searchText || ""}&sortBy=${sortBy}&searchIn=title&sources=${sources}`;
        const response = await api.get(url);

        if (response.status === 200 && response.data?.status === "ok") {
            return response.data?.articles ?? [];
        } else {
            console.warn("No articles were found!");
            return [];
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * @apiNote searches for news related to a given search text
 * @param searchText
 * @param callback
 */
const searchNews = (searchText, callback) => {
    console.log(`searching for "${searchText}" ...`);

    getNews(searchText)
        .then(articles => callback(articles))
        .catch((e) => {
            console.error(e);
            callback(null);
        });
};

export default searchNews;