import React, {Component} from 'react'

class Game extends Component {
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
            errors: {},
            graphColourState: "blue"
        }
        this.onChangeNodes = this.onChangeNodes.bind(this)
        this.onChangeEdges = this.onChangeEdges.bind(this)
        this.vertexClick = this.vertexClick.bind(this)
        this.changeGraphColour= this.changeGraphColour.bind(this)
        this.sleep = this.sleep.bind(this)
        this.checkcolour=this.checkcolour.bind(this)
    }

    onChangeNodes(e) {
        var nodes = e.target.value
        this.setState({ [e.target.name]: nodes })
        var data = []
        var graphdata=[]
        for (var j = 0 ;j<this.state.total_nodes;j++){
            graphdata.push([])
        }
        for (var j = 0 ;j<this.state.total_nodes;j++){
            graphdata[j].push([])
        }
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
        this.setState({graph : graphdata})
        this.setState({edges : []})
    }
    checkcolour(e)
    {
        var mark=0
        console.log(this.state.graph)
        console.log(this.state.vertices)
            for (var j = 0 ;j<this.state.vertices.length;j++){
                    var current_node_colour=this.state.vertices[j].color
                    
                    for(var k=0;k<this.state.graph[j].length;k++)
                    {
                        var neigh_colour=this.state.vertices[this.state.graph[j][k]].color
                        if(current_node_colour == neigh_colour)
                        {
                            mark=1;
                            return;

                        }
                        
                    }
                    
                    
            }
            if(mark==0)
            {
                alert('Game Complete ')
                return ;
            }
    }
   async vertexClick(e)
    {
        
        var x_coord=e.target.getAttribute("cx")
        var y_coord=e.target.getAttribute("cy")
        x_coord= parseInt(x_coord)

        y_coord=parseInt(y_coord)

        await this.setState(state => {
                return state.vertices.map((item, index) => {
                    
                    if (x_coord === item.x && y_coord === item.y) {
                        item.color = this.state.changeGraphColour
                        
                        return item;
                    } 
                    else{
                        return item;
                    }
                });
            });
            this.checkcolour();
    }
    changeGraphColour(e)
    {
        
        var colour=e.target.getAttribute("value")
        this.state.changeGraphColour=colour

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

    

    startInterval() {
        this.timer = setInterval(()=>this.traceEdge(), this.state.traceSpeed);
    }

    traceEdge(){
        console.log("hi");
    }

    
    sleep = () => {
        return new Promise(resolve => setTimeout(resolve, this.state.speed))
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
                        Instructions
                    </div>
                <div style={{  fontSize: "20px", textAlign: "center" }}>
                    Colour all the nodes such that they have different colour from their neighbours
                    </div>
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
                                Play 
                            </button>
                        </div>      
                    </form> 
                </div>
                <div className="info" style={infoCss}>
                <label > Choose Colour</label>
                            <form action="" method="post">
                            <input id="redbutton" type="radio" name="radio" value="red" onClick={this.changeGraphColour} /> Red
                            <input id="bluebutton" type="radio" name="radio" value="blue" onClick={this.changeGraphColour} /> Blue
                            <input id="greenbutton" type="radio" name="radio" value="green" onClick={this.changeGraphColour}  /> Green
                            <input id="blackbutton" type="radio" name="radio" value="black" onClick={this.changeGraphColour}     /> Black
                            </form>
                </div>
                <div className="simulator" style={simulatorCss}>
                    <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}>
                        Graph Colour Game
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
                                 r="17" fill={data.color}  onClick={this.vertexClick} 
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
export default Game;