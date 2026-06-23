import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const MAX_API_RESULTS = 1000

export default class News extends Component {

  apiKey = "a56c5a710d3f48469b4e5511c5a514c5"
  // apikey = process.env.REACT_APP_API_KEY;

  pageSize = 9

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchCategory: '',
      searchedCategory: props.category || 'general',
      loading: true,
      loadingMore: false,
      page: 1,
      totalResults: 0
    }
  }

  componentDidMount() {
    const category = this.props.category || 'general';
    this.fetchNews(category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      const category = this.props.category || 'general';
      this.setState({ searchedCategory: category, searchCategory: '' });
      this.fetchNews(category);
    }
  }

  getCategoryLabel = (category) => {
    const { t } = this.props
    const categoryKey = `category.${category}`
    const translated = t(categoryKey)
    if (translated !== categoryKey) {
      return translated
    }
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  getPageHeading = () => {
    const { t } = this.props
    const { searchedCategory } = this.state
    if (searchedCategory === 'general') {
      return t('news.heading')
    }
    const categoryLabel = this.getCategoryLabel(searchedCategory)
    return t('news.headingFrom').replace('{{category}}', categoryLabel)
  }

  fetchNews = async (category, page = 1, append = false) => {
    if (append) {
      this.setState({ loadingMore: true });
    } else {
      this.setState({ loading: true, articles: [], page: 1 });
    }

    try {
      this.props.setProgress(0);
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;
      const response = await fetch(url);
      this.props.setProgress(30);
      const parseData = await response.json();
      this.props.setProgress(70);
      const newArticles = parseData.articles || [];
      this.setState((prevState) => ({
        articles: append ? [...prevState.articles, ...newArticles] : newArticles,
        page,
        totalResults: parseData.totalResults || 0,
        searchedCategory: category,
        loading: false,
        loadingMore: false
      }));
      this.props.setProgress(100);
    }
    catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        loadingMore: false,
        articles: append ? this.state.articles : []
      });
    }
  }

  fetchMore = () => {
    const { searchedCategory, page, loading, loadingMore, articles, totalResults } = this.state;

    if (loading || loadingMore) {
      return;
    }

    const maxFetchable = Math.min(totalResults, MAX_API_RESULTS);
    if (articles.length >= maxFetchable) {
      return;
    }

    this.fetchNews(searchedCategory, page + 1, true);
  }

  handleChange = (e) => {
    this.setState({ searchCategory: e.target.value });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const category = this.state.searchCategory.trim().toLowerCase();
    if (category) {
      this.fetchNews(category);
    }
  }

  render() {
    const { t } = this.props
    const { articles, loading, loadingMore, totalResults, searchCategory, searchedCategory } = this.state;
    const maxFetchable = Math.min(totalResults, MAX_API_RESULTS);
    const hasMore = articles.length > 0 && articles.length < maxFetchable;

    return (
      <div className='container my-3 min-vh-100'>
        <h2 className='text-center my-3'>{this.getPageHeading()}</h2>
        <form className="row justify-content-center mb-4" onSubmit={this.handleSearch}>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder={t('news.searchPlaceholder')}
                value={searchCategory}
                onChange={this.handleChange}
              />
              <button className="btn btn-primary" disabled={loading}>{t('news.searchButton')}</button>
            </div>
          </div>
        </form>

        {loading && articles.length === 0 ? (
          <div className='text-center'>{t('news.loading')}</div>
        ) : articles.length === 0 ? (
          <div className='text-center text-muted'>{t('news.noResultsPrefix')}{' "'}{searchedCategory}{'"'}</div>
        ) : (
          <InfiniteScroll
            dataLength={articles.length}
            next={this.fetchMore}
            hasMore={hasMore}
            style={{ overflow: 'visible' }}
            loader={<p className='text-center'>{t('news.loading')}</p>}
            endMessage={
              <p className='text-center text-muted my-4'>{t('news.endMessage')}</p>
            }
          >
            <div className='row'>
              {articles.map((element, index) => (
                <div className='col-md-4 mb-4 d-flex' key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    t={t}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}
