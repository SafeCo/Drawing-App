
window.addEventListener("load",()=>{
    const canvas = document.querySelector("#canvas")
    const body = document.querySelector("body")
    const interface = document.querySelector("#interface")
    const penWidthRange = document.querySelector("#pen-width-range")
    const penWidthDisplay = document.querySelector("#pen-width-display")
    const widthExample = document.querySelector("#width-example")
    const toolColour = document.querySelector("#tool-colour")
    const tools = document.querySelector("#tools")
    let pen = true;
    let line = false
    let square = false
    let circle = false

//CONSIDER REMOVING EVENTLISTENERS WHEN NOT SELECTED BY TOOLS AND THEN ADDING THEM BACK WHEN IN USE FOR PERFORMANCE'S SAKE???
// EVERYTIME THE CANVAS RENDERS THE LINE IT SUBSEQUNTLY REFRESHES THE CANVAS REMOVING OTHER DRAWINGS, CONSIDER PUTTING DRAWINGS INTO AN OBJECT AND RENDERING THEM EVERYTIME THE CANVAS IS RENDERED.
    ctx = canvas.getContext("2d")

        canvas.height = document.body.clientHeight - interface.offsetHeight ;
        canvas.width = document.body.clientWidth;
    
    window.addEventListener("resize", function(){
        canvas.height = document.body.clientHeight - interface.offsetHeight;
        canvas.width = document.body.clientWidth;
       
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

    
//                                                          LINE             !!!!!!!!!!!!!!

let isDrawLine = false;
let lineStartPosition = {x : 0, y: 0};
let lineEndPostion = {x:0 , y: 0}

const getLinePosition = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) {
        const {pageX, pageY} = event.touches ? event.touches[0] : event;
        const x = pageX - canvas.offsetLeft;
        const y = pageY - canvas.offsetTop;
        
        return {
        x,
        y
        } 
        console.log("getline")
    }
    
}

const drawLine = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) { 
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;
        if (line == true){
            ctx.beginPath();
            ctx.moveTo(lineStartPosition.x, lineStartPosition.y);
            ctx.lineTo(lineEndPostion.x, lineEndPostion.y);
            ctx.stroke();
        } else if (square == true){
                    
            //TOP SQUARE
            ctx.beginPath();
            ctx.moveTo(lineStartPosition.x, lineStartPosition.y);
            ctx.lineTo(lineEndPostion.x, lineStartPosition.y);
            ctx.stroke();
            ctx.beginPath();

            //LEFT SQUARE
            ctx.beginPath();
            ctx.moveTo(lineStartPosition.x, lineStartPosition.y);
            ctx.lineTo(lineStartPosition.x, lineEndPostion.y);
            ctx.stroke();
            ctx.beginPath();
            
            //RIGHT SQUARE
            ctx.beginPath();
            ctx.moveTo(lineEndPostion.x, lineStartPosition.y);
            ctx.lineTo(lineEndPostion.x, lineEndPostion.y);
            ctx.stroke();
            ctx.beginPath();

            //BOTTOM SQUARE
            ctx.beginPath();
            ctx.moveTo(lineStartPosition.x, lineEndPostion.y);
            ctx.lineTo(lineEndPostion.x, lineEndPostion.y);
            ctx.stroke();
            
        }else if ( circle == true){
            ctx.beginPath();
            ctx.arc(lineStartPosition.x, lineStartPosition.y, lineStartPosition.y - lineEndPostion.y, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
    
 }

 const lineMouseDownListener = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) { 
        lineStartPosition = getLinePosition(event);
        isDrawLine = true;

    };
  
 }

 const lineMouseMoveListener = (event) => {
    if(!isDrawLine) return;
    if(pen ==true) return;
    if (!line || !square) {
        lineEndPostion = getLinePosition(event);
        clearCanvas();
        drawLine(event);
    }
    
  }

  const lineMouseupListener = (event) => {
    if(pen ==true) return;
    if (!line || !square || !circle) {
        isDrawLine = false;
    }
  }

  const clearCanvas = () => {
    if(pen ==true) return;
    if (!line || !square || !circle) {
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

 }
 canvas.addEventListener('mousedown', lineMouseDownListener);
 canvas.addEventListener('mousemove', lineMouseMoveListener);
 canvas.addEventListener('mouseup', lineMouseupListener);




   
})


