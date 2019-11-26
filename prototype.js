var i = 0;
var text = [];
var collapsed, u, answer;

var caption1 = 'A black dog is poking his head from under a desk or table, and a person is holding its red collar.';
var caption2 = 'A black dog is trying to get attention from under a desk.';
var caption3 = 'An image showing a person hand caressing a black dog.';
var caption4 = 'Black dog under the table wanting to get petted.';
var caption5 = 'I see a black dog getting his face rubbed.';

var c11 = document.getElementsByClassName("c1");
var c22 = document.getElementsByClassName("c2");
var c33 = document.getElementsByClassName("c3");
var c44 = document.getElementsByClassName("c4");
var c55 = document.getElementsByClassName("c5");

var c;
for (c=0;c<c11.length;c++){
  c11[c].innerHTML = caption1;
  c22[c].innerHTML = caption2;
  c33[c].innerHTML = caption3;
  c44[c].innerHTML = caption4;
  c55[c].innerHTML = caption5;
}


function labelText()
{
	var selection = window.getSelection();
	var range = selection.getRangeAt(0);
  console.log(range.startContainer.parentElement.nodeName);
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

    document.getElementById("reportId").value = JSON.stringify(text);

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
}

function testify () {
for (u=0;u<=text.length;u++) {
      answer=text[u];
      if (answer==='dog'){
      alert('yay');
    } else {
      alert('do it again');
    }
  }
}


