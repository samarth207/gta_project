import React, {Component} from 'react'

class Visualiser extends Component {
    constructor() {
        super()
        this.state = {
            total_nodes : '',
            total_edges : '',
            starting_node : '',
            vertices : [],
            edges : [],
            graph : [],
            height: 550,
            width: 1000,
            algorithm : '', 
            speed : 1000,
            count : 0,
            errors: {}
        }
        this.onChangeNodes = this.onChangeNodes.bind(this)
        this.onChangeEdges = this.onChangeEdges.bind(this)
        this.OnSimulate = this.OnSimulate.bind(this)
        this.sleep = this.sleep.bind(this)
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
                color: "blue",
                adjacent_nodes : []
            }
            data.push(node_data)
        }
        this.setState({ vertices: data })
        this.setState({graph : []})
        this.setState({edges : []})
    }

    onChangeEdges(e){
        var total_edges = e.target.value
        var nodes = this.state.total_nodes
        if(2*total_edges > (nodes * (nodes-1))){
            alert('Edges can not be greater than (n * n+1) / 2')
            return ;
        }
        this.setState({ [e.target.name]: total_edges })
        var set = new Set()

        var edges = []
        var data = []
        for (var j = 0 ;j<this.state.total_nodes;j++){
            data.push([])
        }
        for (var i = 0; i < total_edges; i++) {

            var num1 = Math.floor(Math.random() * this.state.total_nodes)
            var num2 = Math.floor(Math.random() * this.state.total_nodes)

            var str1 = num1.toString() + '#' + num2.toString()   
            var str2 = num2.toString() + '#' + num1.toString() 

            if(set.has(str1) || set.has(str2) || num1 === num2){
                i-=1
            }
            else{
                set.add(str1)
                data[num1].push(num2)
                data[num2].push(num1)
                edges.push({
                    u:num1,
                    v:num2,
                    color : "yellow"
                })
            }
        }

        this.setState({edges : edges})
        this.setState({graph : data})
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    onChangeStartingNode(e){
        var node = e.target.value;
        node = parseInt(node)
        if(node>=this.state.vertices.length || node<0){
            alert('starting node should be between 0 to n');
            return ;
        }
        else if (node < this.state.vertices.length && node >= 0){
            this.setState(state => {
                return state.vertices.map((item, index) => {
                    if (node === index) {
                        item.color = "black"
                        return item;
                    } else {
                        item.color = "blue"
                        return item;
                    }
                });
            });
            this.setState({starting_node : node})
        }


    }

    startInterval() {
        this.timer = setInterval(()=>this.traceEdge(), this.state.traceSpeed);
    }

    traceEdge(){
        console.log("hi");
    }

    OnSimulate(e){
        e.preventDefault()

        if(this.state.algorithm === "bfs"){
            var graph = this.state.graph;
            var check = [];
            for (var i=0;i<graph.length ; i++){
                check.push(false)
            }
            this.BFS(this.state.starting_node, this.state.graph, check)
        }
    }

    sleep = () => {
        return new Promise(resolve => setTimeout(resolve, this.state.speed))
    }

    BFS = async(x,graph,check)=>{
        var q = [];
        q.push(x);
        check[x]=true
        while(q.length>0){
            var k = q.shift()
            for(var i=0;i<graph[k].length;i++){
                if(!check[graph[k][i]]){
                    this.setState(state => {
                        return state.edges.map((item, index) => {
                            if ((item.v === k && item.u === graph[k][i]) || (item.u === k && item.v === graph[k][i])  ) {
                                item.color = "#e35417"
                                return item;
                            } else {
                                return item;
                            }
                        });
                    });
                    this.setState(state => {
                        return state.vertices.map((item, index) => {
                            if (graph[k][i] === index && item.color !== "black") {
                                item.color = "green"
                                return item;
                            } else {
                                return item;
                            }
                        });
                    });
                    await this.sleep()
                    check[graph[k][i]] = true;
                    q.push(graph[k][i]);
                }
            }
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

        const inputCss = {
            border: "1px solid #a2c48d",
            boxShadow: "2px 2px 3px #bfbfbf",
            height: "30px",
            width: "75%",
            fontSize : "13px"
        }

        const {vertices} = this.state

        return (
            <div className="visualiser my-2 ml-3">
                <div className="parameter" style={parameterCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Input parameters
                    </div>
                    <form validate="true" onSubmit={this.OnSimulate} style={{ color: "#996560", fontSize: "17px", fontWeight: "600", padding: "20px" }}>   
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
                            <label >Total number of edges</label>
                            <input
                                type="number"
                                className="form-control"
                                name="total_edges"
                                required
                                value={this.state.total_edges}
                                onChange={this.onChangeEdges}
                                style={inputCss}
                            />
                        </div>

                        <div className="form-group" >
                            <label >Starting node</label>
                            <input
                                type="number"
                                className="form-control"
                                name="starting_node"
                                required
                                value={this.starting_node}
                                min="0"
                                max={vertices.length - 1}
                                onChange={(e) => this.onChangeStartingNode(e)}
                                style={inputCss}
                            />
                        </div>

                        <div className="form-group">
                            <label>Algorithm</label>
                            <select
                                className="form-control"
                                name="algorithm"
                                required
                                value={this.state.algorithm}
                                onChange={(e)=>this.onChange(e)} 
                                style={inputCss}
                            >
                                <option value='' disabled>Select..</option>
                                <option value='dfs'>DFS</option>
                                <option value='bfs'>BFS</option>
                                <option value='Dijkstra'>Dijkstra</option>
                            </select>
                        </div>
                        <div>
                            <button className="btn" style={{
                                    backgroundColor: "#effce8",
                                    color: "black",
                                    width: "90%",
                                    marginTop : "30px",
                                    borderRadius: "0px 20px 20px 0px"
                                }}
                                type = "submit"
                            >
                                Simulate / Stop
                            </button>
                        </div>      
                    </form> 
                </div>
                <div className="info" style={infoCss}>

                </div>
                <div className="simulator" style={simulatorCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Siumlation
                    </div>
                    <svg width="100%" height="80vh">
                        {this.state.edges ? (
                            this.state.edges.map((data, index) => (
                                <line x1={vertices[data.v].x} y1={vertices[data.v].y} x2={vertices[data.u].x} y2={vertices[data.u].y}
                                    style={{ stroke: data.color, strokeWidth: 4, zIndex: 1 }}
                                />
                            ))
                        ) : ''}

                        {vertices ? (
                            vertices.map((data, index) => (
                                <>
                                <circle className="circle" key={index} cx={data.x} cy={data.y}
                                 r="17" fill={data.color}
                                />
                                    <text x={data.x - 7} y={data.y+8} fill="white" style = {{fontWeight : "bold", fontSize : "20px"}}>{index}</text>
                                </>
                            ))
                        ) : ''}

                    </svg>
                </div>
            </div>
        )
    }
}
export default Visualiser;