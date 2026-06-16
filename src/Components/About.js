import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
  render() {
    const { t } = this.props
    return (
      <div>
        <div className="py-5 mb-5">
          <div className="container text-center">
            <h1 className="display-5 fw-bold mb-3">{t('about.title')}</h1>
            <p className="lead col-lg-8 mx-auto mb-0">
              {t('about.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mb-5">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="display-6 text-primary mb-3">📰</div>
                <h5 className="card-title">{t('about.feature1Title')}</h5>
                <p className="card-text text-muted">
                  {t('about.feature1Desc')}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="display-6 text-primary mb-3">🔍</div>
                <h5 className="card-title">{t('about.feature2Title')}</h5>
                <p className="card-text text-muted">
                  {t('about.feature2Desc')}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="display-6 text-primary mb-3">📄</div>
                <h5 className="card-title">{t('about.feature3Title')}</h5>
                <p className="card-text text-muted">
                  {t('about.feature3Desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="text-center mb-4">{t('about.learnMore')}</h3>
              <div className="accordion shadow-sm" id="aboutAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {t('about.whoWeAre')}
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#aboutAccordion"
                  >
                    <div className="accordion-body">
                      {t('about.whoWeAreDesc')}
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {t('about.whatWeOffer')}
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#aboutAccordion"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item border-0 px-0">{t('about.offer1')}</li>
                        <li className="list-group-item border-0 px-0">{t('about.offer2')}</li>
                        <li className="list-group-item border-0 px-0">{t('about.offer3')}</li>
                        <li className="list-group-item border-0 px-0">{t('about.offer4')}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      {t('about.ourMission')}
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#aboutAccordion"
                  >
                    <div className="accordion-body">
                      {t('about.ourMissionDesc')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <h4 className="mb-3">{t('about.ctaTitle')}</h4>
                <Link to="/" className="btn btn-primary btn-lg">
                  {t('about.goHome')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
