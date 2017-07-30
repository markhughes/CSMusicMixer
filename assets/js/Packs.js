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

var Packs = Packs || {};

/**
 * A simple lookup of all the audio sound IDs per pack
 */
Packs.collection = [];

/**
 * A simple lookup of Audio objects identified by the sound id
 */
Packs.audioObjects = [];

/**
 * A simple lookup of a packs audio folder
 */
Packs.soundsPaths = [];

/**
 * A simple lookup collection for the path of sounds for their pack
 */
Packs.soundLabels = [];

/**
 * A simple lookup of all the default track data
 */
Packs.defaultTracks = [];


/**
 * Sets the sound path for a pack
 *  pack: 		the unqiue pack name
 *  path:		a path to where the sounds are
 *
 */
Packs.setSoundPath = function(pack, path) {
	this.soundsPaths[pack] = path;
};


/**
 * Adds a sound to the pack library, it should pass an object with:
 *  pack_id: 	a unique identification for the pack
 *  label:		the label of this sound we're adding
 *  file:		name of the sound file, NOT the full path
 *  icon:		the path to the icon file for this sound
 *
 */
Packs.addSound = function(soundData) {
	loadingStatus("Adding " + soundData.label + " to " + soundData.pack_id);

	// Create a sounds total
	this.soundsTotal++;

	// Generate the audio file ID (it's based off the mp3/wav file)
	var id = soundData.file.substring(0, soundData.file.length - 4);

	this.audioObjects[id] = soundManager.createSound({
		autoLoad: true,
		url: this.soundsPaths[soundData.pack_id]  + soundData.file,
		whileloading: function() {
			Packs.audioReady();
		}
	});

	var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	if(iOS) {
		// iOS cant autoload songs, so we just assume they're loaded
		Packs.audioReady();
	}
	// We add it to a collection array, this allows us to quickly fetch all the sounds in a pack
	if(this.collection[soundData.pack_id] == null) this.collection[soundData.pack_id] = [];
	this.collection[soundData.pack_id].push(id);

	this.soundLabels[id] = soundData.label;
};

/**
 * Sets the basic pack data for a pack
 */
Packs.setDefaultTrack = function(pack, data) {
	this.defaultTracks[pack] = data;
};


/**
 * Returns an array with all the collections that exist
 */
Packs.getCollections = function() {
	var results = [];

	for(var key in Packs.collection) {
		if (Packs.collection.hasOwnProperty(key)) {
			results.push(key);
		}
	}

	return results;
};

/**
 * Simply attaches the pack to the script
 */
Packs.loadPack = function(packURL) {
	var head = document.getElementsByTagName("head")[0];
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = packURL;

	s.onreadystatechange = Packs.loadComplete;
	s.onload = Packs.loadComplete;

	head.appendChild(s);
};

Packs.getSound = function(id) {
	return Packs.audioObjects["" + id];
};

// These variables are used to determine when we're finished loading
Packs.prepared = 0;
Packs.loaded = 0;
Packs.soundsTotal = 0;
Packs.soundsReady = 0;

/**
 * Do not call. This is triggered when a script file has been loaded,
 * it is used to determine if all packs have loaded their script files.
 */
Packs.loadComplete = function() {
	Packs.loaded++;

	loadingStatus(
					Packs.loaded      + " / " + Packs.prepared    + " packs loaded. "  + "<br><br> " +
					Packs.soundsReady + " / " + Packs.soundsTotal + " sounds ready."
				 );

	Packs.checkReady();
};

/**
 * Call to determine if all packs and audios have been loaded
 */
Packs.checkReady = function() {
	if(Packs.soundsReady == Packs.soundsTotal && Packs.loaded == Packs.prepared) {
		Mixer.loadExistingTracks();

		// This is attempting to fix issues with cross-browser stuff
		runFixes();

		setTimeout(function() {
			Packs.buildList();

			var url = new URL(window.location);
			var load = url.searchParams.get("load");

			if (load != null && load != "") {
				Mixer.doImport(Base64.decode(load));
			} else {
				showStage("main");
			}
		});
	}
};

/**
 * Do not call. This is triggered when a sound file has been loaded,
 * it is used to determine if all packs have loaded their sound files.
 */
Packs.audioReady = function() {
	loadingStatus(
					Packs.loaded      + " / " + Packs.prepared    + " packs loaded. "  + "<br><br> " +
					Packs.soundsReady + " / " + Packs.soundsTotal + " sounds ready."
				 );

	Packs.soundsReady++;
	Packs.checkReady();
};

/**
 * Shows a pack, builds pack data.
 */
Packs.show = function(pack) {
	if(Packs.collection[pack] == null) return;

	var template = "<span id=\"%id%\" class=\"trackname\" draggable=\"true\" ondrag=\"window.dragID = this.id;\" ondragover=\"event.preventDefault();\"  onclick=\"Packs.preview('%id%');\" onmouseout=\"window.previewSound.pause();\">%name%</span>";
	var master_template = "";

	Packs.collection[pack].forEach(function(id) {
		var add = template;
		add = add.replaceAll("%id%", id);
		add = add.replaceAll("%name%", Packs.soundLabels[id]);

		master_template+=add;
	});

	document.getElementById("packs-data").innerHTML = master_template;

	if(runFixes != null) {
		runFixes(); // run this again to fix dnd issues with certain browsers
	}

};

/**
 * Builds the collections list
 */
Packs.buildList = function() {
	var template = "<span class=\"packname\" onclick=\"Packs.show('%name%');\">%name%</span>";
	var master_template = "";

	Packs.getCollections().forEach(function(name) {
		var add = template;
		add = add.replaceAll("%name%", name);

		master_template+=add;
	});

	document.getElementById("packs-list").innerHTML = master_template;

};

/**
 * Starts a preview for a sound
 */
Packs.preview = function(sound) {
	window.previewSound = this.getSound(sound);
	window.previewSound.currentTime = 0;
	window.previewSound.play();
};
