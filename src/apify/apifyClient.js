import { ApifyClient } from 'apify-client';

// Initialize the Apify client
const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN, // use env variable
});

export default apifyClient;