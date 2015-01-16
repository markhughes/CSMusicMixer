/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Mark William Hughes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
 
var Interface = Interface || {};

Interface.callBacks = [];

/*
 * Shows a simple message box
 */
Interface.showMessage = function(title, content, callback, options) {
	var _messagebox = document.createElement("div");
	
	_messagebox.id = 'messageBox';
	_messagebox.className = "messageBox-" + Math.floor((Math.random() * 9999) + 1000);
	
	Interface.callBacks[_messagebox.className] = callback;
	
	var addition = '<img src="assets/images/interface_cancel.png" alt="0" onclick="Interface.callbackOMatic(\''+_messagebox.className+'\', false)" width="60"> <img src="assets/images/interface_yes.png" alt="0" onclick="Interface.callbackOMatic(\''+_messagebox.className+'\', true)" width="60">';
	
	if(options != null) {
		addition = "";
		
		if(options["cancel"]) {
			addition += '<img src="assets/images/interface_cancel.png" alt="0" onclick="Interface.callbackOMatic(\''+_messagebox.className+'\', false)" width="70"> ';
		}
		
		if(options["yes"]) {
			addition += '<img src="assets/images/interface_yes.png" alt="0" onclick="Interface.callbackOMatic(\''+_messagebox.className+'\', true)" width="70">';
		}
	}
	
	_messagebox.innerHTML = '<br><br><br><span>'+content+'</span><br><br>'+addition;
	
	document.getElementsByTagName('body')[0].appendChild(_messagebox);
	
}

/*
 * Shows a message box, with an input box
 * returns null if cancel. 
 */
Interface.showInput = function(title, content, defaultvalue, callback) {
	content += "<br><br><input type=\"text\" id=\"i_inputbox\" value=\""+defaultvalue+"\">";
	
	Interface.showMessage(title, content, function(selection) {
		if(selection) {
			var results = [];
			results['value'] =  document.getElementById("i_inputbox").value;
			if(callback != null) callback(results);
		} else {
			if(callback != null) callback(null);
		}
	});
	
	document.getElementById("i_inputbox").select();
}

/*
 * Internal callback function 
 */
Interface.callbackOMatic = function(callback_id, c) {
	if(Interface.callBacks[callback_id] != null) Interface.callBacks[callback_id](c);
	
	document.getElementByClass(callback_id).remove();
}