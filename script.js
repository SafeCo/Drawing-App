
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
        } else if (selectedTool == "Circle"){
            pen = false
            line = false
            square = false
            circle = true
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
        ctx.moveTo(e.clientX, e.clixentY - interface.offsetHeight)
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

let drawLine = false;
    function startLinePosition(e){
        if(!line)return
        drawLine = true
        
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clixentY - interface.offsetHeight)
        
        console.log("line start ")
    }
    function finishedLinePosition(e){
        if (!line) return;
        drawLine = false
       
        console.log("line finish")
        ctx.lineTo(e.clientX , e.clientY - interface.offsetHeight);
        ctx.stroke();
        
    }

    


    canvas.addEventListener("mousedown", startLinePosition)
    canvas.addEventListener("mouseup", finishedLinePosition)
    





   
})


