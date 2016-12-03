import News from './news.class';

export class NewsBuilder {
  constructor() {
    this.ready = false;
  }
  addData(data) {
    this.model = data;
  }
  provideTemplate() {
    if (!this.model) return;
    let n = this.model;
    this.template = `
    <article class="card radius shadowDepth1 ${this.topic || ''}">        
        <div class="close">
          <i title="Remove" data-newstitle="${n.title}" id="hideNews">X</i>  
        </div>        

        <div class="card__image border-tlr-radius">
            ${this.topicLogo || ''}
            <img src="${n.urlToImage}" alt="image" class="imgCard border-tlr-radius">
        </div>
        <div class="card__content card__padding">
            <div class="card__meta">                
                <a href="http://www.bbc.co.uk/news" target="_blank">${n.author}</a>                
                <time>${News.getPublishDate(n.publishedAt)}</time>                
            </div>
            <article class="card__article">
                <h2><a href="${n.url}" target="_blank">${n.title}</a></h2>
                <p>${n.description}</p>
            </article>
        </div>
      </article>
    `;
    this.ready = true;
  }
  addHotLogo() {
    this.topic = 'hot';
    this.topicLogo = this.buildTopicLogo('/img/hot.png');    
    this.provideTemplate();
  }
  addSportLogo() {
    this.topic = 'sport';
    this.topicLogo = this.buildTopicLogo('/img/sport.png');    
    this.provideTemplate();
  }
  addWeatherLogo() {
    this.topic = 'weather';
    this.topicLogo = this.buildTopicLogo('/img/weather.png');    
    this.provideTemplate();
  }
  buildTopicLogo(img) {
    const topic_logo = `
      <span class="card_logo">
        <img src="${img}"/>
      </span>
    `;
    return topic_logo;
  }
  build() {
    if (this.ready === true) {
      let news = new News(this.model);
      news.provideTemplate(this.template);
      return news;
    } else {
      return null;
    }
  }
}