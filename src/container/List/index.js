// List组件
import React, { Component, Fragment } from "react";
import { List } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './style.css';

class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  // 首次渲染组件请求列表数据
  componentDidMount() {
    const id = this.props.match.params.id;
    // 判断url中是否含有id
    const url = id ? `http://www.dell-lee.com/react/api/list.json?id=${id}` : 'http://www.dell-lee.com/react/api/list.json';
    axios.get(url)
      .then(res => {
        const data = res.data.data;
        this.setState({data});
      });
  }

  // 每次切换选项时url中id参数改变, 请求相应的列表数据
  UNSAFE_componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    const url = id ? `http://www.dell-lee.com/react/api/list.json?id=${id}` : 'http://www.dell-lee.com/react/api/list.json';
    axios.get(url)
      .then(res => {
        const data = res.data.data;
        this.setState({data});
      });
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <List
          className="list"
          bordered
          dataSource={data}
          renderItem={item => <List.Item><Link to={`/detail/${item.id}`}>{item.title}</Link></List.Item>}
        />
      </Fragment>
    );
  }
}

export default MyList;
