let mousedown = false;

document.body.addEventListener("mousedown", () => mousedown = true);
document.body.addEventListener("mouseup", () => mousedown = false);

const grid = document.createElement("div");
grid.setAttribute("id", "grid");

function setupGrid(){
    for (let i = 0; i < 16; i++) {
        let gridElementParent = document.createElement("div");
        gridElementParent.setAttribute("id", `${i}`);
        gridElementParent.classList.add("gridElementParent");
        
        for (let a = 0; a < 16; a++) {
            let gridElementChild = document.createElement("div");
            gridElementChild.setAttribute("id", `${i}.${a}`);
            gridElementChild.classList.add("gridElementChild");
            gridElementChild.addEventListener("mousedown", changeColor);
            gridElementChild.addEventListener("mouseover", changeColor);
            gridElementParent.appendChild(gridElementChild);
        }
        
        grid.appendChild(gridElementParent);
    }
}

function changeColor(e) {
    if(e.type === "mouseover" && mousedown){
        e.target.setAttribute("style", "background-color:black");
    }else if(e.type === "mousedown") {
        e.target.setAttribute("style", "background-color:black");
    }
}

setupGrid();
document.querySelector("body").appendChild(grid);