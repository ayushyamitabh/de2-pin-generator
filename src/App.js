
import './App.css';
import Logo from './Logo';
import Editor from './Editor';
import { Layout, Button } from 'antd';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Downloader from './Downloader';
import Ssd from './Ssd';

const { Header, Footer } = Layout;

const SSD_URL = "https://github.com/ayushyamitabh/de2-pin-generator/raw/master/SEVEN_SEGMENT_DISPLAY_DECODER.zip";

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
          <Button
            style={{ alignSelf: 'center' }}
            shape="round"
            icon="download"
            href="/ssd"
          >
            Download Seven Segment Display Decoder
          </Button>
          <Button
            style={{ alignSelf: 'center', marginLeft: 20 }}
            type="primary"
            shape="circle"
            icon="github"
            href="https://github.com/ayushyamitabh/de2-pin-generator"
          />
        </Header>
        <Router history={this.history}>
          <Switch>
            <Route exact path="/" render={() => <Editor history={this.history} />} />
            <Route exact path="/ssd" render={() => <Ssd url={SSD_URL} />} />
            <Route exact path="/download" render={() => <Downloader history={this.history} />} />
          </Switch>
        </Router>
        <Footer className="mFooter">Altera DE-2 Board Pin Assignment Generator ©2019 Created by Ayushya Amitabh</Footer>
      </Layout >
    );
  }
}

export default App;
