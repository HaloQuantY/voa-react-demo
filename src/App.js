// App.js实现页面结构和路由
import React, { Component } from "react";
import { Layout } from 'antd';
import './app.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MyHeader from './components/Header';
import List from './container/List';
import Detail from './container/Detail';
import Login from './components/Login';
import Vip from './container/Vip';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout >
          <Header className="header">
            <MyHeader />
          </Header>

          <Content className="content">
            <Login />
            <Switch>
              <Route path="/vip" component={Vip}/>
              <Route path="/detail/:id" component={Detail}/>
              <Route path="/:id?" component={List}/>
            </Switch>
          </Content>

          <Footer className="footer">Footer</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
