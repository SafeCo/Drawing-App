
window.addEventListener("load",()=>{
    const canvas = document.querySelector("#canvas")
    const body = document.querySelector("body")
    const tools = document.querySelector("#tools")
    ctx = canvas.getContext("2d")

        canvas.height = document.body.clientHeight - tools.offsetHeight ;
        canvas.width = document.body.clientWidth;
    
    window.addEventListener("resize", function(){
        canvas.height = document.body.clientHeight - tools.offsetHeight;
        canvas.width = document.body.clientWidth;
       
    })
    
    
    
   
})


