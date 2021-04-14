import Error from 'next/error'
import Router from 'next/router';


class ErrorPage extends Error {
  getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  componentDidMount() {
    if (this.props.statusCode === 404) {
      Router.push('/')
    }
  }

}

export default ErrorPage
