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
 
var Mixer = Mixer || {};

Mixer._slots = [];

Mixer.currentPack = null;

Mixer.removeStored = function (rem) {
	var workingWith = JSON.parse(localStorage.getItem("savedTracks"));
	
	workingWith.splice(rem, 1);
	
	
	localStorage.setItem("savedTracks", JSON.stringify(workingWith));
	
	// make sure we rebuild too - it's required! 
	Mixer.loadExistingTracks();
	
}

Mixer.doLoad = function(collection, trackData, skipURIDecode, silent) {	
	var start = new Date();
	
	showStage("mixer");
	
	Mixer.setPack(collection);
	
	
	if(skipURIDecode == null) {
		trackData = (decodeURI(trackData));
	}
	
	trackData = JSON.parse(trackData);
	
	// show the mixer so our elements are there
	
	Mixer.buildBlankRows();
	
	var row = 0;
	
	trackData.forEach(function (data) {
		if(data.length > 0) {
			data.forEach(function (sample_id) {
				if(sample_id != "_" && sample_id != "") {
					Mixer.setSample(sample_id, row);
					return;
				}
			}, this);
			
			Mixer.setRow(row);
			
			var col = 1;
			
			data.forEach(function (sample_id) {
				if(sample_id != "_" && sample_id != "") {
					Mixer.toggle(row, col);
				}
				
				col = col + 1;
			}, this);
		}
		
		row++;
	});
	
	if(silent != null) return;
	
	Interface.showMessage("Loaded!", "The track has been loaded in " + (new Date() - start) + "ms", null, {yes : true});
	
}


Mixer.loadExistingTracks = function() {
	var built = "<ul>";
	
	Mixer.currentI = 0;
	
	if(localStorage.getItem("savedTracks") != null) {
		var st = JSON.parse(localStorage.getItem("savedTracks"))
		
		st.forEach(function (a) {
			var splitUp = a.split("||[\/@]/@||");
			
			built+= "<li><a href=\"#\" onclick=\"Mixer.doLoad('"+encodeURI(splitUp[1])+"', '"+encodeURI(splitUp[2])+"');\">"+splitUp[0]+"</a> <a href=\"#\" onclick=\"Mixer.removeStored("+JSON.parse(localStorage.getItem("savedTracks")).indexOf(a)+");\" class=\"removeButton\">X</a></li>";
			
			Mixer.currentI++;
		});
	}
	
	built+= "</ul>";
	
	if(Mixer.currentI ==0) {
		built = "You have no stored tracks!";
	}
	
	document.getElementById("storedTracksList").innerHTML = built;
}

Mixer.setSample = function(sample_id, row) {
	Mixer._slots[row] = sample_id;
	document.getElementById("row"+row+"_option").value = Packs.soundLabels[sample_id];
	document.getElementById("row"+row+"_option").setAttribute("sample_id", sample_id);
	
}

Mixer.setPack = function(pack) {
	
	document.getElementByClass("Country_class").style.color	= '#000000';
	document.getElementByClass("Dance_class").style.color	= '#000000';
	document.getElementByClass("Hip-Hop_class").style.color	= '#000000';
	document.getElementByClass("Latin_class").style.color	= '#000000';
	document.getElementByClass("Pop_class").style.color		= '#000000';
	document.getElementByClass("Rock_class").style.color	= '#000000';
	
	if(document.getElementByClass(pack+"_class") != null) {
		document.getElementByClass(pack+"_class").style.color = 'red';
	}
	
	Packs.show(pack);
	Mixer.currentPack = pack;
	
	
}

Mixer.getSample = function(row) {
	return Mixer._slots[row];
}

Mixer.getSound = function(row) {
	return Packs.audioObjects[this._slots[row]];
}

Mixer.getLengthInSeconds = function(row) {
	var dur = Math.floor(this.getSound(row).durationEstimate/1000);
	if(dur == 8) dur = 10;
	if(dur == 7) dur = 10;
	
	if(dur < 2) dur = 2;
	
	return dur;
}

Mixer.getStepsLayout = function(row, size) {
	if(size <= 2) {
		var str = "<img id='s_"+row+"_%i%' src='assets/images/tabs/2s_clear.png' onclick='Mixer.toggle("+row+", %i%)' alt='' width='18' height='36' selected='0'>";
		return(str.repeat(30));
	}
	
	if(size == 4) {
		var str = "<img id='s_"+row+"_%i%' src='assets/images/tabs/2s_clear.png' width='36' height='36' onclick='Mixer.toggle("+row+", %i%)' selected='0'>";
		return(str.repeat(15));
	}
	
	if(size == 10) {
		var str = "<img id='s_"+row+"_%i%' src='assets/images/tabs/2s_clear.png' width='90' height='36' onclick='Mixer.toggle("+row+", %i%)' selected='0'>"
		return(str.repeat(6));
	}
	
	return null
}

Mixer.buildBlankRows = function() {	
	var rows = '';
	
	var row_template = ''+
'			<div id="row" class="row%i% two">'+
'				<div id="leftbox" ondrop="return(Mixer.droppedOn(event))" ondragover="event.preventDefault();" row="%i%">'+
'					<input id="row%i%_option" class="trackID" disabled value="" row="%i%">'+
'					<br row="%i%">'+
'					<input class="volumeSlider" type="range" min="1" max="100" value="100" id="volume_%i%" onchange="Mixer.changeVolume(%i%, this.value);" row="%i%">'+
'				</div>'+
'				<div id="rightbox" class="rightbox-%i%"></div>'+
'			</div>';
	
	var i = 0;
	while(i < 6) {
		var working_row = row_template;
		rows+= working_row.replace(new RegExp("%i%", 'g'), i);
		i++;
	}
	
	document.getElementById("rows-collection").innerHTML = rows;
}

Mixer.setRow = function(row) {
	if(this._slots[row] != null && this._slots[row] != "_") {
		document.getElementByClass("rightbox-"+row).innerHTML = this.getStepsLayout(row, this.getLengthInSeconds(row));
	} else {
		document.getElementByClass("rightbox-"+row).innerHTML = '';
	}
}

Mixer.toggle = function(row, tab) {
	var tab = document.getElementById("s_"+row+"_"+tab);
	
	if(tab == null) return;
	
	if(tab.getAttribute("selected") == "0") {
		tab.setAttribute("selected", "1");
		tab.setAttribute("src", "assets/images/tabs/2s_clear_enabled.png");
		
	} else {
		tab.setAttribute("selected", "0");
		tab.setAttribute("src", "assets/images/tabs/2s_clear.png");
	}
	
	StepSequence.buildSequence();
}

Mixer.changeSampleAtRow = function(row) {
	Mixer.setSample(document.getElementById("row"+row+"_option").value, row);
	Mixer.setRow(row);
}

Mixer.playStopButton = function() {
	if(document.getElementById("playButton").getAttribute("state") == "stopped") {
		document.getElementById("playButton").setAttribute("class", "s_playing");
		document.getElementById("playButton").setAttribute("state", "playing");
		StepSequence.playTrack();
	} else {
		document.getElementById("playButton").setAttribute("src", "assets/images/play.png");
		document.getElementById("playButton").setAttribute("class", "s_stopped");
		document.getElementById("playButton").setAttribute("state", "stopped");
		StepSequence.stop();
	}
}

Mixer.clearAll = function() {
	StepSequence.stop();
	Mixer.buildBlankRows();
	
	StepSequence._set[0] = [];
	StepSequence._set[1] = [];
	StepSequence._set[2] = [];
	StepSequence._set[3] = [];
	StepSequence._set[4] = [];
	StepSequence._set[5] = [];
	
	StepSequence.buildSequence(); // Make sure we rebuild the sequence, otherwise it's still store in code
	
	// force stop the song just in case its playing
	document.getElementById("playButton").setAttribute("src", "assets/images/play.png");
	document.getElementById("playButton").setAttribute("class", "s_stopped");
	document.getElementById("playButton").setAttribute("state", "stopped");

}

Mixer.save = function() {
	Interface.showInput("Save Track", "Name this track", "New Track 1", function(results) {
		if(results != null) {
			if(localStorage.getItem("savedTracks") == null) {
				localStorage.setItem("savedTracks", JSON.stringify([]));
			}
			
			var tracks = JSON.parse(localStorage.getItem("savedTracks"));
			tracks.push(results.value+"||[\/@]/@||"+0+"||[\/@]/@||"+JSON.stringify(StepSequence._set));
									
			localStorage.setItem("savedTracks", JSON.stringify(tracks));
			
			Mixer.loadExistingTracks();
			
			Interface.showMessage("Saved", "Your track has been saved!", null, { yes: true} );
		}
	});
}

Mixer.share = function() {
	window.lzmalib.compress(
		JSON.stringify(0+"||[\/@]/@||"+JSON.stringify(StepSequence._set)), 1,
		function on_compress_complete(str) {
			var content = "Here is your share key:<br><textarea name=\"textarea\" rows=\"10\" cols=\"40\">" + str.toString().replaceAll(",", " ") + "</textarea>";
			Interface.showMessage("Share this!", content, null, {yes:true});
		}
	);
}

Mixer.doImport = function(str) {
	showStage("load");
	
	loadingStatus("Loading track ...");
	
	window.lzmalib.decompress(str.split(" "), function on_decompress_complete(str) {
		var data = str.split("||[/@]/@||");		
		showStage("mixer");
		var filtered_string = data[1].replace(/\\"/g,'"');
		
		Mixer.doLoad(data[0].substring(1), filtered_string.substring(0, filtered_string.length-1), true);		
	});
}

Mixer.importDefaultForPack = function(pack) {
	if(Packs.defaultTracks[pack] == null) return;
	
	window.lzmalib.decompress(Packs.defaultTracks[pack].split(" "), function on_decompress_complete(str) {
		var data = str.split("||[/@]/@||");		
		showStage("mixer");
		var filtered_string = data[1].replace(/\\"/g,'"');
		
		Mixer.doLoad(data[0].substring(1), filtered_string.substring(0, filtered_string.length-1), true, true);		
	});
}


Mixer.changeVolume = function(row, value) {
	Packs.getSound(Mixer.getSample(row)).volume = value / 100;
}

Mixer.droppedOn = function(event) {
	window.daEvent = event;
	
	var elementTo = event.relatedTarget || event.toElement || event.target;
	console.log(elementTo);
	
	document.getElementById("row"+elementTo.getAttribute("row")+"_option").value = window.dragID;
	
	Mixer.changeSampleAtRow(elementTo.getAttribute("row"));
	
	return false;
}

