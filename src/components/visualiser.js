import React, { Component } from 'react'

class Visualiser extends Component {
    constructor() {
        super()
        this.state = {
            total_nodes: '',
            total_edges: '',
            starting_node: '',
            ending_node : '',
            isWeighted: false,
            vertices: [],
            edges: [],
            graph: [],
            height: 550,
            width: 1000,
            algorithm: '',
            speed: 3000,
            count: 0,
            id : [],
            errors: {},
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
                color: "blue"
            }
            data.push(node_data)
        }
        this.setState({ vertices: data })
    }

    onChangeEdges(e) {

        var total_edges = e.target.value
        var nodes = this.state.total_nodes
        if (2 * total_edges > (nodes * (nodes - 1))) {
            alert('Edges can not be greater than (n * n+1) / 2')
            return;
        }

        this.setState({ [e.target.name]: total_edges })
        var set = new Set()

        var edges = []
        var data = []
        for (var j = 0; j < this.state.total_nodes; j++) {
            data.push([])
        }

        for (var i = 0; i < total_edges; i++) {

            var num1 = Math.floor(Math.random() * this.state.total_nodes)
            var num2 = Math.floor(Math.random() * this.state.total_nodes)

            var str1 = num1.toString() + '#' + num2.toString()
            var str2 = num2.toString() + '#' + num1.toString()

            if (set.has(str1) || set.has(str2) || num1 === num2) {
                i -= 1
            }
            else {
                set.add(str1)
                var weight_edge = Math.floor(Math.random() * 100)
                data[num1].push({ node : num2, weight : weight_edge })
                data[num2].push({ node : num1, weight: weight_edge })
                edges.push({
                    u: num1,
                    v: num2,
                    weight: weight_edge,
                    color: "yellow"
                })
            }
        }
        this.setState({ edges: edges })
        this.setState({ graph: data })
    }

    onChangeWeighted(e) {
        var check_weighted = e.target.value === "true" ? true : false
        this.setState({ isWeighted: check_weighted })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeStartingNode(e) {
        var node = e.target.value;
        node = parseInt(node)
        if (node >= this.state.vertices.length || node < 0) {
            alert('starting node should be between 0 to n');
            return;
        }
        else if (node < this.state.vertices.length && node >= 0) {
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
            this.setState({ starting_node: node })
        }

    }

    onChangeEndingNode(e) {
        var node = e.target.value;
        node = parseInt(node)
        if (node >= this.state.vertices.length || node < 0) {
            alert('ending node should be between 0 to n');
            return;
        }
        else if (node < this.state.vertices.length && node >= 0) {
            this.setState(state => {
                return state.vertices.map((item, index) => {
                    if(item.color === "black"){
                        return item
                    }
                    else if (index === node) {
                        item.color = "brown"
                        return item;
                    } else {
                        item.color = "blue"
                        return item;
                    }
                });
            });
            this.setState({ starting_node: node })
        }

    }


    OnSimulate(e) {
        e.preventDefault()

        if (this.state.algorithm === "bfs") {
            var graph = this.state.graph;
            var check = [];
            for (var i = 0; i < graph.length; i++) {
                check.push(false)
            }
            this.BFS(this.state.starting_node, this.state.graph, check)
        }

        if (this.state.algorithm === "dfs") {
            var graph = this.state.graph;
            var check = [];
            for (var i = 0; i < graph.length; i++) {
                check.push(false)
            }
            this.DFS(this.state.starting_node, this.state.graph, check)
        }

        if (this.state.algorithm === "mst") {
            this.PrimMST()
        }

        if (this.state.algorithm === "dijkstra") {
            var graph = this.state.graph;
            var check = [];
            for (var i = 0; i < graph.length; i++) {
                check.push(false)
            }
            this.Dijkstra(this.state.starting_node, this.state.graph, check)
        }

        if (this.state.algorithm === "coloring") {
            var graph = this.state.graph;
            this.GraphColouring(graph)
        }
    }

    sleep = () => {
        return new Promise(resolve => setTimeout(resolve, this.state.speed))
    }

    BFS = async (x, graph, check) => {
        var q = [];
        q.push(x);
        check[x] = true
        while (q.length > 0) {
            var k = q.shift()
            for (var i = 0; i < graph[k].length; i++) {
                if (!check[graph[k][i].node]) {
                    await this.setState(state => {
                        return state.edges.map((item, index) => {
                            if ((item.v === k && item.u === graph[k][i].node) || (item.u === k && item.v === graph[k][i].node)) {
                                item.color = "#e35417"
                                return item;
                            } else {
                                return item;
                            }
                        });
                    });
                    await this.setState(state => {
                        return state.vertices.map((item, index) => {
                            if (graph[k][i].node === index && item.color !== "black") {
                                item.color = "green"
                                return item;
                            } else {
                                return item;
                            }
                        });
                    });
                    await this.sleep()
                    check[graph[k][i].node] = true;
                    q.push(graph[k][i].node);
                }
            }
        }
    }

    DFS = async (x, graph, check) => {
        var q = [];
        q.push(x);
        check[x] = true
        while (q.length > 0) {
            var k = q.pop()
            await this.setState(state => {
                return state.edges.map((item) => {
                    if ((item.v === k && item.u === x) || (item.v === x && item.u === k)) {
                        item.color = "#e35417"
                        return item;
                    } else {
                        return item;
                    }
                });
            });
            await this.setState(state => {
                return state.vertices.map((item, index) => {
                    if (k === index && item.color !== "black") {
                        item.color = "green"
                        return item;
                    } else {
                        return item;
                    }
                });
            });
            await this.sleep()
            for (var i = 0; i < graph[k].length; i++) {
                if (!check[graph[k][i].node]) {
                    check[graph[k][i].node] = true;
                    q.push(graph[k][i].node);
                }
            }
            x=k
        }
    }

    GraphColouring = async (graph) => {
        var color = ["CYAN", "GREEN", "RED", "YELLOW", "ORANGE", "PINK", "BLACK", "BROWN", "PURPLE", "VOILET"]
        var result = {};
        for (var i = 0; i < this.state.total_nodes; i++) {
            result[i] = "BLUE"
        }
        for (var i = 0; i < this.state.total_nodes; i++) {
            var assigned = [];
            for (var j = 0; j < this.state.graph[i].length; j++) {
                if (result[graph[i][j]] != "BLUE") {
                    assigned.push(result[graph[i][j].node]);
                }
            }
            var colorind = 0;
            for (var j = 0; j < color.length; j++) {
                var mark = 0;
                for (var k = 0; k < assigned.length; k++) {
                    if (color[j] == assigned[k]) {
                        mark = 1;
                    }
                }
                if (mark == 0) {
                    colorind = j;
                    break;
                }
            }
            result[i] = color[colorind];
            await this.setState(state => {
                return state.vertices.map((item, index) => {
                    item.color = result[index]
                    return item;
                });
            });
            await this.sleep()
        }
    }

    root = (x) => {
        var id = this.state.id 
        while (id[x] != x) {
            id[x] = id[id[x]];
            x = id[x];
        }
        this.setState({id : id})
        return x;
    }


    PrimMST = async () => {

        var edges = this.state.edges
        var sz = this.state.vertices.length

        var id = [];
        for (var i = 0; i < sz; i++) {
            id.push(i);
        }
        await this.setState({ id: id })

        for (var i = 0; i < edges.length - 1; i++) {
            for (var j = i + 1; j < edges.length; j++) {
                if (edges[i].weight > edges[j].weight) {
                    var temp = edges[i]
                    edges[i] = edges[j]
                    edges[j] = temp
                }
            }

        }
        

        for (var i = 0; i < edges.length ; i++) {

            if(i===edges.length - 1){
                await this.setState(state => {
                    return state.edges.map((item, index) => {
                        if (item.color === "yellow") {
                            item.color = "white"
                            item.weight = ''
                            return item;
                        }
                        else
                            return item
                    });
                });
                return;
            }
            var root1 = await this.root(edges[i].u) 
            var root2 = await this.root(edges[i].v)
            
            if (root1 != root2) {
                var id = this.state.id
                id[root1] = id[root2];
                await this.setState({ id: id })
                await this.setState(state => {
                    return state.edges.map((item, index) => {
                        if (item.u == edges[i].u && item.v == edges[i].v) {
                            item.color = "#e35417"
                            return item;
                        }
                        else {
                            return item;
                        }

                    });
                });
                
                await this.sleep()
            }
        }

    }

    Dijkstra = async (x, graph, check) => {
        
        var distance = [];
        var par = []
        var done = []
        for (var i = 0; i <= this.state.total_nodes; i++) {
            distance[i] = 1000;
            par[i] = -1
            done[i] = false
        }
        distance[x] = 0;

        var q = []
        q.push(x)
        check[x] = true
        var d = 5
        while (true) {
            d -= 1
            var k = q[0]
            var cnt = 0
            for (var j = 0; j < q.length; j++) {
                if (!done[q[j]]) cnt += 1
                if ((distance[q[j]] < distance[k]) && (!done[q[j]])) k = q[j]
            }
            if (cnt === 0) break
            done[k] = true
            for (var j = 0; j < q.length; j++) {
                if (q[j] === k) q.splice(j, 1)
            }
            
            this.setState(state => {
                return state.vertices.map((item, index) => {
                    if (k === index && item.color !== "black") {
                        item.color = "green"
                        return item;
                    } else {
                        return item;
                    }
                });
            });
            
            for (var i = 0; i < graph[k].length; i++) {
                if (!check[graph[k][i].node]) {
                    check[graph[k][i].node] = true
                    q.push(graph[k][i].node)
                }
                if (!done[graph[k][i].node]) {
                    if (distance[k] + graph[k][i].weight < distance[graph[k][i].node]) {
                        distance[graph[k][i].node] = distance[k] + graph[k][i].weight 
                        await this.setState(state => {
                            return state.edges.map((item, index) => {
                                if ((item.v === par[graph[k][i].node] && item.u === graph[k][i].node) || (item.u === par[graph[k][i].node] && item.v === graph[k][i].node)) {
                                    item.color = "yellow"
                                    return item;
                                } else {
                                    return item;
                                }
                            });
                        });
                        par[graph[k][i].node] = k
                        await this.setState(state => {
                            return state.edges.map((item, index) => {
                                if ((item.v === par[graph[k][i].node] && item.u === graph[k][i].node) || (item.u === par[graph[k][i].node] && item.v === graph[k][i].node)) {
                                    item.color = "#e35417"
                                    return item;
                                } else {
                                    return item;
                                }
                            });
                        });
                        await this.sleep()
                    }
                }
            }
        }

    }

    render() {
        const parameterCss = {
            height: "90vh",
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
            fontSize: "12px"
        }

        const { vertices } = this.state

        return (
            <div className="visualiser my-2 ml-3">
                <div className="parameter" style={parameterCss}>
                    <div style={{ color: "#a2c48d", fontSize: "22px", textAlign: "center" }}>
                        Input parameters
                    </div>
                    <div style={{ color: "#996560", fontSize: "17px", fontWeight: "600", paddingLeft: "25px", paddingTop : "20px" }}>
                        <div className="form-group" >
                            Total number of nodes
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

                        <div className="form-group">
                            Weighted Graph
                            <select
                                className="form-control"
                                name="isWeighted"
                                required
                                value={this.state.isWeighted}
                                onChange={(e) => this.onChangeWeighted(e)}
                                style={inputCss}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>

                            </select>
                        </div>

                        <div className="form-group" >
                            Starting node
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


                        <div className="form-group" >
                            Ending node
                            <input
                                type="number"
                                className="form-control"
                                name="ending_node"
                                required
                                value={this.ending_node}
                                min="0"
                                max={vertices.length - 1}
                                onChange={(e) => this.onChangeEndingNode(e)}
                                style={inputCss}
                            />
                        </div>

                        <div className="form-group">
                            Algorithm
                            <select
                                className="form-control"
                                name="algorithm"
                                required
                                value={this.state.algorithm}
                                onChange={(e) => this.onChange(e)}
                                style={inputCss}
                            >
                                <option value='' disabled>Select..</option>
                                <option value='dfs'>DFS</option>
                                <option value='bfs'>BFS</option>
                                <option value='mst'>MST</option>
                                <option value='dijkstra'>Dijkstra</option>
                                <option value='coloring'>Graph coloring</option>
                            </select>
                        </div>
                        <div>
                            <button className="btn" style={{
                                backgroundColor: "#fff1f0",
                                color: "black",
                                width: "75%",
                                fontSize: "13px",
                                height: "30px",

                            }}
                                onClick={() => window.location.reload()}
                            >
                                Clear board
                            </button>
                        </div>
                        <div>

                        </div>
                        <div>
                            <button className="btn" style={{
                                backgroundColor: "#effce8",
                                color: "black",
                                width: "90%",
                                borderRadius: "0px 20px 20px 0px",
                                marginTop: "20px"
                            }}
                                onClick = {this.OnSimulate}
                            >
                                Simulate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="simulator" style={simulatorCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Siumlation
                    </div>
                    <svg width="100%" height="80vh">

                        {this.state.edges ? (
                            this.state.edges.map((data, index) => (
                                <line key={`"edge"${index}`} x1={vertices[data.v].x} y1={vertices[data.v].y} x2={vertices[data.u].x} y2={vertices[data.u].y}
                                    style={{ stroke: data.color, strokeWidth: 4, zIndex: 1 }}
                                />
                            ))
                        ) : ''}

                        {this.state.isWeighted ? (
                            this.state.edges.map((data, index) => (
                                <text key={`"weight"${index}`}  x={(vertices[data.v].x + vertices[data.u].x) / 2} y={(vertices[data.v].y + vertices[data.u].y) / 2} fill="red" style={{ fontWeight : "bold",fontSize: "14px" }}>
                                    {data.weight}
                                </text>
                            ))
                        ) : ''}

                        {vertices ? (
                            vertices.map((data, index) => (
                                <circle className="circle" key={`"node"${index}`} cx={data.x} cy={data.y}
                                    r="17" fill={data.color}
                                />

                            ))
                        ) : ''}

                        {vertices ? (
                            vertices.map((data, index) => (
                                <text key={`"text"${index}`} x={data.x - 7} y={data.y + 8} fill="white" style={{ fontWeight: "bold", fontSize: "20px" }}>
                                    {index}
                                </text>
                            ))
                        ) : ''}

                    </svg>
                </div>
            </div>
        )
    }
}
export default Visualiser;