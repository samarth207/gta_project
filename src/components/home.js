import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }
  render() {
    return (
      <div>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ minHeight: "90vh" }}
        >
          <div className="d-flex flex-row justify-content-center">
            <h1 style={{ fontWeight: "700", fontSize: "80px" }}>Welcome</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
