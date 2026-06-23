import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date, source, t} = this.props

    const defaultImage = "/assets/download.jpg";

    const formattedDate = new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
        <div className="card h-100 d-flex flex-column">
          <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}><span className='badge rounded-pill bg-danger'>{source}</span></div>
            <img
              src={imgUrl || defaultImage}
              className="card-img-top"
              alt="..."
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column flex-grow-1">
            <h5 className="card-title">{title}</h5>
            <p className="card-text flex-grow-1">
              {description ? (description.length > 120 ? description.slice(0, 120) + "..." : description) : ""}
            </p>
            <p>By {author || 'Unknown'} on {formattedDate}</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-auto align-self-start">{t('news.readMore')}</a>
            </div>
        </div>
    )
  }
}
