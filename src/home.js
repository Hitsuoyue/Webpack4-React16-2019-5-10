import React, { Component } from "react";
import {Button} from 'antd';
import './index.less'

export default class Home extends Component {
  render() {
    console.log(888123)
    // a=12;
    // console.log(a)
    return (
      <div>
        <Button type='primary'>button</Button>
        <button>123</button>
      </div>

    );
  }
}
