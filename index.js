const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const nodeSize = 10;
const rowCount = canvas.height/nodeSize;
const colCount = canvas.width/nodeSize;
let startNode;
const history = [];
const grid = initGrid(rowCount,colCount);

genMaze();
//drawGrid(grid);
animate(history)

function genMaze(){
  const visited = [startNode];
  startNode.visited = true;

  while(visited.length>0){
    let current = visited[visited.length-1];
    history.push(current);
    const neighbors = current.getNeighbors(grid);

    if(neighbors.length>0){
      const next = neighbors[Math.floor(Math.random()*neighbors.length)];

      removeWalls(current,next);
      next.visited = true;
      visited.push(next);

    }else{
      visited.pop();
    }

  }

}

function animate(history){
  for(let i = 0;i<history.length;i++){
    setTimeout(()=>{
      if(i>0){
        history[i-1].current = false;
        history[i-1].animate(ctx);
        history[i-1].draw(ctx);
      }
      history[i].current = true;
      history[i].animate(ctx);
    },i*2)
  }
}

function initGrid(rows,cols){
  const grid = Array(rows).fill().map(()=>Array(cols).fill());

  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      const node = new Node(i,j,nodeSize);
      if(i===0 && j===0){
        startNode = node;
      }
      node.draw(ctx);
      grid[i][j] = node;
    }
  }
  return grid;
}

function removeWalls(current,next){
  if(current.row === next.row){
    //left neighbor
    if(current.col - next.col === 1){
      current.walls[3].show = false;
      next.walls[1].show = false;
    }else{//right neighbor
      current.walls[1].show = false;
      next.walls[3].show = false;
    }
  }else if(current.col === next.col){
    //top neighbor
    if(current.row-next.row === 1){
      current.walls[0].show = false;
      next.walls[2].show = false;
    }else{ // bottom neighbor
      current.walls[2].show = false;
      next.walls[0].show = false;
    }
  }
}

function drawGrid(grid){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i = 0;i<grid.length;i++){
    for(let j = 0;j<grid[0].length;j++){
      const node = grid[i][j];
      node.draw(ctx);
    }
  }
}
