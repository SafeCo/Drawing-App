
window.addEventListener("load",()=>{
    const canvas = document.querySelector("#canvas")
    const body = document.querySelector("body")
    const tools = document.querySelector("#tools")
    const penWidthRange = document.querySelector("#pen-width-range")
    const test = document.querySelector("#test")
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
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "red";

        ctx.lineTo(e.clientX , e.clientY - tools.offsetHeight);
        ctx.stroke();
        // ctx.beginPath()
        ctx.moveTo(e.clientX, e.clixentY - tools.offsetHeight)
    }
    canvas.addEventListener("mousedown", startPosition)
    canvas.addEventListener("mouseup", finishedPosition)
    canvas.addEventListener("mousemove", draw)

    function displayPenWidth(){
        test.innerHTML = "Pen Width: " + penWidthRange.value
    }

    penWidthRange.addEventListener("change", displayPenWidth)
    
   
})


