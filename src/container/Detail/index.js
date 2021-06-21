import React, { Component, Fragment } from "react";
import { Card } from 'antd';
import axios from 'axios';

import './style.css';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }

  componentDidMount() {
    // 获取props的id属性 请求相应详情页面数据
    const id = this.props.match.params.id;
    const url = `http://www.dell-lee.com/react/api/detail.json?id=${id}`;
    axios.get(url)
      .then(res => {
        const data = res.data.data;
        const { content, title } = data;
        // 更新详情页数据
        this.setState({content, title});
      });
  }

  render() {
    const { title, content } = this.state;
    return (
      <Fragment>
        <Card 
          title={title}
        >
          <div className="detail" dangerouslySetInnerHTML={{__html: content}}></div>
        </Card>
      </Fragment>
    );
  }
}

export default Detail;
