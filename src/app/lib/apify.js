import { ApifyClient } from "apify-client";

export const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

export default client;
