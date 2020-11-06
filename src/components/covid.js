import React, { Component } from 'react'
class Covid extends Component {
    
    constructor() {
        super()
        this.state = {
            vertices: [],
            edges: [],
            total_nodes: '',
            active_nodes: '',
            count: 0,
            height : 550,
            width : 1000,
            gamma: 1,
            dist : 1000,
            beta: 1
        }
        this.updateVertices = this.updateVertices.bind(this);
        this.onChangeNodes = this.onChangeNodes.bind(this);
    }

    startInterval() {
        this.timer = setInterval(this.updateVertices, 100);
    }

    onChangeNodes(e) {

        var nodes = e.target.value
        this.setState({ [e.target.name]: nodes })
        var data = []

        for (var i = 0; i < nodes; i++) {
            var num1 = Math.floor(Math.random() * this.state.width) + 50
            var num2 = Math.floor(Math.random() * this.state.height) + 50
            var node_data = {
                x: num1,
                y: num2,
                color: "green"
            }
            data.push(node_data)
        }
        this.setState({ vertices: data })
    }

    onChangeActive(e) {
        var nodes = e.target.value
        this.setState({ [e.target.name]: nodes })
        var vertices = this.state.vertices;
        for (var i = 0; i < nodes; i++) {
            vertices[i].color = "red"
        }
        this.setState({ vertices: vertices });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    OnSimulate() {

        var cnt = this.state.count;
        if (cnt % 2 === 0) {
            this.startInterval();
        }
        else {
            clearInterval(this.timer);
        }

        cnt += 1
        this.setState({ count: cnt })
    }

    updateVertices() {

        var vertices = this.state.vertices;
        for (var i = 0; i < vertices.length; i++) {
            var randm = Math.random() * 10
            var jump1 = Math.floor(randm)
            randm = Math.random() * 10
            var jump2 = Math.floor(randm)
            randm = Math.random() * 4
            randm = Math.floor(randm)
        
            if (randm === 0) {
                if (vertices[i].x < this.state.width + 50)
                    vertices[i].x += jump1
                if (vertices[i].y < this.state.height + 50)
                    vertices[i].y += jump2
            }
            else if (randm === 1) {
                if (vertices[i].x < this.state.width + 50)
                    vertices[i].x += jump1
                if (vertices[i].y > 50)
                    vertices[i].y -= jump2
            }
            else if (randm === 2) {
                if (vertices[i].x > 50)
                    vertices[i].x -= jump1
                if (vertices[i].y < this.state.height + 50)
                    vertices[i].y += jump2
            }
            else {
                if (vertices[i].x > 50)
                    vertices[i].x -= jump1
                if (vertices[i].y > 50)
                    vertices[i].y -= jump1
            }
        }

        this.setState({ vertices: vertices })
        this.updateEdges()
    }

    updateEdges() {
        var vertices = this.state.vertices;
        var edges = [];
        for (var i = 0; i < vertices.length; i++) {
            if (vertices[i].color !== "green") {
                for (var j = 0; j < vertices.length; j++) {
                    if (vertices[j].color !== "red") {
                        if (Math.abs(vertices[i].x - vertices[j].x) * Math.abs(vertices[i].x - vertices[j].x) + Math.abs(vertices[i].y - vertices[j].y) * Math.abs(vertices[i].y - vertices[j].y) <= this.state.dist) {
                            var prob = Math.floor(Math.random() * 5);
                            if(this.state.beta>=prob){
                                var edge = {
                                    v: i,
                                    u: j
                                }
                                vertices[j].color = "yellow";
                                edges.push(edge)
                            }
                        }
                    }
                }
                if (vertices[i].color === "yellow") {
                    prob = Math.floor(Math.random() * 100);
                    if (this.state.gamma > prob) {
                        vertices[i].color = "blue"
                    }
                }
            }
        }
        this.setState({ edges: edges });
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
            top : "79vh",
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

        const inputCss = {
            border: "1px solid #a2c48d",
            boxShadow: "2px 2px 3px #bfbfbf",
            height: "30px",
            width : "75%"
        }

        const {vertices} = this.state

        return (
            <div className = "covid my-2 ml-3">
                <div className = "parameter " style = {parameterCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Input parameters
                    </div>  
                    <div className="body" style={{ color: "#996560", fontSize: "17px", fontWeight: "600", padding: "20px" }}>   
                        <div className="form-group" >
                            <label > Total number of nodes</label>
                            <input
                                type="number"
                                className="form-control"
                                name="total_nodes"
                                required
                                value={this.state.total_nodes}
                                onChange={this.onChangeNodes}
                                style={inputCss}
                            />
                        </div>
                        <div className="form-group">
                            <label >Total infected nodes</label>
                            <input
                                type="number"
                                className="form-control"
                                name="active_nodes"
                                required
                                value={this.state.active_nodes}
                                onChange={(e) => this.onChangeActive(e)}
                                style={inputCss}
                            />
                        </div>
                        <div className="form-group" >
                            <label >Beta (Conversion to Susceptible)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="beta"
                                required
                                value={this.state.beta}
                                onChange={(e) => this.onChange(e)}
                                style={inputCss}
                            />
                        </div>
                        <div className="form-group">
                            <label>Gamma (Conversion to Recoverable)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="gamma"
                                required
                                value={this.state.gamma}
                                onChange={(e) => this.onChange(e)}
                                style={inputCss}
                            />
                        </div>
                        <div>
                            <button className="btn" style={{
                                backgroundColor: "#f8fcf5",
                                color: "black",
                                width: "75%",
                                fontSize: "15px",
                            }}
                                onClick={() => window.location.reload()}
                            >
                                Clear board
                            </button>
                        </div>
                        <div>
                            <button className="btn" style={{
                                backgroundColor: "#effce8",
                                color: "black",
                                width: "90%",
                                marginTop : "20px",
                                borderRadius: "0px 20px 20px 0px"
                            }}
                                onClick={() => this.OnSimulate()}
                            >
                                Simulate / Stop
                            </button>
                        </div>      
                    </div> 
                </div>
                <div className="info" style={infoCss}>
                    <div style={{ color: "#a2c48d", fontSize: "20px", textAlign: "center" }}>
                        Color assigned
                    </div>
                    <div style={{
                        width: "90%",
                        paddingLeft: "20px",
                        paddingRight : "20px",
                        color: "#733f2c",
                        fontSize : "18px",
                    }}>
                        Unexposed :  <span style = {{color : "green", fontWeight : "bold", float : "right"}}>Green</span><br/> 
                        Infected : <span style={{ color: "red", fontWeight: "bold",float: "right" }}>Red</span><br /> 
                        Susceptible : <span style={{ color: "yellow", fontWeight: "bold", float: "right" }}>Yellow</span><br /> 
                        Recovered :  <span style={{ color: "blue", fontWeight: "bold", float: "right" }}>Blue</span><br /> 
                    </div>
                </div>
                <div className = "simulator" style = {simulatorCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Simulation
                    </div>
                    <svg width="100%" height="80vh">
                        {this.state.edges ? (
                            this.state.edges.map((data, index) => (
                                <line key={`"edge"${index}`} x1={vertices[data.v].x} y1={vertices[data.v].y} x2={vertices[data.u].x} y2={vertices[data.u].y}
                                    style={{ stroke: "grey", strokeWidth: 1, zIndex: 1 }}
                                />
                            ))
                        ) : ''}
                        {vertices ? (
                            vertices.map((data, index) => (
                                <>
                                    <circle className="circle" key={`"node"${index}`} cx={data.x} cy={data.y} r="3" fill={data.color} />
                                </>
                            ))
                        ) : ''}
                    </svg>  
                </div>
            </div>
        )
    }
}
export default Covid;