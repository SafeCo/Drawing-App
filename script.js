
window.addEventListener("load",()=>{
    const canvas = document.querySelector("#canvas")
    const body = document.querySelector("body")
    const interface = document.querySelector("#interface")
    const penWidthRange = document.querySelector("#pen-width-range")
    const penWidthDisplay = document.querySelector("#pen-width-display")
    const toolColour = document.querySelector("#tool-colour")
    const tools = document.querySelector("#tools")
    let pen = true;
    let line = false
    let square = false
    let circle = false


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
        } else if (selectedTool == "Line"){
            pen = false
            line = true
            square = false
            circle = false
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



    console.log(tools.children)
    for( let i = 0; i < tools.children.length; i++){
        tools.children[i].addEventListener("click", checkTool)
    }
    
    

//                                                          PEN TOOL      !!!!!!!!!!!!!!

    let painting = false;

    function startPosition (e){
        if (!pen) return;
        painting = true;
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!painting) return;
        ctx.lineWidth = penWidthRange.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolColour.value;

        ctx.lineTo(e.clientX , e.clientY - interface.offsetHeight);
        ctx.stroke();
        // ctx.beginPath()
        ctx.moveTo(e.clientX, e.clixentY - interface.offsetHeight)
    }
    canvas.addEventListener("mousedown", startPosition)
    canvas.addEventListener("mouseup", finishedPosition)
    canvas.addEventListener("mousemove", draw)



//                                                          PEN WIDTH       !!!!!!!!!!!!!!
    function displayPenWidth(){
        penWidthDisplay.innerHTML = "Pen Width: " + penWidthRange.value
        const widthExample = document.querySelector("#width-example")
        gsap.to(widthExample, { width:penWidthRange.value})
    }

    penWidthRange.addEventListener("change", displayPenWidth)
    
//                                                          LINE             !!!!!!!!!!!!!!













   
})


