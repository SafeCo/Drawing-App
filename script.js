
window.addEventListener("load",()=>{
    const canvas = document.querySelector("#canvas")
    const body = document.querySelector("body")
    const interface = document.querySelector("#interface")
    const penWidthRange = document.querySelector("#pen-width-range")
    const penWidthDisplay = document.querySelector("#pen-width-display")
    const widthExample = document.querySelector("#width-example")
    const toolColour = document.querySelector("#tool-colour")
    const tools = document.querySelector("#tools")
    const undoButton = document.querySelector("#undo")
    let pen = true;
    let line = false
    let square = false
    let circle = false

    let restore_array = [];
    let index = -1;

    ctx = canvas.getContext("2d")

        canvas.height = document.body.clientHeight - interface.offsetHeight ;
        canvas.width = document.body.clientWidth;

//                                                          RESIZE   !!!!!!!!!!!!!!

    
    window.addEventListener("resize", function(){
        canvas.height = document.body.clientHeight - interface.offsetHeight;
        canvas.width = document.body.clientWidth;
        for( i = 0; i < restore_array.length; i++){
            ctx.putImageData(restore_array[i],0,0);
        }
       
    })
//                                                          TOOL BUTTONS      !!!!!!!!!!!!!!
    function checkTool(e){
        let selectedTool = e.target.innerHTML
        if (selectedTool == "Pen"){
            pen = true
            line = false
            square = false
            circle = false
            e.target.style.color = 'red'
        } else if (selectedTool == "Line"){
            pen = false
            line = true
            square = false
            circle = false
            e.target.style.color = 'blue'
        } else if (selectedTool == "Square"){
            pen = false
            line = false
            square = true
            circle = false
            console.log(square)
            e.target.style.color = 'yellow'
        } else if (selectedTool == "Circle"){
            pen = false
            line = false
            square = false
            circle = true
            e.target.style.color = 'green'
        }
    }

    for( let i = 0; i < tools.children.length; i++){
        tools.children[i].addEventListener("click", checkTool)
    }
    
    

//                                                          PEN TOOL      !!!!!!!!!!!!!!

    let painting = false;

    function startPenPosition (e){
        if (!pen) return;
        painting = true;
        penDraw(e);
        
    }

    function finishedPenPosition(){
        if (!pen) return;
        painting = false;
        restore_array.push(ctx.getImageData(0,0, canvas.width, canvas.height ));
        index += 1;
        
        ctx.beginPath();
    }

    function penDraw(e){
        if (!pen) return;
        if(!painting) return;
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;

        ctx.lineTo(e.clientX , e.clientY - interface.offsetHeight);
        ctx.stroke();
        // ctx.beginPath()
        // ctx.moveTo(e.clientX, e.clixentY - interface.offsetHeight)
    }
    canvas.addEventListener("mousedown", startPenPosition)
    canvas.addEventListener("mouseup", finishedPenPosition)
    canvas.addEventListener("mousemove", penDraw)



//                                                          PEN WIDTH       !!!!!!!!!!!!!!
    function displayPenWidth(){
        penWidthDisplay.innerHTML = "Pen Width: " + penWidthRange.value
        gsap.to(widthExample, { width:penWidthRange.value, backgroundColor: toolColour.value})
    }

    penWidthRange.addEventListener("change", displayPenWidth)
    toolColour.addEventListener("change", displayPenWidth)

    
//                                                         SHAPE              !!!!!!!!!!!!!!

let isDrawShape = false;
let shapeStartPosition = {x : 0, y: 0};
let shapeEndPosition = {x:0 , y: 0}

const getShapePosition = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) {
        const {pageX, pageY} = event.touches ? event.touches[0] : event;
        const x = pageX - canvas.offsetLeft;
        const y = pageY - canvas.offsetTop;
        
        return {
        x,
        y
        } 
    
    }
    
}

const drawShape = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) { 
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;
        if (line == true){
            ctx.beginPath();
            ctx.moveTo(shapeStartPosition.x, shapeStartPosition.y);
            ctx.lineTo(shapeEndPosition.x, shapeEndPosition.y);
            ctx.stroke();
            ctx.beginPath();
        } else if (square == true){
            ctx.lineCap = "square";
            //TOP SQUARE
            ctx.beginPath();
            ctx.moveTo(shapeStartPosition.x, shapeStartPosition.y);
            ctx.lineTo(shapeEndPosition.x, shapeStartPosition.y);
            ctx.stroke();
            ctx.beginPath();

            //LEFT SQUARE
            ctx.beginPath();
            ctx.moveTo(shapeStartPosition.x, shapeStartPosition.y);
            ctx.lineTo(shapeStartPosition.x, shapeEndPosition.y);
            ctx.stroke();
            ctx.beginPath();
            
            //RIGHT SQUARE
            ctx.beginPath();
            ctx.moveTo(shapeEndPosition.x, shapeStartPosition.y);
            ctx.lineTo(shapeEndPosition.x, shapeEndPosition.y);
            ctx.stroke();
            ctx.beginPath();

            //BOTTOM SQUARE
            ctx.beginPath();
            ctx.moveTo(shapeStartPosition.x, shapeEndPosition.y);
            ctx.lineTo(shapeEndPosition.x, shapeEndPosition.y);
            ctx.stroke();
            ctx.beginPath();
            
        }else if ( circle == true){
            ctx.beginPath();
            ctx.arc(shapeStartPosition.x, shapeStartPosition.y, shapeStartPosition.y - shapeEndPosition.y, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
        }
    }
    
 }

 const shapeMouseDownListener = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) { 
        shapeStartPosition = getShapePosition(event);
        isDrawShape = true;

    };
  
 }

 const shapeMouseMoveListener = (event) => {
    if(!isDrawShape) return;
    if(pen ==true) return;
    if (!line || !square) {
        shapeEndPosition = getShapePosition(event);
        clearCanvas(event);
        drawShape(event);
    }
    
  }

  const shapeMouseupListener = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) {
        isDrawShape = false;
        restore_array.push(ctx.getImageData(0,0, canvas.width, canvas.height ));
        index += 1;
            

    }
  }

  const clearCanvas = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) {
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for( i = 0; i < restore_array.length; i++){
            ctx.putImageData(restore_array[i],0,0);
        }
    }

 }
 canvas.addEventListener('mousedown', shapeMouseDownListener);
 canvas.addEventListener('mousemove', shapeMouseMoveListener);
 canvas.addEventListener('mouseup', shapeMouseupListener);


 function undoLast (){
     index -= 1;
     restore_array.pop();
     ctx.putImageData(restore_array[index],0,0);
 }

 undoButton.addEventListener('click', undoLast)
   
})


