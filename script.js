
window.addEventListener("load",()=>{
    const canvas = document.querySelector("#canvas")
    const body = document.querySelector("body")
    const tools = document.querySelector("#tools")
    const penWidthRange = document.querySelector("#pen-width-range")
    const penWidthDisplay = document.querySelector("#pen-width-display")
    const penColor = document.querySelector("#pen-color")
    ctx = canvas.getContext("2d")

        canvas.height = document.body.clientHeight - tools.offsetHeight ;
        canvas.width = document.body.clientWidth;
    
    window.addEventListener("resize", function(){
        canvas.height = document.body.clientHeight - tools.offsetHeight;
        canvas.width = document.body.clientWidth;
       
    })
    
    let painting = false;

    function startPosition (e){
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
        ctx.strokeStyle = penColor.value;

        ctx.lineTo(e.clientX , e.clientY - tools.offsetHeight);
        ctx.stroke();
        // ctx.beginPath()
        ctx.moveTo(e.clientX, e.clixentY - tools.offsetHeight)
    }
    canvas.addEventListener("mousedown", startPosition)
    canvas.addEventListener("mouseup", finishedPosition)
    canvas.addEventListener("mousemove", draw)

    function displayPenWidth(){
        penWidthDisplay.innerHTML = "Pen Width: " + penWidthRange.value
        const widthExample = document.querySelector("#width-example")
        gsap.to(widthExample, { width:penWidthRange.value})
    }

    penWidthRange.addEventListener("change", displayPenWidth)
    
   
})


