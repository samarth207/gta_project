import React, {Component} from 'react'

class Home  extends Component {
    constructor(){
        super()
        this.state = {
            errors : {}
        }
    }
    render() {
        return (
            <div >
                <div className="d-flex flex-column justify-content-center" style={{ minHeight: "90vh" }}>
                    <div className="d-flex flex-row justify-content-center">
                        <h1>Welcome</h1>
                    </div>
                    <div className="d-flex flex-row justify-content-center mt-5 pt-4">
                        <br />Team-
                        <button className="btn btn-primary btn-icon-text mx-3">
                            Vaibhav Mishra<br/>B17CS057
                        </button>
                        <button className="btn btn-success btn-icon-text mx-3">
                            Muzzafer ALi<br />B17CS037
                        </button>
                        <button className="btn btn-danger btn-icon-text mx-3">
                            Shreyas Mahajan<br />B17CS051
                        </button>
                    </div>
                    <div className="d-flex flex-row justify-content-center my-4 py-3">
                        <br/>By-
                        <button className="btn btn-dark btn-icon-text mx-3">
                            Dr. Aanand Mishra<br />CSE Prof
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;