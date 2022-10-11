const fontColor = "#0ec4d1b7";
const settingsBColor = "#3a3b3c";


const grid = document.querySelector("#grid");
let gridSize = document.getElementById("gridSize").value;
let gridSizeLabel = `${gridSize} x ${gridSize}`;
document.getElementById("gridSizeLabel").innerHTML = gridSizeLabel;
document.getElementById("gridSize").addEventListener("input", updateGridSize);

function updateGridSize(e){
    gridSize = e.target.value;
    gridSizeLabel = `${gridSize} x ${gridSize}`;
    document.getElementById("gridSizeLabel").innerHTML = gridSizeLabel;
    setupGrid(gridSize);
}

//setup of grid with nested flexbox divs
function setupGrid(gSize){
    grid.innerHTML="";
    let hw = 800/gSize;
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
            gridElementChild.style.backgroundColor = "rgb(255, 255, 255)";
            gridElementChild.addEventListener("mousedown", changeColor);
            gridElementChild.addEventListener("mouseover", changeColor);
            gridElementParent.appendChild(gridElementChild);
        }
        
        grid.appendChild(gridElementParent);
    }
}


let mousedown = false;
document.body.addEventListener("mousedown", () => mousedown = true);
document.body.addEventListener("mouseup", () => mousedown = false);

//main function for changing of pixel colors
function changeColor(e) {
    if(e.type === "mouseover" && !mousedown){
        return;
    }
    
    if(lighten === false && shading === false){
        e.target.style.backgroundColor = "rgb(0,0,0)";
    }else if(lighten === true){
        light(e);
    }else if(shading === true){
        shade(e);
    }
}


const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clear);

//clear grid 
//change backgroundcolor of all grid cells to white
function clear(){
    const gridCell = document.querySelectorAll(".gridElementChild");
    
    gridCell.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}


let lighten = false;
const toggleLightenButton = document.getElementById("toggleLighten");
toggleLightenButton.addEventListener("click", toggleLighten);

function light(e){
    let currentColor = e.target.style.backgroundColor;
    currentColor = currentColor.slice(4, currentColor.length - 1);
    currentColor = currentColor.split(",");
    
    if(parseInt(currentColor[0]) === 255 && parseInt(currentColor[1]) === 255 && parseInt(currentColor[2]) === 255){
        return;
    }
    
    let newColor = `rgb(${parseInt(currentColor[0]) + 17}, ${parseInt(currentColor[1]) + 17}, ${parseInt(currentColor[2]) + 17})`;
    e.target.style.backgroundColor = newColor;
}

//toggle Lighten tool
//change appearance of Lighten button
//untoggle Shading tool if necessary
function toggleLighten(e){
    if(lighten === false){
        lighten = true;
        e.target.style.backgroundColor = fontColor;
        e.target.style.color = settingsBColor;
        shading = false;
        toggleShadingButton.style.backgroundColor = settingsBColor;
        toggleShadingButton.style.color = fontColor;
    }else if(lighten === true){
        lighten = false;
        e.target.style.backgroundColor = settingsBColor;
        e.target.style.color = fontColor;
    }
}


let shading = false;
const toggleShadingButton = document.getElementById("toggleShading");
toggleShadingButton.addEventListener("click", toggleShading);

function shade(e){
    let currentColor = e.target.style.backgroundColor;
    currentColor = currentColor.slice(4, currentColor.length - 1);
    currentColor = currentColor.split(",");
    
    if(parseInt(currentColor[0]) === 0 && parseInt(currentColor[1]) === 0 && parseInt(currentColor[2]) === 0){
        return;
    }
    
    let newColor = `rgb(${parseInt(currentColor[0]) - 17}, ${parseInt(currentColor[1]) - 17}, ${parseInt(currentColor[2]) - 17})`;
    e.target.style.backgroundColor = newColor;
}

//same as toggleLighten function just for Shading tool
function toggleShading(e){
    if(shading === false){
        shading = true;
        e.target.style.backgroundColor = fontColor;
        e.target.style.color = settingsBColor;
        lighten = false;
        toggleLightenButton.style.backgroundColor = settingsBColor;
        toggleLightenButton.style.color = fontColor;
    }else if(shading === true){
        shading = false;
        e.target.style.backgroundColor = settingsBColor;
        e.target.style.color = fontColor;
    }
}


setupGrid(gridSize);