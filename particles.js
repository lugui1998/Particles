!function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);throw(f=new Error("Cannot find module '"+i+"'")).code="MODULE_NOT_FOUND",f}c=n[i]={exports:{}},e[i][0].call(c.exports,function(r){return o(e[i][1][r]||r)},c,c.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(require,module,exports){class Particles{static Air=0;static Dust=1;static Stone=2;static Water=3;static Metal=4;static Rust=5;static Lava=6;static Void=7;static Fire=8;static Steam=9;static getId(name){return Particles[name]}static isFluid(id){return[Particles.Water,Particles.Lava,Particles.Steam].includes(id)}static isHidden(id){return[Particles.Rust,Particles.Steam].includes(id)}}const Names=[],Colors=(Names[Particles.Air]="Air",Names[Particles.Dust]="Dust",Names[Particles.Stone]="Stone",Names[Particles.Water]="Water",Names[Particles.Metal]="Metal",Names[Particles.Rust]="Rust",Names[Particles.Lava]="Lava",Names[Particles.Void]="Void",Names[Particles.Fire]="Fire",Names[Particles.Steam]="Steam",[]),Density=(Colors[Particles.Air]=[20,20,20],Colors[Particles.Dust]=[242,189,107],Colors[Particles.Stone]=[128,128,128],Colors[Particles.Water]=[64,64,255],Colors[Particles.Metal]=[64,64,64],Colors[Particles.Rust]=[121,79,58],Colors[Particles.Lava]=[255,102,51],Colors[Particles.Void]=[0,0,0],Colors[Particles.Fire]=[255,50,50],Colors[Particles.Steam]=[204,204,204],[]),InitialState=(Density[Particles.Air]=.05,Density[Particles.Dust]=.4,Density[Particles.Stone]=.8,Density[Particles.Water]=.1,Density[Particles.Rust]=Density[Particles.Dust],Density[Particles.Lava]=.6,Density[Particles.Fire]=0,Density[Particles.Steam]=.07,[]);InitialState[Particles.Air]=[Particles.Air,0,0,0],InitialState[Particles.Dust]=[Particles.Dust,5,0,0],InitialState[Particles.Stone]=[Particles.Stone,0,0,0],InitialState[Particles.Water]=[Particles.Water,0,30,0],InitialState[Particles.Metal]=[Particles.Metal,0,0,0],InitialState[Particles.Rust]=[Particles.Rust,0,0,0],InitialState[Particles.Lava]=[Particles.Lava,0,0,0],InitialState[Particles.Void]=[Particles.Void,0,0,0],InitialState[Particles.Fire]=[Particles.Fire,0,0,0],InitialState[Particles.Steam]=[Particles.Steam,0,90,0],module.exports={Particles:Particles,Names:Names,Colors:Colors,Density:Density,InitialState:InitialState}},{}],2:[function(require,module,exports){const Tile=require("./Tile"),{Particles,Names,InitialState}=require("./Particles/Particles");module.exports=class{width=0;height=0;tileGridSize=0;physicsStartTime=0;lastFramesTimes=[];sharedBuffer=null;tiles=[];mousePrevPos={};mousePos={x:0,y:0};leftMousePressed=!1;rightMousePressed=!1;sandboxArea=null;grid=null;brush0=Particles.Dust;brush1=Particles.Air;brushSize=1;canvas;pauseState=!1;constructor(sandboxArea,tileGridSize=[4,2]){this.width=sandboxArea.offsetWidth,this.height=sandboxArea.offsetHeight,this.tileGridSize=tileGridSize,this.sandboxArea=sandboxArea,this.sharedBuffer=new SharedArrayBuffer(this.width*this.height*2*4),this.grid=new Int16Array(this.sharedBuffer);var tileWidth=Math.ceil(this.width/this.tileGridSize[0]),tileHeight=Math.ceil(this.height/this.tileGridSize[1]);let tileIndex=0,x=0;do{let endX=x+tileWidth,y=0;do{let endY=y+tileHeight;endX>this.width&&(endX=this.width),endY>this.height&&(endY=this.height),console.log(`Creating tile at [${x} ${y}] to [${endX} ${endY}] size [${endX-x} ${endY-y}]`),this.canvas=document.createElement("canvas"),this.canvas.width=endX-x,this.canvas.height=endY-y,this.canvas.style.position="absolute",this.canvas.style.left=x+"px",this.canvas.style.top=y+"px",sandboxArea.appendChild(this.canvas),this.tiles.push(new Tile(tileIndex++,this.canvas,this.sharedBuffer,x,y,endX,endY,4,this.width,this.height)),y=endY}while(y<this.height);x=endX}while(x<this.width);this.sandboxArea.oncontextmenu=e=>{e.preventDefault()},this.sandboxArea.onmousemove=this.HandleOnMouseMove.bind(this),this.sandboxArea.onmousedown=this.HandleOnMouseDown.bind(this),this.sandboxArea.onmouseup=this.HandleOnMouseUp.bind(this),this.sandboxArea.onmouseenter=this.HandleOnMouseEnter.bind(this),this.sandboxArea.onmouseleave=this.HandleOnMouseLeave.bind(this)}HandleOnMouseMove(e){this.mousePrevPos={x:this.mousePos.x,y:this.mousePos.y},this.mousePos={x:e.clientX,y:e.clientY},(this.leftMousePressed||this.rightMousePressed)&&this.brushStroke(this.mousePos,this.mousePrevPos)}HandleOnMouseDown(e){1==e.which?this.leftMousePressed=!0:3==e.which&&(this.rightMousePressed=!0),this.brushStroke(this.mousePrevPos,this.mousePos)}HandleOnMouseUp(e){1==e.which?this.leftMousePressed=!1:3==e.which&&(this.rightMousePressed=!1)}HandleOnMouseEnter(e){this.leftMousePressed=0<e.buttons,(this.leftMousePressed||this.rightMousePressed)&&(this.mousePos={x:e.clientX,y:e.clientY},this.brushStroke(this.mousePos,this.mousePos))}HandleOnMouseLeave(e){(this.leftMousePressed||this.rightMousePressed)&&this.brushStroke(this.mousePos,{x:e.clientX,y:e.clientY}),this.leftMousePressed=!1}update(){(this.leftMousePressed||this.rightMousePressed)&&this.brushStroke(this.mousePos,this.mousePrevPos),this.mousePrevPos=JSON.parse(JSON.stringify(this.mousePos));let inUpdate=!1;for(const tile of this.tiles)inUpdate|=tile.inUpdate;if(!inUpdate&&!this.pauseState){var timeNow=performance.now(),lastFrameTime=timeNow-this.physicsStartTime;this.lastFramesTimes.push(lastFrameTime),100<this.lastFramesTimes.length&&this.lastFramesTimes.shift(),this.physicsStartTime=timeNow;for(const tile of this.tiles)tile.update()}}brushStroke(startPos,endPos){if(startPos.x===endPos.x&&startPos.y===endPos.y)this.paintPixels(this.getPixelsInRadius(endPos,this.brushSize));else{startPos=this.traceLine(startPos,endPos);if(this.brushSize<=0)this.paintPixels(startPos);else for(const pixel of startPos)this.paintPixels(this.getPixelsInRadius(pixel,this.brushSize))}}paintPixels(effectedPixels){var brush0ElementState=InitialState[this.brush0],brush1ElementState=InitialState[this.brush1];for(const pixel of effectedPixels)if(!(pixel.x<0||pixel.x>=this.width||pixel.y<0||pixel.y>=this.height)){var index=this.pixelCoordsToPixelIndex(pixel.x,pixel.y);if(this.grid[index]===Particles.Air||this.brush1===Particles.Air||this.brush1===Particles.Void){let elState;elState=this.leftMousePressed&&this.rightMousePressed?.5<Math.random()?brush0ElementState:brush1ElementState:this.leftMousePressed?brush0ElementState:brush1ElementState;for(let i=0;i<4;i++)this.grid[index+i]=elState[i]}}}traceLine(startPos,endPos){const points=[];var dx=endPos.x-startPos.x,endPos=endPos.y-startPos.y,steps=Math.max(Math.abs(dx),Math.abs(endPos)),xInc=dx/steps,yInc=endPos/steps;let x=startPos.x,y=startPos.y;for(let i=0;i<steps;i++)points.push({x:Math.floor(x),y:Math.floor(y)}),x+=xInc,y+=yInc;return points}getPixelsInRadius(pixel,radius){const pixels=[];for(let x=pixel.x-radius;x<=pixel.x+radius;x++)for(let y=pixel.y-radius;y<=pixel.y+radius;y++)Math.sqrt(Math.pow(x-pixel.x,2)+Math.pow(y-pixel.y,2))<=radius&&pixels.push({x:x,y:y});return pixels}getPixelsInSquare(pixel,radius){const pixels=[];for(let x=pixel.x-radius;x<=pixel.x+radius;x++)for(let y=pixel.y-radius;y<=pixel.y+radius;y++)pixels.push({x:x,y:y});return pixels}setBrushParticle(brushId,particleId){switch(brushId){case 0:this.brush0=particleId;break;case 1:this.brush1=particleId}}getBrushParticleId(brushId){return 0==brushId?this.brush0:this.brush1}getBrushParticleName(brushId){return 0==brushId?Names[this.brush0]:Names[this.brush1]}getBrushSize(){return this.brushSize}setBrushSize(size){this.brushSize=15<size?15:size,this.brushSize=this.brushSize<0?0:this.brushSize}pixelCoordsToPixelIndex(x,y){return 4*(x+y*this.width)}pixelCoordsToTileIndex(x,y){return this.tiles.findIndex(tile=>tile.startX<=x&&tile.endX>=x&&tile.startY<=y&&tile.endY>=y)}getPhysicsFPS(){let sum=0;for(const time of this.lastFramesTimes)sum+=time;var fps=1e3/(sum/this.lastFramesTimes.length);return isNaN(fps)?0:fps}getPauseState(){return this.pauseState}togglePauseState(){this.pauseState=!this.pauseState}clear(){for(let i=0;i<this.grid.length;i++)this.grid[i]=0}terminate(){for(const tile of this.tiles)tile.terminate()}getParticleIdUnderMouse(){var index=this.pixelCoordsToPixelIndex(this.mousePos.x,this.mousePos.y);return index<0||index>=this.grid.length||void 0===this.grid[index]?Particles.Air:this.grid[index]}getCursosPos(){return this.mousePos}}},{"./Particles/Particles":1,"./Tile":3}],3:[function(require,module,exports){module.exports=class{inUpdate=!1;worker=null;tileIndex=-1;startX=0;startY=0;endX=0;endY=0;constructor(tileIndex,canvas,sharedBuffer,startX,startY,endX,endY,pixelDataSize,width,height){canvas=canvas.transferControlToOffscreen();this.tileIndex=tileIndex,this.startX=startX,this.startY=startY,this.endX=endX,this.endY=endY,this.worker=new Worker("pixelWorker.js"),this.worker.postMessage({type:"init",data:{canvas:canvas,sharedBuffer:sharedBuffer,startX:startX,startY:startY,endX:endX,endY:endY,pixelDataSize:pixelDataSize,screenWidth:width,screenHeight:height}},[canvas]),this.worker.onmessage=this.handleWorkerMessage.bind(this)}update(){this.inUpdate||(this.inUpdate=!0,this.worker.postMessage({type:"doPhysics"}))}handleWorkerMessage(e){var{type:e,data}=e.data;switch(e){case"debug":console.log(data);break;case"donePhysics":this.inUpdate=!1}}terminate(){this.worker.terminate()}}},{}],4:[function(require,module,exports){if("undefined"==typeof SharedArrayBuffer||!HTMLCanvasElement.prototype.transferControlToOffscreen)throw alert("This page cannot run on modern browsers."),new Error("Unsupported browser");const{Names,Colors,Particles}=require("./Particles/Particles"),Sandbox=require("./Sandbox"),sandboxArea=document.getElementById("sandboxArea"),coords=document.getElementById("coords"),fps=document.getElementById("fps"),pause=document.getElementById("pause"),brush=document.getElementById("brushTool"),brushMinus=document.getElementById("brushMinus"),brushPlus=document.getElementById("brushPlus"),clear=document.getElementById("clear"),elements=document.getElementById("elements"),particleName=document.getElementById("particleName"),brush0=document.getElementById("brush0"),brush1=document.getElementById("brush1");var require=sandboxArea.offsetHeight,columns=sandboxArea.offsetWidth,columns=Math.floor(columns/400),require=Math.ceil(require/1400);let sandbox=new Sandbox(sandboxArea,[columns,require]);window.addEventListener("resize",()=>{document.location.reload()}),pause.addEventListener("click",()=>{sandbox.togglePauseState()}),document.addEventListener("keydown",event=>{"Space"==event.code&&sandbox.togglePauseState()}),sandboxArea.addEventListener("wheel",event=>{var currentBrushSize=sandbox.brushSize,event=0<event.deltaY?currentBrushSize-1:currentBrushSize+1;sandbox.setBrushSize(event)}),brushMinus.addEventListener("click",()=>{var newBrushSize=sandbox.brushSize-1;sandbox.setBrushSize(newBrushSize)}),brushPlus.addEventListener("click",()=>{var newBrushSize=sandbox.brushSize+1;sandbox.setBrushSize(newBrushSize)}),clear.addEventListener("click",()=>{sandbox.clear()});for(let i=0;i<Names.length;i++)if(!Particles.isHidden(i)){const name=Names[i];var color=Colors[i];const element=document.createElement("div");element.setAttribute("id","el-"+name),element.classList.add("element"),sandbox.getBrushParticleId()===i?element.classList.add("selected"):element.classList.add("unSelected"),element.textContent=name,element.style.color=`rgb(${color[0]}, ${color[1]}, ${color[2]})`,elements.appendChild(element),element.onclick=e=>{element.classList.add("selected"),element.classList.remove("unSelected"),sandbox.setBrushParticle(0,Particles.getId(name))},element.oncontextmenu=e=>{element.classList.add("selected"),element.classList.remove("unSelected"),sandbox.setBrushParticle(1,Particles.getId(name)),e.preventDefault()}}window.requestAnimationFrame(function update(){coords.textContent=sandbox.mousePos.x+" "+sandbox.mousePos.y,brush.textContent="Brush:"+sandbox.brushSize.toString().padStart(2,"0");var particleId=sandbox.getParticleIdUnderMouse(),particleId=(particleName.textContent=""+Names[particleId],particleName.style.color=`rgb(${Colors[particleId][0]}, ${Colors[particleId][1]}, ${Colors[particleId][2]})`,document.getElementById("el-"+Names[sandbox.getBrushParticleId(0)])),selectedParticle1=document.getElementById("el-"+Names[sandbox.getBrushParticleId(1)]);brush0.style.left=particleId.offsetLeft-6+"px",brush0.style.top=particleId.offsetTop+"px",brush1.style.left=selectedParticle1.offsetLeft-6+"px",brush1.style.top=selectedParticle1.offsetTop+"px",fps.textContent="FPS:"+sandbox.getPhysicsFPS(),window.requestAnimationFrame(update)}),setInterval(()=>{sandbox.getPhysicsFPS()<65&&sandbox.update()},1),setInterval(()=>{sandbox.update()},20),setInterval(async()=>{pause.textContent=sandbox.getPauseState()?"Play":"Pause",fps.textContent=""+(0==sandbox.getPauseState()?Math.floor(sandbox.getPhysicsFPS()):"00")},100)},{"./Particles/Particles":1,"./Sandbox":2}]},{},[4]);
