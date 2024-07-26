import React, { Component } from "react";
import { RotatingTriangles } from "react-loader-spinner";

export default class Loader extends Component {
  render() {
    return (
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }
}