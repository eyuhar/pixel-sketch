let mousedown = false;
let gridSize = document.getElementById("gridSize").value;
let gridSizeLabel = `${gridSize} x ${gridSize}`;
document.getElementById("gridSizeLabel").innerHTML = gridSizeLabel;

document.body.addEventListener("mousedown", () => mousedown = true);
document.body.addEventListener("mouseup", () => mousedown = false);


document.getElementById("gridSize").addEventListener("input", updateGridSize);

const grid = document.querySelector("#grid");

function updateGridSize(e){
    gridSize = e.target.value;
    gridSizeLabel = `${gridSize} x ${gridSize}`;
    document.getElementById("gridSizeLabel").innerHTML = gridSizeLabel;
    setupGrid(gridSize);
}

function setupGrid(gSize){
    grid.innerHTML="";
    let hw = Math.floor(800/gSize);
    for (let i = 0; i < gSize; i++) {
        let gridElementParent = document.createElement("div");
        gridElementParent.setAttribute("id", `${i}`);
        gridElementParent.classList.add("gridElementParent");
        
        for (let a = 0; a < gSize; a++) {
            let gridElementChild = document.createElement("div");
            gridElementChild.classList.add("gridElementChild");
            gridElementChild.setAttribute("id", `${i}.${a}`);
            gridElementChild.style.height = `${hw}px`;
            gridElementChild.style.width = `${hw}px`;
            gridElementChild.addEventListener("mousedown", changeColor);
            gridElementChild.addEventListener("mouseover", changeColor);
            gridElementParent.appendChild(gridElementChild);
        }
        
        grid.appendChild(gridElementParent);
    }
}

function changeColor(e) {
    if(e.type === "mouseover" && !mousedown){
        return;
    }
    e.target.style.backgroundColor = "black";
}


setupGrid(gridSize);