import React from 'react'
import Header from '../../components/partials/Header'
import Page from '../../components/Page'
import Footer from '../../components/partials/Footer'
import Sidebar from '../../components/partials/Sidebar'

const DefaultLayout = () => {
  return (
    <div>
        <Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header />
        <div className="body flex-grow-1 px-3">
          <Page />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default DefaultLayout