

const fontColor = "#0ec4d1b7";
const settingsBColor = "rgb(38, 39, 40)";
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
            gridElementChild.setAttribute("worked-on","false");
            gridElementChild.style.height = `${hw}px`;
            gridElementChild.style.width = `${hw}px`;
            gridElementChild.style.backgroundColor = backgroundColor;
            gridElementChild.addEventListener("mousedown", changeColor);
            gridElementChild.addEventListener("mouseover", changeColor);
            gridElementParent.appendChild(gridElementChild);
        }
        
        grid.appendChild(gridElementParent);
    }
    toggleLines();
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
        e.target.style.backgroundColor = penColor;
        e.target.setAttribute("worked-on", "true");
    }else if(lighten.toggled === true){
        light(e);
        e.target.setAttribute("worked-on", "true");
    }else if(shading.toggled === true){
        shade(e);
        e.target.setAttribute("worked-on", "true");
    }else if(eraser.toggled === true){
        erase(e);
        e.target.setAttribute("worked-on", "false");
    }
}


const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clear);

//clear grid 
//change backgroundcolor of all grid cells to white
function clear(){
    const gridCell = document.querySelectorAll(".gridElementChild");
    
    gridCell.forEach(cell => {
        cell.setAttribute("worked-on", "false");
        cell.style.backgroundColor = backgroundColor;
        cell.style.transition = "background-color 1.5s linear";
    });

    const removeTransition = () => gridCell.forEach(cell => {
        cell.style.removeProperty("transition");
    })

    setTimeout(removeTransition, 1500);
}


function light(e){
    let currentColor = extractRGB(e.target.style.backgroundColor);
    
    if(currentColor[0] === 255 && currentColor[1] === 255 && currentColor[2] === 255){
        return;
    }
    
    let newColor = `rgb(${currentColor[0] + 17}, ${currentColor[1] + 17}, ${currentColor[2] + 17})`;
    e.target.style.backgroundColor = newColor;
}


const toggleLightenButton = document.getElementById("toggleLighten");
const lighten = Object.create(tButton);
lighten.buttonElement = toggleLightenButton;
lighten.buttonElement.addEventListener("click", toggleLighten);

//toggle Lighten tool
//change appearance of Lighten button
//untoggle other tools if necessary
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
    let currentColor = extractRGB(e.target.style.backgroundColor);
    
    if(currentColor[0] === 0 && currentColor[1] === 0 && currentColor[2] === 0){
        return;
    }
    
    let newColor = `rgb(${currentColor[0] - 17}, ${currentColor[1] - 17}, ${currentColor[2] - 17})`;
    e.target.style.backgroundColor = newColor;
    e.target.setAttribute("worked-on", "true");
}


const toggleShadingButton = document.getElementById("toggleShading");
const shading = Object.create(tButton);
shading.buttonElement = toggleShadingButton;
shading.buttonElement.addEventListener("click", toggleShading);

//same as toggleLighten function just for Shading tool
function toggleShading(){
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

//same as toggleLighten just for eraser tool
function toggleEraser(){
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
    e.target.style.backgroundColor = backgroundColor;
}


const toggleLinesButton = document.getElementById("toggleLines"); 
const gridLines = Object.create(tButton);
gridLines.buttonElement = toggleLinesButton;
gridLines.buttonElement.addEventListener("click", () => gridLines.toggled ? untoggleLines() : toggleLines());

//toggle on/off the grid lines
function toggleLines(){
    const cells = document.querySelectorAll(".gridElementChild");

    toggleButton(gridLines);
        
    cells.forEach(cell => {
        cell.style.border = "1px solid black";
        cell.style.margin = "-1px";
    });
}

function untoggleLines(){
    const cells = document.querySelectorAll(".gridElementChild");

    untoggleButton(gridLines);

    cells.forEach(cell => {
        cell.style.removeProperty("margin");
        cell.style.removeProperty("border");
    });    
}



//help functions for toggling tButtons
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


let penColor = "rgb(0, 0, 0)";
let backgroundColor = "rgb(255, 255, 255)";
const penColorElem = document.getElementById("penColor");
const backgroundColorElem = document.getElementById("backgroundColor");
penColorElem.addEventListener("input", setPenColor);
backgroundColorElem.addEventListener("input", setBackgroundColor);


function setPenColor(e){
    let rgb = hexToRgb(e.target.value);
    penColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function setBackgroundColor(e){
    let rgb = hexToRgb(e.target.value);
    backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const gridCell = document.querySelectorAll(".gridElementChild");
    
    gridCell.forEach(cell => {
        if(cell.getAttribute("worked-on") === "false"){
            cell.style.backgroundColor = backgroundColor;
        }
                
    });

}



function extractRGB(rgbString){
    let result = rgbString;
    result = result.slice(4, result.length - 1);
    result = result.split(",");

    return [parseInt(result[0]), parseInt(result[1]), parseInt(result[2])];
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
     ] : null;
  }


const saveButton = document.getElementById("save");

saveButton.addEventListener("click", function() {
	html2canvas(document.getElementById("grid")).then(function (canvas) {			
            let anchorTag = document.createElement("a");
			document.body.appendChild(anchorTag);
			anchorTag.download = "pixel-art.jpg";
			anchorTag.href = canvas.toDataURL();
			anchorTag.target = '_blank';
			anchorTag.click();
		});
 });


setupGrid(gridSize);
