import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    const { t, language, onLanguageChange } = this.props
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>{t('nav.home')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">{t('nav.about')}</NavLink>
              </li>
            </ul>
            <select
              className="form-select form-select-sm w-auto bg-dark text-light border-secondary"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              aria-label={t('nav.selectLanguage')}
            >
              <option value="en">{t('lang.en')}</option>
              <option value="hi">{t('lang.hi')}</option>
              <option value="es">{t('lang.es')}</option>
            </select>
          </div>
        </div>
      </nav>
    )
  }
}
