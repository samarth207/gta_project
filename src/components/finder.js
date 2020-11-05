import React, { Component } from 'react'

class Finder extends Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
    }

    render() {
        const parameterCss = {
            height: "70vh",
            border: "1px solid #a2c48d",
            boxShadow: "2px 2px 3px #bfbfbf",
            borderRadius: "10px",
            position: "fixed",
            width: "25%"
        }

        const infoCss = {
            top: "79vh",
            height: "20vh",
            border: "1px solid #a2c48d",
            boxShadow: "2px 2px 3px #bfbfbf",
            borderRadius: "10px",
            position: "fixed",
            width: "25%"
        }

        const simulatorCss = {
            minHeight: "91vh",
            border: "1px solid #a2c48d",
            boxShadow: "2px 2px 3px #bfbfbf",
            borderRadius: "10px",
            left: "27%",
            width: "72%",
            position: "fixed"
        }
        return (
            <div className = "finder my-2 ml-3">
                <div className = "parameter" style = {parameterCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Input parameters
                    </div>  
                </div>
                <div className="info" style={infoCss}>

                </div>
                <div className="simulator" style={simulatorCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Siumlation
                    </div>  
                </div>
            </div>
        )
    }
}
export default Finder;