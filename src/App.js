import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar"
import Navbar from './Components/Navbar'
import News from './Components/News'
import About from './Components/About'
import Footer from './Components/Footer'
import en from './Locales/en.json'
import hi from './Locales/hi.json'
import es from './Locales/es.json'

const translations = { en, hi, es }

const DARK_MODE_KEY = 'newsapp-dark-mode'
// const DARK_MODE_KEY = process.env.REACT_APP_DARK_MODE_KEY

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      language: 'en',
      darkMode: localStorage.getItem(DARK_MODE_KEY) === 'true'
    }
  }

  componentDidMount() {
    this.applyDarkMode(this.state.darkMode)
  }

  applyDarkMode = (darkMode) => {
    document.documentElement.classList.toggle('dark-mode', darkMode)
    const themeMeta = document.querySelector('meta[name="theme-color"]')
    if (themeMeta) {
      themeMeta.setAttribute('content', darkMode ? '#121212' : '#ffffff')
    }
  }

  handleDarkModeToggle = () => {
    this.setState((prev) => {
      const darkMode = !prev.darkMode
      localStorage.setItem(DARK_MODE_KEY, darkMode)
      this.applyDarkMode(darkMode)
      return { darkMode }
    })
  }

  handleLanguageChange = (language) => {
    this.setState({ language })
  }

  t = (key) => {
    const active = translations[this.state.language] || translations.en
    return active[key] || translations.en[key] || key
  }

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    const { language, darkMode } = this.state
    return (
      <Router>
        <Navbar
          t={this.t}
          language={language}
          darkMode={darkMode}
          onLanguageChange={this.handleLanguageChange}
          onDarkModeToggle={this.handleDarkModeToggle}
        />

        <LoadingBar
          color="#f11946"
          height={2}
          progress={this.state.progress}
        />

        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} t={this.t} />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" category="technology" t={this.t} />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" category="sports" t={this.t} />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" category="business" t={this.t} />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" t={this.t} />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" category="health" t={this.t} />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" category="science" t={this.t} />} />
          <Route exact path="/about" element={<About t={this.t} />} />
        </Routes>
        <Footer t={this.t} />
      </Router>
    )
  }
}
