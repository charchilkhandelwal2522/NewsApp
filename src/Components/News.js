import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  apiKey = "a56c5a710d3f48469b4e5511c5a514c5"
  pageSize = 9

  constructor() {
    super();
    this.state = {
      articles: [],
      category: "",
      searchedCategory: "general",
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    this.fetchNews("general");
  }

  fetchNews = async (category, page = 1) => {
    this.setState({ loading: true });
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=a56c5a710d3f48469b4e5511c5a514c5&page=2
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=9&apiKey=${this.apiKey}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles || [],
      page,
      totalResults: parseData.totalResults,
      searchedCategory: category,
      loading: false
    });
  }

  handlePageChange = (page) => {
    this.fetchNews(
      this.state.searchedCategory,
      page
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleChange = (e) => {
    this.setState({ category: e.target.value });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const category = this.state.category.trim().toLowerCase();
    if (category) {
      this.fetchNews(category);
    }
  }

  render() {
    const { t } = this.props
    const { articles, page, loading, totalResults } = this.state;
    const pageCount = Math.ceil(totalResults / this.pageSize);

    return (
      <div className='container my-3'>
        <h2 className='text-center my-3'>{t('news.heading')}</h2>
        <form className="row justify-content-center mb-4" onSubmit={this.handleSearch}>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder={t('news.searchPlaceholder')}
                aria-label={t('news.searchAria')}
                value={this.state.category}
                onChange={this.handleChange}
              />
              <button className="btn btn-primary" type="submit" disabled={this.state.loading}>
                {t('news.searchButton')}
              </button>
            </div>
          </div>
        </form>
        {this.state.loading ? (
          <div className="text-center">{t('news.loading')}</div>
        ) : this.state.articles.length === 0 ? (
          <div className="text-center text-muted">
            {t('news.noResultsPrefix')} "{this.state.searchedCategory}"
          </div>
        ) : (
          <>
            <div className='row'>
              {articles.map((element) => {
                return <div className='col-md-4 mb-4 d-flex' key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    t={t}
                  />
                </div>
              })}
            </div>
            {pageCount > 1 && (
              <nav aria-label={t('news.paginationAria')} className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => this.handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      {t('news.previous')}
                    </button>
                  </li>
                  {[...Array(pageCount)].map((_, index) => (
                    <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => this.handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => this.handlePageChange(page + 1)}
                      disabled={page === pageCount}
                    >
                      {t('news.next')}
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    )
  }
}
