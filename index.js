var i = 0;
var text = [];

var imagePath = turkGetParam('image');
var caption1 = turkGetParam('cap1');
var caption2 = turkGetParam('cap2');
var caption3 = turkGetParam('cap3');
var caption4 = turkGetParam('cap4');
var caption5 = turkGetParam('cap5');

//console.log(imagePath);
//console.log(caption1);
document.getElementById("reportId").name = imagePath;

var img = document.createElement("img");
img.src = imagePath;
var imgObj = document.getElementById("capImg");
imgObj.appendChild(img);

var cList1 = document.getElementsByClassName("c1");
var cList2 = document.getElementsByClassName("c2");
var cList3 = document.getElementsByClassName("c3");
var cList4 = document.getElementsByClassName("c4");
var cList5 = document.getElementsByClassName("c5");

document.getElementById("b1").value = decodeURI(caption1);
document.getElementById("b2").value = decodeURI(caption2);
document.getElementById("b3").value = decodeURI(caption3);
document.getElementById("b4").value = decodeURI(caption4);
document.getElementById("b5").value = decodeURI(caption5);


insertCaption(cList1, caption1);
insertCaption(cList2, caption2);
insertCaption(cList3, caption3);
insertCaption(cList4, caption4);
insertCaption(cList5, caption5);


turkSetAssignmentID();

function insertCaption(list, caption){
  for(var k = 0; k < list.length; k++){
    list[k].innerHTML = decodeURI(caption);
  }
}

var deg = 0;
document.getElementById("rotateImg").onclick = function () {
  deg += 90;
  document.getElementById("capImg").style.transform = "rotate(" + deg + "deg)";
}

function labelText(list)
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

    l = document.getElementsByClassName(list);

    addOption(l, node.innerText);
    text.push(node.innerText);

    document.getElementById("reportId").value = JSON.stringify(text);
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

function undo(list){
  if(i >= 0){
    i = i - 1;
    last = document.getElementById(i);
    last.insertAdjacentText("afterend", text[text.length - 1]);
  
    text.pop();
    last.parentNode.removeChild(last);

    l = document.getElementsByClassName(list);
    deleteOption(l);
  }
}

function clearAll(list){
  for(var j = i - 1; j >= 0; j--){

    last = document.getElementById(j);
    last.insertAdjacentText("afterend", text[text.length - 1]);
  
    text.pop();
    last.parentNode.removeChild(last);

    l = document.getElementsByClassName(list);
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

var subject = false;
var radiotest = false;
var optionTest = false;

function testify(){
  for(var u = 0; u < text.length; u++){
    if (text[u].search('dog') == -1) {
      subject = false;
    }else {
      subject = true;
      break;
    }
  }
  var rList = document.getElementsByName("bestTest");
  for(var u = 0; u < rList.length; u++){
    if (rList[u].checked == true) {
      radiotest = true;
      break;
    }
  }

  l = document.getElementsByClassName("rankListTest");

  for(var v = 0; v < l.length - 1; v++){
    //console.log(l[v].value);
    for(var w = v+1; w < l.length; w++){
      if (l[v].value == l[w].value) {
        optionTest = false;
        break;
      }else {
        optionTest = true;
      }
    }
  }

  if (subject && radiotest && optionTest) {
    clearAll(l);
    alert('You have passed the test! Here comes the task.')
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $(function(){
      $("#prototype").toggle();
      $("#content").toggle();
    });
  }else {
    alert('Try again! 5 important words are needed to be highlighted. All 3 tasks need to be completed.')
  }
}



var form = document.querySelector("form");
form.onsubmit = function(e){
  e.preventDefault();

  var checked = false;
  var choice = form.elements["best"];
  for(var u = 0; u < choice.length; u++){
    if(choice[u].checked == true){
      checked = true;
      break;
    }
  }

  var optionChecked = false;

  l = document.getElementsByClassName("rankList");

  for(var v = 0; v < l.length - 1; v++){
    //console.log(l[v].value);
    for(var w = v+1; w < l.length; w++){
      if (l[v].value == l[w].value) {
        optionChecked = false;
        break;
      }else {
        optionChecked = true;
      }
    }
  }

  if (!checked && !optionChecked) {
    alert("You didn't complete all the task. Please try again.")
  }else if (!checked) {
    alert("Please select at least one best image caption and answer the reason. :) ")
  }else if (!optionChecked) {
    alert("Please select 5 important elements and rank every element differently.")
  }else {
    form.submit();
  }
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
