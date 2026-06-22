import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  apiKey = "a56c5a710d3f48469b4e5511c5a514c5"
  apikey = process.env.REACT_APP_API_KEY;
  
  pageSize = 9

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchCategory: '',
      searchedCategory: props.category || 'general',
      loading: false,
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
      this.fetchNews(category);
    }
  }

  fetchNews = async (category, page = 1) => {
    this.setState({ loading: true });
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: parseData.articles || [],
        page,
        totalResults: parseData.totalResults || 0,
        searchedCategory: category,
        loading: false
      });
    }
    catch(error){
      console.log(error);
      this.setState({
        loading:false,
        articles:[]
      });
    }
  }

  handlePageChange = (page) => {
    if(page < 1){
      return;
    }

    this.fetchNews(this.state.searchedCategory, page);
    window.scrollTo({top:0, behavior:'smooth'});
  }

  handleChange = (e) => {
    this.setState({ searchCategory:e.target.value });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const category = this.state.searchCategory.trim().toLowerCase();
    if(category){
      this.fetchNews(category);
    }
  }

  render() {
    const { t } = this.props
    const { articles, page, loading, totalResults, searchCategory, searchedCategory } = this.state;
    const pageCount = Math.ceil(totalResults / this.pageSize);

    return (
      <div className='container my-3 min-vh-100'>
        <h2 className='text-center my-3'>{t('news.heading')}</h2>
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
              <button className="btn btn-primary" disabled={loading}> {t('news.searchButton')}</button>
            </div>
          </div>
        </form>

        {loading ? (<div className='text-center'>{t('news.loading')}</div>) : articles.length === 0 ? (
          <div className='text-center text-muted'>{t('news.noResultsPrefix')}{' "'}{searchedCategory}{'"'}</div>
        )
        : (
          <>
            <div className='row'>
              {articles.map((element) => ( 
                <div className='col-md-4 mb-4 d-flex' key={element.url}>
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
            {pageCount > 1 && (
              <nav className='mt-4'> 
                <ul className='pagination justify-content-center'>
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => this.handlePageChange(page - 1)} disabled={page === 1}>{t('news.previous')}</button>
                  </li>
                  {[...Array(pageCount)].map((_, index) => (     
                    <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>       
                      <button className='page-link' onClick={() => this.handlePageChange(index + 1)}>{index + 1}</button>
                    </li>
                  ))}   
                  <li className={`page-item ${page === pageCount ? 'disabled' : ''}`}>     
                    <button className='page-link' onClick={() => this.handlePageChange(page + 1)} disabled={page === pageCount}>{t('news.next')}</button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    );
  }
}