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

String.prototype.repeat = function(i) {
	var result = "", value = this.valueOf().toString();
	var at = 1;
	
    while (i > 0) {
    	// running twice as a quick and dirty fix
    	// TODO: make this replace every and all %i%'s no matter
    	//       the amount..
		result += value.replace("%i%", at).replace("%i%", at);
		i--; at++;
	}
	
	return result;
};

Document.prototype.getElementByClass = function(nameOfClass) {
	var elems = document.getElementsByTagName('*'), i;
	for (i in elems) {
		if((" " + elems[i].className + " ").indexOf(" " + nameOfClass + " ") > -1) {
			return elems[i];
		}
	}
};

String.prototype.replaceAll = function(find, replace) { 
	return this.valueOf().toString().replace(new RegExp(find, 'g'), replace);
};

Object.prototype.setSelectTo = function(value) {
	var opts = this.options;
	for(var opt, j = 0; opt = opts[j]; j++) {
		if(opt.value == value) {
			this.selectedIndex = j;
			break;
		}
	}
}

// Grabbed this out of h5utils.js to fix IE issues 
var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();