import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, t} = this.props

    const defaultImage = "/assets/download.jpg";

    return (
        <div className="card h-100 d-flex flex-column">
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
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-auto align-self-start">{t('news.readMore')}</a>
            </div>
        </div>
    )
  }
}
