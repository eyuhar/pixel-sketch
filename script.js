const fontColor = "#0ec4d1b7";
const settingsBColor = "#3a3b3c";
const tButton = {
    toggled: false,
    buttonElement: HTMLElement
};

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
    
    if(lighten.toggled === false && shading.toggled === false && eraser.toggled === false){
        e.target.style.backgroundColor = "rgb(0,0,0)";
    }else if(lighten.toggled === true){
        light(e);
    }else if(shading.toggled === true){
        shade(e);
    }else if(eraser.toggled === true){
        erase(e);
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
        cell.style.transition = "background-color 1.5s linear";
    });

    const removeTransition = () => gridCell.forEach(cell => {
        cell.style.removeProperty("transition");
    })

    setTimeout(removeTransition, 1500);
}


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

const toggleLightenButton = document.getElementById("toggleLighten");
const lighten = Object.create(tButton);
lighten.buttonElement = toggleLightenButton;
lighten.buttonElement.addEventListener("click", toggleLighten);

//toggle Lighten tool
//change appearance of Lighten button
//untoggle Shading tool if necessary
function toggleLighten(){
    if(lighten.toggled === false){
        toggleButton(lighten);
        if(shading.toggled === true){
            untoggleButton(shading);
        }
        if(eraser.toggled === true){
            untoggleButton(eraser);
        }
    }else if(lighten.toggled === true){
        untoggleButton(lighten);
    }
}



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

const toggleShadingButton = document.getElementById("toggleShading");
const shading = Object.create(tButton);
shading.buttonElement = toggleShadingButton;
shading.buttonElement.addEventListener("click", toggleShading);

//same as toggleLighten function just for Shading tool
function toggleShading(e){
    if(shading.toggled === false){
        toggleButton(shading);

        if(lighten.toggled === true){
            untoggleButton(lighten);
        }
        if(eraser.toggled === true){
            untoggleButton(eraser);
        }
    }else if(shading.toggled === true){
        untoggleButton(shading);
    }
}

const toggleEraserButton = document.getElementById("toggleEraser");
const eraser = Object.create(tButton);
eraser.buttonElement = toggleEraserButton;
eraser.buttonElement.addEventListener("click", toggleEraser);

function toggleEraser(e){
    if(eraser.toggled === false){
        toggleButton(eraser);

        if(lighten.toggled === true){
            untoggleButton(lighten);
        }
        if(shading.toggled === true){
            untoggleButton(shading);
        }
    }else if(eraser.toggled === true){
        untoggleButton(eraser);
    }
}

function erase(e){
    e.target.style.backgroundColor = "rgb(255, 255, 255)";
}


function untoggleButton(button){
    button.toggled = false;
    button.buttonElement.style.backgroundColor = settingsBColor;
    button.buttonElement.style.color = fontColor;
}

function toggleButton(button){
    button.toggled = true;
    button.buttonElement.style.backgroundColor = fontColor;
    button.buttonElement.style.color = settingsBColor;
}

setupGrid(gridSize);