import { createClient } from 'contentful';
import contentfulEntries from 'Constants/contentfulEntries';

class ContentfulClient {
  constructor() {
    this.pClient = createClient({
      space: process.env.CONTENTFUL_SPACE,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    this.pEntries = contentfulEntries;
  }
  get client() {
    return this.pClient;
  }
  get entries() {
    return this.pEntries;
  }
  getEntry(id, query = undefined) {
    return this.pClient.getEntry(id, query);
  }
  getEntries(query = undefined) {
    return this.pClient.getEntries(query);
  }
}

export default ContentfulClient;
