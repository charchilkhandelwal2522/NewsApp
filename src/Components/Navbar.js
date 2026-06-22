import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    const { t, language, darkMode, onLanguageChange, onDarkModeToggle } = this.props
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
                <NavLink className="nav-link" to="/technology">{t('nav.technology')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sports">{t('nav.sports')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/business">{t('nav.business')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/entertainment">{t('nav.entertainment')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/health">{t('nav.health')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/science">{t('nav.science')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">{t('nav.about')}</NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={onDarkModeToggle}
                aria-label={darkMode ? t('nav.lightMode') : t('nav.darkMode')}
                title={darkMode ? t('nav.lightMode') : t('nav.darkMode')}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
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
        </div>
      </nav>
    )
  }
}
