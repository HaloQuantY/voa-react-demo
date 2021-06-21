// Login组件
import React, { Component } from "react";
import { Modal, Button, Input, message } from 'antd';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false, // 登录对话框是否显示
      isLogin: false, // 登录状态
      username: '', 
      password: ''  
    }
    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
    this.handleLogoutBtnClick = this.handleLogoutBtnClick.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  // 登录按钮回调 弹出登录对话框
  handleLoginBtnClick() {
    this.setState({
      isModalVisible: true,
    });
  }

  // 退出按钮回调 设置登录状态为false
  handleLogoutBtnClick() {
    axios.get('http://www.dell-lee.com/react/api/logout.json', {withCredentials: true})
      .then(res => {
        const logout = res.data.data.logout;
        this.setState({isLogin: !logout});
        this.props.history.push('/');
      });
  }

  // 登录对话框OK按钮回调 检查输入用户名和密码,获得对应登录状态
  handleOk() {
    const { username, password } = this.state;
    const url = `http://www.dell-lee.com/react/api/login.json?user=${username}&password=${password}`;
    axios.get(url)
      .then(res => {
        const isLogin = res.data.data.login;
        if (isLogin) {
          this.setState({
            isLogin: true,
            isModalVisible: false
          });
          message.success(`${username}登陆成功`);
        } else {
          message.warning('用户名与密码不符, 请重新输入');
        }
      });
  }

  // 登录对话框取消按钮回调 设置登录对话框不可见
  handleCancel() {
    this.setState({isModalVisible: false});
  }

  // 用户名输入框回调
  handleUsernameChange(e) {
    const username = e.target.value;
    this.setState({username});
  }

  // 密码输入框回调
  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState({password});
  }

  // 检查登录状态
  checkIfLogin() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {withCredentials: true})
      .then(res => {
        const isLogin = res.data.data;
        this.setState({isLogin});
      });
  }

  componentDidMount() {
    this.checkIfLogin();
  }

  render() {
    const { isModalVisible, username, password, isLogin } = this.state;

    return (
      <div>
        { 
          isLogin ? 
          <Button 
            className="logout-button" 
            type="primary"
            onClick={this.handleLogoutBtnClick}
          >退出</Button>
          :
          <Button 
            className="login-button" 
            type="primary"
            onClick={this.handleLoginBtnClick}
          >登录</Button>
        }

        <Button 
          className="vip-button"
          type="primary"
        >
          <Link to="/vip">VIP</Link>
        </Button>

        <Modal 
          title="Basic Modal" 
          visible={isModalVisible} 
          onOk={this.handleOk} 
          onCancel={this.handleCancel}
        >
          <Input 
            className="top-input"
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={this.handleUsernameChange}
          />
          <Input 
            type="password" 
            placeholder="请输入密码"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </Modal>
      </div>
    );
  }
}

export default withRouter(Login);
