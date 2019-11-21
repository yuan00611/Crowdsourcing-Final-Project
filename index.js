var i = 0;
var text = [];

function labelText()
{
	var selection = window.getSelection();
	var range = selection.getRangeAt(0);
  //console.log(range);
  console.log(range.startContainer.parentElement.nodeName);
  

  //var c = String(range.startContainer);
  //console.log(c[1]);

	if (range.collapsed == false && range.startOffset != 1 && i < 5 && range.startContainer.parentElement.nodeName == "P") {
		var node = document.createElement("span");
		node.style.backgroundColor = 'yellow';
    node.setAttribute("id", i);
    //console.log(node);
		i += 1;
		range.surroundContents(node);
		//console.log(node.innerText);
		//console.log(range.commonAncestorContainer.outerText);

    l = document.getElementsByClassName("rankList");

    addOption(l, node.innerText);
    text.push(node.innerText);
    //console.log(text);
    //console.log(l.length);

/* drag div
		var d = document.createElement("div");
    d.setAttribute("class", "drag")
		d.innerText = node.innerText;
		d.style.position = "absolute";
		dragElement(d);
		document.getElementById("dragArea").appendChild(d);
*/
	}
	
}

function undo(){
  if(i >= 0){
    i = i - 1;
    last = document.getElementById(i);
    last.insertAdjacentText("afterend", text[text.length - 1]);
  
    text.pop();
    last.parentNode.removeChild(last);

    l = document.getElementsByClassName("rankList");
    deleteOption(l);
  }
}

function clearAll(){
  for(var j = i - 1; j >= 0; j--){

    last = document.getElementById(j);
    last.insertAdjacentText("afterend", text[text.length - 1]);
  
    text.pop();
    last.parentNode.removeChild(last);

    l = document.getElementsByClassName("rankList");
    deleteOption(l);
  }
  i = 0;
}

function addOption(list, text){
  for(var i = 0; i < list.length; i++){
    var index = list[i].options.length;
    list[i].options[index] = new Option(text, text);
  }
}

function deleteOption(list){
  for(var i = 0; i < list.length; i++){
    var index = list[i].options.length - 1;
    list[i].options[index] = null;
  }
  //var index = list.selectedIndex;
  //list.options[index] = null;
}










/*
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/
