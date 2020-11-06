
export function dijkstra(grid, startNode, finishNode) {

    const visitedNodesInOrder = [];

    startNode.distance = 0;
    const unvisitedNodes = [];

    for (var row of grid) {
        for (var node of row) {
            unvisitedNodes.push(node);
        }
    }

    while (!!unvisitedNodes.length) {

        unvisitedNodes.sort((nodeA, nodeB) => nodeB.distance - nodeA.distance)
        var closestNode = unvisitedNodes.pop();

        if (closestNode.isWall)
            continue;

        if (closestNode.distance === Infinity)
            return visitedNodesInOrder;

        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode)
            return visitedNodesInOrder;


        closestNode.isVisited = true;

        const { row, col } = closestNode

        if (row > 0 && !grid[row - 1][col].isVisited ) {
            grid[row - 1][col].distance = closestNode.distance + 1;
            grid[row - 1][col].previousNode = closestNode;
        }
        if (row < grid.length - 1 && !grid[row + 1][col].isVisited) {
            grid[row + 1][col].distance = closestNode.distance + 1;
            grid[row + 1][col].previousNode = closestNode;
        }
        if (col > 0 && !grid[row][col - 1].isVisited) {
            grid[row][col - 1].distance = closestNode.distance + 1;
            grid[row][col - 1].previousNode = closestNode;
        }
        if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) {
            grid[row][col + 1].distance = closestNode.distance + 1;
            grid[row][col + 1].previousNode = closestNode;
        }
    }
}

export function bfs(grid, startNode, finishNode) {

    const visitedNodesInOrder = [];

    startNode.distance = 0;
    const unvisitedNodes = [];

    unvisitedNodes.push(startNode)

    while (!!unvisitedNodes.length) {

        var closestNode = unvisitedNodes.shift();

        if (closestNode.isWall)
            continue;

        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode)
            return visitedNodesInOrder;

        closestNode.isVisited = true;

        const { row, col } = closestNode

        if (row > 0 && !grid[row - 1][col].isVisited) {
            grid[row - 1][col].isVisited = true
            grid[row - 1][col].distance = closestNode.distance + 1;
            grid[row - 1][col].previousNode = closestNode;
            unvisitedNodes.push(grid[row - 1][col])
        }
        if (row < grid.length - 1 && !grid[row + 1][col].isVisited) {
            grid[row + 1][col].isVisited = true
            grid[row + 1][col].distance = closestNode.distance + 1;
            grid[row + 1][col].previousNode = closestNode;
            unvisitedNodes.push(grid[row + 1][col])
        }
        if (col > 0 && !grid[row][col - 1].isVisited) {
            grid[row][col - 1].isVisited = true
            grid[row][col - 1].distance = closestNode.distance + 1;
            grid[row][col - 1].previousNode = closestNode;
            unvisitedNodes.push(grid[row][col - 1])
        }
        if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) {
            grid[row][col + 1].isVisited = true
            grid[row][col + 1].distance = closestNode.distance + 1;
            grid[row][col + 1].previousNode = closestNode;
            unvisitedNodes.push(grid[row][col + 1])
        }
    }
}

export function dfs(grid, startNode, finishNode) {

    const visitedNodesInOrder = [];

    startNode.distance = 0;
    const unvisitedNodes = [];

    unvisitedNodes.push(startNode)

    while (!!unvisitedNodes.length) {

        var closestNode = unvisitedNodes.pop();

        if (closestNode.isWall)
            continue;

        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode)
            return visitedNodesInOrder;

        closestNode.isVisited = true;

        const { row, col } = closestNode

        if (row > 0 && !grid[row - 1][col].isVisited) {
            grid[row - 1][col].isVisited = true
            grid[row - 1][col].distance = closestNode.distance + 1;
            grid[row - 1][col].previousNode = closestNode;
            unvisitedNodes.push(grid[row - 1][col])
        }
        if (row < grid.length - 1 && !grid[row + 1][col].isVisited) {
            grid[row + 1][col].isVisited = true
            grid[row + 1][col].distance = closestNode.distance + 1;
            grid[row + 1][col].previousNode = closestNode;
            unvisitedNodes.push(grid[row + 1][col])
        }
        if (col > 0 && !grid[row][col - 1].isVisited) {
            grid[row][col - 1].isVisited = true
            grid[row][col - 1].distance = closestNode.distance + 1;
            grid[row][col - 1].previousNode = closestNode;
            unvisitedNodes.push(grid[row][col - 1])
        }
        if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) {
            grid[row][col + 1].isVisited = true
            grid[row][col + 1].distance = closestNode.distance + 1;
            grid[row][col + 1].previousNode = closestNode;
            unvisitedNodes.push(grid[row][col + 1])
        }
    }
}



export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
