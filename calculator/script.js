const display = document.getElementById("total");
const buttons = document.querySelectorAll(".button");
     display.textContent="0";
     
buttons.forEach(button => {
    button.addEventListener("click",() =>{
        let value = button.textContent;
        if(value==="AC"){
            display.textContent="0";  
        }
        else if(value==="⌫"){
            display.textContent = display.textContent.slice(0,-1) || "0";
        }
        else if(value === "="){
             try {
        let expression = display.textContent
          .replace(/X/g, "*")
          .replace(/%/g, "/100");
        let result = eval(expression);
        display.textContent = result;
        let resultDisplayed = true;
      } catch {
        display.textContent = "Error";
      }
        }
        else if(["+","-","X","/","%"].includes(value)){
           if(/[+\-X/%]$/.test(display.textContent)){
            display.textContent = display.textContent.slice(0,-1)+value;
           }
           else{
            display.textContent += value;
           }
           resultDisplayed = false;
        }
        else if(value === "."){
            let lastnum =display.textContent.split(/[-+X/%]/).pop();
            if(!lastnum.includes(".")){
                display.textContent +=value;
            }
        }

        else{
            if(display.textContent==="0" || display.textContent==="Error" || resultDisplayed){
                display.textContent = value;
                resultDisplayed = false;
            }
            else{
                display.textContent +=value;
            }
        }
    })
});
