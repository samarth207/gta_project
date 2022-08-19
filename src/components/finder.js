import React, { Component } from "react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { dijkstra, getNodesInShortestPathOrder, bfs, dfs } from "./algo";
import "./finder.css";

class Finder extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      start_node_row: 0,
      start_node_col: 0,
      finish_node_row: 24,
      finish_node_col: 40,
      algorithm: "bfs",
      dist: "Infinity",
    };
    this.OnSimulate = this.OnSimulate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
  }

  componentDidMount() {
    var grid = [];
    for (var row = 0; row < 25; row++) {
      const currentRow = [];
      for (var col = 0; col < 41; col++) {
        var node = {
          row: row,
          col: col,
          isVisited: false,
          isWall: false,
          isStart:
            row === this.state.start_node_row &&
            col === this.state.start_node_col,
          isFinish:
            row === this.state.finish_node_row &&
            col === this.state.finish_node_col,
          previousNode: null,
          distance: Infinity,
        };
        currentRow.push(node);
      }
      grid.push(currentRow);
    }
    this.setState({ grid: grid });
  }

  onChange(e) {
    var cord = parseInt(e.target.value);
    this.setState({ [e.target.name]: cord });
  }

  clearBoard() {
    window.location.reload();
  }

  createWall(r, c) {
    if (
      this.state.mouseIsPressed === true &&
      r >= 0 &&
      r < 25 &&
      c >= 0 &&
      c < 41
    ) {
      var grid = this.state.grid;
      var newGrid = grid.slice();
      var node = newGrid[r][c];
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[r][c] = newNode;
      this.setState({ grid: newGrid });
    }
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 6 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 6 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i <= nodesInShortestPathOrder.length; i++) {
      if (i === nodesInShortestPathOrder.length) {
        this.setState({ dist: nodesInShortestPathOrder[i - 1].distance });
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }, 40 * i);
      }
    }
  }

  OnSimulate() {
    const { grid } = this.state;
    const startNode =
      grid[this.state.start_node_row][this.state.start_node_col];
    const finishNode =
      grid[this.state.finish_node_row][this.state.finish_node_col];
    if (this.state.algorithm === "bfs") {
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    if (this.state.algorithm === "dfs") {
      const visitedNodesInOrder = dfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    if (this.state.algorithm === "dijkstra") {
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  render() {
    const { grid } = this.state;

    const parameterCss = {
      height: "70vh",
      border: "1px solid #a2c48d",
      boxShadow: "2px 2px 3px #bfbfbf",
      borderRadius: "10px",
      position: "fixed",
      width: "25%",
    };

    const infoCss = {
      top: "79vh",
      height: "20vh",
      border: "1px solid #a2c48d",
      boxShadow: "2px 2px 3px #bfbfbf",
      borderRadius: "10px",
      position: "fixed",
      width: "25%",
    };

    const simulatorCss = {
      minHeight: "91vh",
      border: "1px solid #a2c48d",
      boxShadow: "2px 2px 3px #bfbfbf",
      borderRadius: "10px",
      left: "27%",
      width: "72%",
      position: "fixed",
    };

    const inputCss = {
      border: "1px solid #a2c48d",
      boxShadow: "2px 2px 3px #bfbfbf",
      height: "30px",
      width: "75%",
      fontSize: "13px",
    };

    return (
      <div className="finder my-2 ml-3">
        <div className="parameter" style={parameterCss}>
          <div
            style={{
              color: "#a2c48d",
              fontSize: "22px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Input parameters
          </div>
          <div
            style={{
              color: "#996560",
              fontSize: "15px",
              fontWeight: "600",
              padding: "5px 20px 0px 20px",
            }}
          >
            <div className="form-group">
              <label> Starting node (X coordinate)</label>
              <input
                type="number"
                className="form-control"
                name="start_node_row"
                required
                value={this.state.start_node_row}
                min="0"
                onChange={this.onChange}
                style={inputCss}
              />
            </div>
            <div className="form-group">
              <label>Starting node (Y coordinate)</label>
              <input
                type="number"
                className="form-control"
                name="start_node_col"
                required
                value={this.state.start_node_col}
                min="0"
                onChange={this.onChange}
                style={inputCss}
              />
            </div>

            <div className="form-group">
              <label>Ending node (X coordinate)</label>
              <input
                type="number"
                className="form-control"
                name="finish_node_row"
                required
                value={this.state.finish_node_row}
                min="0"
                onChange={this.onChange}
                style={inputCss}
              />
            </div>
            <div className="form-group">
              <label>Ending node (Y coordinate)</label>
              <input
                type="number"
                className="form-control"
                name="finish_node_col"
                required
                value={this.state.finish_node_col}
                min="0"
                onChange={this.onChange}
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
                onChange={(e) => this.setState({ algorithm: e.target.value })}
                style={inputCss}
              >
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
                <option value="dijkstra">Dijkstra</option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <button
                className="btn"
                style={{
                  backgroundColor: "#effce8",
                  color: "black",
                  width: "90%",
                  marginTop: "10px",
                  borderRadius: "20px",
                }}
                onClick={this.clearBoard}
              >
                Clear board
              </button>

              <button
                className="btn"
                style={{
                  backgroundColor: "#effce8",
                  color: "black",
                  width: "90%",
                  marginTop: "10px",
                  marginLeft: "6px",
                  borderRadius: "20px",
                }}
                onClick={this.OnSimulate}
              >
                Simulate
              </button>
            </div>
          </div>
        </div>
        <div className="info" style={infoCss}>
          <div
            style={{
              color: "#a2c48d",
              fontSize: "25px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Result
          </div>
          <div
            style={{
              backgroundColor: "#fff8d4",
              color: "black",
              width: "90%",
              marginLeft: "10px",
              marginTop: "15px",
              padding: "5px",
              borderRadius: "20px",
              fontSize: "30px",
              color: "#733f2c",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {this.state.dist}
          </div>
        </div>
        <div className="simulator" style={simulatorCss}>
          <div
            style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center" }}
          >
            Siumlation
          </div>

          <div className="grid mx-5 my-0">
            {grid.map((row, rowIdx) => {
              return (
                <div className="row" key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isWall } = node;
                    const extraClassName =
                      row === this.state.finish_node_row &&
                      col === this.state.finish_node_col
                        ? "node-finish"
                        : row === this.state.start_node_row &&
                          col === this.state.start_node_col
                        ? "node-start"
                        : isWall
                        ? "node-wall"
                        : "";
                    return (
                      <div
                        className={`node ${extraClassName}`}
                        id={`node-${row}-${col}`}
                        key={nodeIdx}
                        onMouseEnter={() => this.createWall(row, col)}
                        onMouseDown={() =>
                          this.setState({ mouseIsPressed: true })
                        }
                        onMouseUp={() =>
                          this.setState({ mouseIsPressed: false })
                        }
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Finder;
