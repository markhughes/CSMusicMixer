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

function loadingStatus(txt) {
	document.getElementById("loadinfo").innerHTML = "<br><br><br><br><br>"+txt;
}

function showStage(stage) {
    document.getElementById("load").style.display = "none";
    document.getElementById("main").style.display = "none";
    document.getElementById("mixer").style.display = "none";

    document.getElementById(stage).style.display = "block";
}

function openMixer() {
	Mixer.buildBlankRows();
	
	showStage("mixer");
}

/* 
 * License stuff into terminal
 */
console.log("MyCoke Music Mixer. Licensed under The MIT License (MIT).");
console.log("Copyright (C) 2015  Mark William Hughes");
console.log("");
console.log("Use the help() function for help!");

function help() {
	console.log("For whatever reason, you're using the console.");
	console.log("Here are some functions that might interest you:");
	console.log("  showStage( stage ) --- shows a stage");
	console.log("");
	console.log("  StepSequence.set( array of steps ) --- sets the sequence");
	console.log("  StepSequence.playRow( row slot ) --- plays a row slot");
	console.log("  StepSequence.buildSequence() --- builds a sequence");
	console.log("");
	console.log("  Mixer.setSample( sample, row slot ) --- sets a sample");
	console.log("  Mixer.getSound( row slot ) --- gets a sound obj for a row slot");
	console.log("  Mixer.buildBlankRows() --- rebuilds the rows (data stays)");	
}