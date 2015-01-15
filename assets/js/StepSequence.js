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
 
var StepSequence = StepSequence || {};

StepSequence._timers = [];

StepSequence._set = [];
StepSequence.timeLine = null;

StepSequence.objCounts = 0;
StepSequence.objs = [];

StepSequence.gc = function() {
	StepSequence.objs = [];
	StepSequence.objCounts = 0;
}

StepSequence.set = function(set) {
	this._set = set;
}

StepSequence.playRow = function(row) {
	// Ensure this row exists! 
	if(this._set[row] == null) return;
	
	StepSequence.playPointer(row, 0);
}


StepSequence.playPointer = function(row, at) {
	console.log(row + ":  [  play pointer start  ]");
	console.log(row + ": current step is " + at + "/" + (this._set[row].length-1));
	console.log(row + ": full row is " + this._set[row]);
	
	// Ensure there is a step here
	if(this._set[row][at] != "_") {
		// Play it! 
		console.log(row + ": step is not blank, playing ");
		
		StepSequence.objs[StepSequence.objCounts] = Mixer._collection_sounds[Mixer.getSample(row)].cloneNode(true);
		
		//StepSequence.objs[StepSequence.objCounts] = 0;
		StepSequence.objs[StepSequence.objCounts].play();
		StepSequence.objCounts++;
		
		console.log(Mixer._collection_sounds[Mixer.getSample(row)].src);
	} else {
		console.log(row + ": empty step ");;
	}
	
	// Check we're not at the end
	if(this._set[row].length-1 > at++) {
		// Prepare to run this function again @ the delay (in seconds)
		console.log(row + ": re-running in " + Mixer.getLengthInSeconds(row) + " seconds ...");
		console.log(row + ":  [  row tbc  ]");
		StepSequence._timers[row] = setTimeout(function() {
			StepSequence.playPointer(row, at++);
		}, (Mixer.getLengthInSeconds(row)*1000))
	} else {
		StepSequence._timers[row] = null;
		console.log(row + ":  [  row end  ]");
	}
}

StepSequence.playTrack = function() {
	StepSequence.timeLine = setInterval(function() {
		StepSequence.moveTimeline()
	}, 1000);
	
	if(this._set[0] != null) StepSequence.playRow(0);
	if(this._set[1] != null) StepSequence.playRow(1);
	if(this._set[2] != null) StepSequence.playRow(2);
	if(this._set[3] != null) StepSequence.playRow(3);
	if(this._set[4] != null) StepSequence.playRow(4);
	if(this._set[5] != null) StepSequence.playRow(5);
	

}

StepSequence.buildSequence = function() {
	// row 0
	var row0 = document.getElementByClass("rightbox-0").getElementsByTagName("img");
	this._set[0] = [];
	
	for(var i=0; i<row0.length; i++) {
		if(row0[i].getAttribute("selected") == "1") {
			this._set[0][i] = Mixer.getSample(0);
		} else {
			this._set[0][i] = "_";
		}
	}
	
	// row 1
	var row1 = document.getElementByClass("rightbox-1").getElementsByTagName("img");
	this._set[1] = [];
	
	for(var i=0; i<row1.length; i++) {
		if(row1[i].getAttribute("selected") == "1") {
			this._set[1][i] = Mixer.getSample(1);
		} else {
			this._set[1][i] = "_";
		}
	}
	
	// row 2
	var row2 = document.getElementByClass("rightbox-2").getElementsByTagName("img");
	this._set[2] = [];
	
	for(var i=0; i<row2.length; i++) {
		if(row2[i].getAttribute("selected") == "1") {
			this._set[2][i] = Mixer.getSample(2);
		} else {
			this._set[2][i] = "_";
		}
	}
	
	// row 3
	var row3 = document.getElementByClass("rightbox-3").getElementsByTagName("img");
	this._set[3] = [];
	
	for(var i=0; i<row3.length; i++) {
		if(row3[i].getAttribute("selected") == "1") {
			this._set[3][i] = Mixer.getSample(3);
		} else {
			this._set[3][i] = "_";
		}
	}
	
	// row 4
	var row4 = document.getElementByClass("rightbox-4").getElementsByTagName("img");
	this._set[4] = [];
	
	for(var i=0; i<row4.length; i++) {
		if(row4[i].getAttribute("selected") == "1") {
			this._set[4][i] = Mixer.getSample(4);
		} else {
			this._set[4][i] = "_";
		}
	}
	
	// row 5
	var row5 = document.getElementByClass("rightbox-5").getElementsByTagName("img");
	this._set[5] = [];
	
	for(var i=0; i<row5.length; i++) {
		if(row5[i].getAttribute("selected") == "1") {
			this._set[5][i] = Mixer.getSample(5);
		} else {
			this._set[5][i] = "_";
		}
	}
}

StepSequence._at = 0;

StepSequence.moveTimeline = function() {
	StepSequence._at = this._at+1;	

	document.getElementById("timeline-container").style.left = (parseInt(document.getElementById("timeline-container").style.left.replace("px", ""))+9) + 'px';
	
	document.getElementById("timeline-seconds").innerHTML = Math.floor(this._at, 1) + "s";
	
	if(StepSequence._at == 60) {
		this.stop();
	}
	
}

StepSequence.stop = function() {
	if(StepSequence._timers[0] != null) {
		clearTimeout(StepSequence._timers[0]);
		Mixer._collection_sounds[Mixer.getSample(0)].currentTime = 0;
		Mixer._collection_sounds[Mixer.getSample(0)].pause();
	}
	if(StepSequence._timers[1] != null) {
		clearTimeout(StepSequence._timers[1]);
		Mixer._collection_sounds[Mixer.getSample(1)].currentTime = 0;
		Mixer._collection_sounds[Mixer.getSample(1)].pause();
	}
	if(StepSequence._timers[2] != null) {
		clearTimeout(StepSequence._timers[2]);
		Mixer._collection_sounds[Mixer.getSample(2)].currentTime = 0;
		Mixer._collection_sounds[Mixer.getSample(2)].pause();
	}
	if(StepSequence._timers[3] != null) {
		clearTimeout(StepSequence._timers[3]);
		Mixer._collection_sounds[Mixer.getSample(3)].currentTime = 0;
		Mixer._collection_sounds[Mixer.getSample(3)].pause();
	}
	if(StepSequence._timers[4] != null) {
		clearTimeout(StepSequence._timers[4]);
		Mixer._collection_sounds[Mixer.getSample(4)].currentTime = 0;
		Mixer._collection_sounds[Mixer.getSample(4)].pause();
	}
	if(StepSequence._timers[5] != null) {
		clearTimeout(StepSequence._timers[5]);
		Mixer._collection_sounds[Mixer.getSample(5)].currentTime = 0;
		Mixer._collection_sounds[Mixer.getSample(5)].pause();
	}
		
	StepSequence._timers[0] = null;
	StepSequence._timers[1] = null;
	StepSequence._timers[2] = null;
	StepSequence._timers[3] = null;
	StepSequence._timers[4] = null;
	StepSequence._timers[5] = null;
	
	clearInterval(StepSequence.timeLine);
	StepSequence._at = 0;
	
	this.gc();
	
	document.getElementById("timeline-container").style.left = "220px";
	document.getElementById("timeline-seconds").innerHTML = "0s";
}

StepSequence.test = function() {
	var track = [];
	
	track[0]		= ["misc_shaker00", "misc_shaker00", "misc_shaker00", "misc_shaker00", "misc_shaker00", "misc_shaker00", "misc_shaker00"];
	track[1]		= ["_", "_", "danceOne_beatz01", "danceOne_beatz01", "_", "danceOne_beatz01"];
	track[2]		= ["_", "_", "_", "_", "_", "_", "_", "_", "danceOne_beatz00", "danceOne_beatz00", "_", "_", "danceOne_beatz00"];
	track[3]		= ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "danceTwo_strings00", "_", "danceTwo_strings00"];
	
	
	StepSequence.set(track);
	
	//StepSequence.playTrack();
	
}