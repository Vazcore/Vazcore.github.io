export default class {
  constructor(newsData) {
    Object.assign(this, newsData);
  }
  getPublishDate() {
    return new Date(this.publishedAt).toLocaleString('en-US', {day: 'numeric', month: 'short', year:'numeric'});
  }
}