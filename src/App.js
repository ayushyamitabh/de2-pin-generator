
import './App.css';
import Logo from './Logo';
import Editor from './Editor';
import { Layout, Icon } from 'antd';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Downloader from './Downloader';

const { Header, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }
  render() {
    return (
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Header className="header">
          <Logo style={{ width: 64, height: 64, fill: 'white', padding: 13 }} />
          <span className="mTitle">DE-2 Board Pin Generator</span>
          <span>
            <a href="https://github.com/ayushyamitabh/de2-pin-generator" target="_blank" rel="noopener noreferrer">
              <Icon type="github" className="githubIcon" />
            </a>
          </span>
        </Header>
        <Router history={this.history}>
          <Switch>
            <Route exact path="/" render={() => <Editor history={this.history} />} />
            <Route exact path="/download" render={() => <Downloader history={this.history} />} />
          </Switch>
        </Router>
        <Footer className="mFooter">Altera DE-2 Board Pin Assignment Generator ©2019 Created by Ayushya Amitabh</Footer>
      </Layout >
    );
  }
}

export default App;
