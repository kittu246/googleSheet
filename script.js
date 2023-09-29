let header = document.getElementById("head");
header.className="topRow";

// 
let main = document.getElementById("main");
let activeCellElement = document.getElementById("active-Cell");
let activeCell=null;

let activeCellState ={}
let boldButton= document.getElementById("boldButton");
let italicButton= document.getElementById("italicButton");
let underlineButton= document.getElementById("underlineButton");



for(let i =64;i<=90;i++){

    if(i==64){
        let column = document.createElement("b");
        column.innerText="S.No";
        
        header.appendChild(column);
    }

    else{
    let column = document.createElement("b");
    column.innerText = String.fromCharCode(i);
    header.appendChild(column);
    
    }
   
    
    
}




function createRowBody (rowNo){
    let mainRow = document.createElement("div");
    mainRow.className="bodyRow";

    for(let j=64;j<=90;j++){

        if(j==64){

         let rowNum = document.createElement("b");
         rowNum.innerText = rowNo;
         mainRow.appendChild(rowNum);

        }
        else{
          let cell = document.createElement("div");
          
          cell.contentEditable=true;
          
         
          let alpha = String.fromCharCode(j);
          cell.id = `${alpha}${rowNo}`
          cell.addEventListener("focus",loadIdOnFocus); // when we are passing event in parameter so need to to pass anything here in parameter
          mainRow.appendChild(cell);
          
        }
    }

    main.appendChild(mainRow);
}

for(let i=1;i<=100;i++){

    createRowBody(i);
}

function toggleButtonStyle (button,isSelected){
    if(isSelected){
        button.classList.add("active-class"); 
    }
    else{
        button.classList.remove("active-class");  
    }
}

function highlightOptionButtobOnFocus (){

    // if(activeCellState.isBold){
    //     boldButton.classList.add("active-class");
    // }
    // else{
    //     boldButton.classList.remove("active-class");  
    // }
    toggleButtonStyle(boldButton,activeCellState.isBold);

    // if(activeCellState.isItalic){
    //     italicButton.classList.add("active-class");
    // }
    // else{
    //     italicButton.classList.remove("active-class");  
    // }
    toggleButtonStyle(italicButton,activeCellState.isItalic);

    // if(activeCellState.isUnderline){
    //     underlineButton.classList.add("active-class");
    // }
    // else{
    //     underlineButton.classList.remove("active-class");  
    // }
    toggleButtonStyle(underlineButton,activeCellState.isUnderline);

    highlightAlignButton(activeCellState.isAling);


}




function loadIdOnFocus (e){ // here e is event

    
    activeCell=e.target;
    
    activeCellElement.innerText=activeCell.id;

    let computedValue = getComputedStyle(activeCell);

    activeCellState ={
    fontFamilySelected:computedValue.fontFamily,
    isBold:computedValue.fontWeight==='600', //true if 600 and false if 400
    isItalic:computedValue.fontStyle==='italic',// true if italic and false if normal
    isUnderline:computedValue.textDecoration.includes("underline"),
    isAling:computedValue.textAlign, // center and right
    selectedColor:computedValue.color,
    selectedBackgroundColor:computedValue.backgroundColor,
    fontSizeSelected:computedValue.fontSize
    }

    highlightOptionButtobOnFocus ();
    
}



   
function boldnes(boldButton) {
// 1.toggle active-class  for the button
boldButton.classList.toggle("active-class");
if(activeCell){

   if(activeCellState.isBold === false){
    
    activeCell.style.fontWeight="600";
    console.log(activeCell.style.fontWeight);
    activeCellState.isBold = true;
}  
  else{
    activeCell.style.fontWeight="400"; 
    activeCellState.isBold = false; 
  }
}

}

function italicsStyle(italicButton){
    italicButton.classList.toggle("active-class");

    if(activeCell){
       
        if(activeCellState.isItalic == false){
            activeCell.style.fontStyle ='italic';
            activeCellState.isItalic =true;
        }
        else{
            activeCell.style.fontStyle ='normal';
            activeCellState.isItalic =false; 
        }
    }

}

function italicsStyle(italicButton){
    italicButton.classList.toggle("active-class");

    if(activeCell){
       
        if(activeCellState.isItalic == false){
            activeCell.style.fontStyle ='italic';
            
        }
        else{
            activeCell.style.fontStyle ='normal';
             
        }
        activeCellState.isItalic = !activeCellState.isItalic;
    }

}

function underlinedStyle(underlineButton){

    underlineButton.classList.toggle("active-class");

    if(activeCell){

        if(activeCellState.isUnderline == false){
            activeCell.style.textDecoration="underline";
            activeCellState.isUnderline = true;
        }
        else{
            activeCell.style.textDecoration="none";
            activeCellState.isUnderline = false;

        }
    }
}


function highlightAlignButton (alignValue){

    let alignButtons = document.getElementsByClassName("text-align");
    for(let i=0;i<alignButtons.length;i++){
        if(alignButtons[i].getAttribute("data-value") == alignValue){

            alignButtons[i].classList.add("active-class");
        }
        else{
            alignButtons[i].classList.remove("active-class"); 
        }
    }
}


function textAlingButton(alignButton){

    let selectedAlignValue = alignButton.getAttribute("data-value");
    

    highlightAlignButton (selectedAlignValue);
    if(activeCell){
        activeCell.style.textAlign =  selectedAlignValue;
        activeCellState.isAling= selectedAlignValue;
    }
}

function textColor(colorSelected){

    
    if(activeCell){

       activeCell.style.color =colorSelected.value;
       activeCellState.color= colorSelected.value;
    }
}

function fillColor(backcolorSelected){

    
    if(activeCell){

       activeCell.style.backgroundColor =backcolorSelected.value;
       activeCellState.backgroundColor= backcolorSelected.value;
    }
}

function selectInputValue(fontData){
   
    if(activeCell){
      
        
    activeCell.style.fontSize = fontData.value;
    activeCellState.fontSizeSelected=fontData.value;
        
    }
}

function selectFontFamily(fontFamilySelected){
    
   
    if(activeCell){
      
        activeCell.style.fontFamily = fontFamilySelected.value;
        activeCellState.fontSizeSelected = fontFamilySelected.value;
            
    }

}




