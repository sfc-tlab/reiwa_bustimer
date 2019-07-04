import React from 'react'
import Error from 'next/error'
import Router from 'next/router';

class Page extends React.Component {

  componentDidMount() {
    Router.push('/')  
  }

  render() {
    return null
  }
}

export default Page
