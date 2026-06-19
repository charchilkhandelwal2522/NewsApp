import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import News from './Components/News'
import About from './Components/About'
import Footer from './Components/Footer'
import en from './Locales/en.json'
import hi from './Locales/hi.json'
import es from './Locales/es.json'

const translations = { en, hi, es }

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      language: 'en'
    }
  }

  handleLanguageChange = (language) => {
    this.setState({ language })
  }

  t = (key) => {
    const active = translations[this.state.language] || translations.en
    return active[key] || translations.en[key] || key
  }

  render() {
    const { language } = this.state
    return (
      <Router>
        <Navbar
          t={this.t}
          language={language}
          onLanguageChange={this.handleLanguageChange}
        />
        <Routes>
          <Route path="/" element={<News t={this.t} />} />
          <Route path="/technology" element={<News key="technology" category="technology" t={this.t} />} />
          <Route path="/sports" element={<News key="sports" category="sports" t={this.t} />} />
          <Route path="/business" element={<News key="business" category="business" t={this.t} />} />
          <Route path="/entertainment" element={<News key="entertainment" category="entertainment" t={this.t} />} />
          <Route path="/health" element={<News key="health" category="health" t={this.t} />} />
          <Route path="/science" element={<News key="science" category="science" t={this.t} />} />
          <Route path="/about" element={<About t={this.t} />} />
        </Routes>
        <Footer t={this.t} />
      </Router>
    )
  }
}
