import { createClient } from 'contentful';

class Contentful {
  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }
  getClient() {
    return this.client;
  }
}

export default Contentful;
