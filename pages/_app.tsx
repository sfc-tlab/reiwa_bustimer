import React from "react";
import App, { Container } from "next/app";
import { Provider } from "mobx-react";  
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { initializeStore } from '../stores';

const GlobalStyle = createGlobalStyle`
`;

export default class MyApp extends App {

  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const timeTable = (await import('../static/timeTable.json')).default;
    const holidays = (await import('../static/holidays.json')).default;
    const mobxStore = initializeStore({timeTable, holidays});
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore
    }
  }

  constructor(props) {
    super(props);
    const isServer = !process.browser;
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={{ backgroundColor: "yellow" }}>
        <Container>
          <Provider store={this.mobxStore}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </Provider>
        </Container>
      </ThemeProvider>
    );
  }
}
