import React, { Component }from 'react';
import axios from 'axios';

import './style.css';

class Vip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      requestDone: false
    };
  }

  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {withCredentials: true})
      .then(res => {
        const isLogin = res.data.data.login;
        this.setState({
          requestDone: true,
          content: isLogin ? 'VIP Content' : '无VIP权限'
        });
      });
  }

  render() {
    const { content, requestDone } = this.state;

    return(
      <div className="vip">
        { requestDone ? content : '获取内容中...' }
      </div>
    );
  }
}

export default Vip;