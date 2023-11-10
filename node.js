class Node{
  constructor(row,col,size){
    this.row = row;
    this.col = col;
    this.size = size;
    this.x = col*size;
    this.y = row*size;
    this.visited = false;
    this.current = false;
    this.walls = [
      {show:true,pos:{x1:this.x,y1:this.y,x2:this.x+this.size,y2:this.y}}, // top wall
      {show:true,pos:{x1:this.x+this.size,y1:this.y,x2:this.x+this.size,y2:this.y+this.size}}, // right wall
      {show:true,pos:{x1:this.x,y1:this.y+this.size,x2:this.x+this.size,y2:this.y+this.size}}, // bottom wall
      {show:true,pos:{x1:this.x,y1:this.y,x2:this.x,y2:this.y+this.size}}, // left wall
    ];
  }

  draw(ctx){
    for(let wall of this.walls){
      if(wall.show){
        ctx.beginPath();
        ctx.moveTo(wall.pos.x1,wall.pos.y1);
        ctx.strokeStyle = 'teal';
        ctx.lineWidth = 4;
        ctx.lineTo(wall.pos.x2,wall.pos.y2)
        ctx.stroke()
      }
    }
  }

  animate(ctx){
      ctx.beginPath();
      ctx.rect(this.x,this.y,this.size,this.size);
      ctx.fillStyle = this.current ? 'blue' : 'lightpink';
      ctx.fill();

  }

  getNeighbors(grid){
    const neighbors = [];
    const row = this.row;
    const col  =this.col;

    //top neighbor
    if(row-1>=0 && !grid[row-1][col].visited) neighbors.push(grid[row-1][col]);
    //right neighbor
    if(col+1<=grid[0].length-1 && !grid[row][col+1].visited) neighbors.push(grid[row][col+1]);
     //bottom neighbor
     if(row+1<=grid.length-1 && !grid[row+1][col].visited) neighbors.push(grid[row+1][col]);
     //left neighbor
    if(col-1>=0 && !grid[row][col-1].visited) neighbors.push(grid[row][col-1]);

    return neighbors;
  }

}