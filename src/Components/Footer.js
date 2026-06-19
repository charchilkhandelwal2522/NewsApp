import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    const { t } = this.props
    return (
      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="text-light">NewsApp</h5>
              <p className="text-white-50 mb-0">
                {t('footer.tagline')}
              </p>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <h6 className="text-light">{t('footer.quickLinks')}</h6>
              <ul className="list-unstyled">
                <li><Link className="text-light text-decoration-none" to="/">{t('nav.home')}</Link></li>
                <li><Link className="text-light text-decoration-none" to="/about">{t('nav.about')}</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6 className="text-light">{t('footer.categories')}</h6>
              <ul className="list-unstyled text-white-50 mb-0">
                <li><Link className="text-light text-decoration-none" to="/technology">{t('category.technology')}</Link></li>
                <li><Link className="text-light text-decoration-none" to="/sports">{t('category.sports')}</Link></li>
                <li><Link className="text-light text-decoration-none" to="/business">{t('category.business')}</Link></li>
                <li><Link className="text-light text-decoration-none" to="/entertainment">{t('category.entertainment')}</Link></li>
                <li><Link className="text-light text-decoration-none" to="/health">{t('category.health')}</Link></li>
                <li><Link className="text-light text-decoration-none" to="/science">{t('category.science')}</Link></li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary my-3" />
          <p className="text-center text-white-50 mb-0">
            &copy; {new Date().getFullYear()} NewsApp. {t('footer.rights')}
          </p>
        </div>
      </footer>
    )
  }
}
