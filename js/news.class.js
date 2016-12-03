export default class {
  constructor(newsData) {
    Object.assign(this, newsData);
  }
  static getPublishDate(publishedAt) {
    return new Date(publishedAt).toLocaleString('en-US', {day: 'numeric', month: 'short', year:'numeric'});
  }
  provideTemplate(template) {
    this.template = template;
  }
}