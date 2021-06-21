// Header组件
import React, { Component, Fragment } from "react";
import axios from 'axios';
import { Menu } from 'antd';
import { UsergroupDeleteOutlined, IdcardOutlined, DingdingOutlined, GoogleOutlined, WechatOutlined, DribbbleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import logo from './logo.png';
import './style.css';

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // icon对象,查找对应icon组件
      icon: {
        'usergroup-delete': <UsergroupDeleteOutlined />,
        'idcard': <IdcardOutlined />,
        'dingding': <DingdingOutlined />,
        'google': <GoogleOutlined />,
        'wechat': <WechatOutlined />,
        'dribbble': <DribbbleOutlined />
      },
      current: '1',
      list: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
  }

  // menu点击回调, 改变选中项
  handleClick = e => {
    this.setState({ current: e.key });
  };

  // 根据state中list数据生成item组件
  getMenuItems() {
    const { list, icon } = this.state;
    return list.map((item) => {
      return (
      <Menu.Item 
        className="menu-item"
        key={item.id}
        icon={icon[item.icon]}
      >
        <Link to={`/${item.id}`}>{item.title}</Link>
      </Menu.Item>
      )
    })
  }

  // 请求header中list数据
  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/header.json')
      .then(res => {
        const list = res.data.data;
        this.setState({list});
      });
  }

  render() {
    const current = this.state.current;

    return (
      <Fragment>
        <div className="header-logo">
          <img src={logo} alt="logo"/>
        </div>

        <Menu 
          className="header-menu"
          mode="horizontal" 
          onClick={this.handleClick} 
          selectedKeys={[current]}
        >
          {this.getMenuItems()}
        </Menu>
      </Fragment>
    );
  }
}

export default MyHeader;
