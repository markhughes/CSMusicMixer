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

var SoundsLibrary = SoundsLibrary || {};

/*
 * Country
 */
SoundsLibrary.collection_country = {
	id: 'country',
    loadcount: -1,
    total: 0,
    sounds: [],
    timerObj: null,
    load: function(list) {
        this.total = list.length;

        for (var i = 0; i < this.total; i++) {
	        loadingStatus("Preparing " + (i+1) + "/" + this.total + " country sounds..");
	        var sound = list[i];
	        
	        var path = "assets/sounds/country/" + sound;
	        var id = sound.substring(0, sound.length - 4);
	        
            this.sounds[id] = new Audio(path);
            
			this.sounds[id].setAttribute("preload","auto");
			
            this.sounds[id].addEventListener("canplaythrough", function() {
                if(SoundsLibrary.collection_country.loadcount == -1) {
		            SoundsLibrary.collection_country.loadcount = 1;
	            } else {
                	SoundsLibrary.collection_country.loadcount++;
                }
                loadingStatus("Loaded " + SoundsLibrary.collection_country.loadcount + "/" + SoundsLibrary.collection_country.total + " country sounds..");                
            });
        }
    }
};

/*
 * Dance
 */
SoundsLibrary.collection_dance = {
	id: 'dance',
    loadcount: -1,
    total: 0,
    sounds: [],
    timerObj: null,
    load: function(list) {
        this.total = list.length;

        for (var i = 0; i < this.total; i++) {
	        loadingStatus("Preparing " + (i+1) + "/" + this.total + " dance sounds..");
	        var sound = list[i];
	        
	        var path = "assets/sounds/dance/" + sound;
	        var id = sound.substring(0, sound.length - 4);
	        
            this.sounds[id] = new Audio(path);
            
			this.sounds[id].setAttribute("preload", "auto");
			
            this.sounds[id].addEventListener("canplaythrough", function() {
                if(SoundsLibrary.collection_dance.loadcount == -1) {
		            SoundsLibrary.collection_dance.loadcount = 1;
	            } else {
                	SoundsLibrary.collection_dance.loadcount++;
                }
                loadingStatus("Loaded " + SoundsLibrary.collection_dance.loadcount + "/" + SoundsLibrary.collection_dance.total + " dance sounds..");                
            });
        }
    }
};

/*
 * HipHop
 */
SoundsLibrary.collection_hiphop = {
	id: 'hiphop',
    loadcount: -1,
    total: 0,
    sounds: [],
    timerObj: null,
    load: function(list) {
        this.total = list.length;

        for (var i = 0; i < this.total; i++) {
	        loadingStatus("Preparing " + (i+1) + "/" + this.total + " hiphop sounds..");
	        var sound = list[i];
	        
	        var path = "assets/sounds/hiphop/" + sound;
	        var id = sound.substring(0, sound.length - 4);
	        
            this.sounds[id] = new Audio(path);
            
			this.sounds[id].setAttribute("preload", "auto");
			
            this.sounds[id].addEventListener("canplaythrough", function() {
                if(SoundsLibrary.collection_hiphop.loadcount == -1) {
		            SoundsLibrary.collection_hiphop.loadcount = 1;
	            } else {
                	SoundsLibrary.collection_hiphop.loadcount++;
                }
                
                loadingStatus("Loaded " + SoundsLibrary.collection_hiphop.loadcount + "/" + SoundsLibrary.collection_hiphop.total + " hiphop sounds..");                
            });
        }
    }
};

/*
 * Latin
 */
SoundsLibrary.collection_latin = {
	id: 'latin',
    loadcount: -1,
    total: 0,
    sounds: [],
    timerObj: null,
    load: function(list) {
        this.total = list.length;

        for (var i = 0; i < this.total; i++) {
	        loadingStatus("Preparing " + (i+1) + "/" + this.total + " latin sounds..");
	        var sound = list[i];
	        
	        var path = "assets/sounds/latin/" + sound;
	        var id = sound.substring(0, sound.length - 4);
	        
            this.sounds[id] = new Audio(path);
            
			this.sounds[id].setAttribute("preload", "auto");
			
            this.sounds[id].addEventListener("canplaythrough", function() {
                if(SoundsLibrary.collection_latin.loadcount == -1) {
		            SoundsLibrary.collection_latin.loadcount = 1;
	            } else {
                	SoundsLibrary.collection_latin.loadcount++;
                }
                loadingStatus("Loaded " + SoundsLibrary.collection_latin.loadcount + "/" + SoundsLibrary.collection_latin.total + " latin sounds..");                
            });
        }
    }
};

/*
 * Pop
 */
SoundsLibrary.collection_pop = {
	id: 'pop',
    loadcount: -1,
    total: 0,
    sounds: [],
    timerObj: null,
    load: function(list) {
        this.total = list.length;

        for (var i = 0; i < this.total; i++) {
	        loadingStatus("Preparing " + (i+1) + "/" + this.total + " pop sounds..");
	        var sound = list[i];
	        
	        var path = "assets/sounds/pop/" + sound;
	        var id = sound.substring(0, sound.length - 4);
	        
            this.sounds[id] = new Audio(path);
            
			this.sounds[id].setAttribute("preload", "auto");
			
            this.sounds[id].addEventListener("canplaythrough", function() {
                if(SoundsLibrary.collection_pop.loadcount == -1) {
		            SoundsLibrary.collection_pop.loadcount = 1;
	            } else {
                	SoundsLibrary.collection_pop.loadcount++;
                }
                loadingStatus("Loaded " + SoundsLibrary.collection_pop.loadcount + "/" + SoundsLibrary.collection_pop.total + " pop sounds..");                
            });
        }
    }
};

/*
 * Rock
 */
SoundsLibrary.collection_rock = {
	id: 'rock',
    loadcount: -1,
    total: 0,
    sounds: [],
    timerObj: null,
    load: function(list) {
        this.total = list.length;

        for (var i = 0; i < this.total; i++) {
	        loadingStatus("Preparing " + (i+1) + "/" + this.total + " rock sounds..");
	        var sound = list[i];
	        
	        var path = "assets/sounds/rock/" + sound;
	        var id = sound.substring(0, sound.length - 4);
	        
            this.sounds[id] = new Audio(path);
            
			this.sounds[id].setAttribute("preload", "auto");
			
            this.sounds[id].addEventListener("canplaythrough", function() {
	            if(SoundsLibrary.collection_rock.loadcount == -1) {
		            SoundsLibrary.collection_rock.loadcount = 1;
	            } else {
                	SoundsLibrary.collection_rock.loadcount++;
                }
                loadingStatus("Loaded " + SoundsLibrary.collection_rock.loadcount + "/" + SoundsLibrary.collection_rock.total + " rock sounds..");                
            });
        }
    }

};

/*
 * Libray Loader
 */
SoundsLibrary.load = {
    loadComplete: function() {
        showStage("main");
        
		if(typeof(Storage) !== "undefined") {
			var _items = JSON.parse(localStorage.getItem("savedTracks"));
			
			if(_items != null) {
				loadingStatus("Loading existing tracks ... ");
				//console.log(_items);
				Mixer.loadExistingTracks();
			}
			
			
		} else {
		}
    },
    loadAll: function() {
        loadingStatus("Loading country sounds ... ");

        // Start with loading country
        this.loadCountry();

        // Country to dance ticker
        SoundsLibrary.collection_country.timerObj = setInterval(function() {
            if (SoundsLibrary.collection_country.loadcount+1 > SoundsLibrary.collection_country.total) {
                clearInterval(SoundsLibrary.collection_country.timerObj);
                loadingStatus("Country sounds loaded.");
                SoundsLibrary.load.loadDance();
            }
        }, 200);
        
        // Dance to hiphop ticker
        SoundsLibrary.collection_dance.timerObj = setInterval(function() {
            if (SoundsLibrary.collection_dance.loadcount+1 > SoundsLibrary.collection_dance.total) {
                clearInterval(SoundsLibrary.collection_dance.timerObj);
                loadingStatus("Dance sounds loaded.");
                SoundsLibrary.load.loadHipHop();
            }
        }, 200);
        // Hiphop to latin ticker
        SoundsLibrary.collection_hiphop.timerObj = setInterval(function() {
            if (SoundsLibrary.collection_hiphop.loadcount+1 > SoundsLibrary.collection_hiphop.total) {
                clearInterval(SoundsLibrary.collection_hiphop.timerObj);
                loadingStatus("HipHop sounds loaded.");
                SoundsLibrary.load.loadLatin();
            }
        }, 200);
        // Latin to pop ticker
        SoundsLibrary.collection_latin.timerObj = setInterval(function() {
            if (SoundsLibrary.collection_latin.loadcount+1 > SoundsLibrary.collection_latin.total) {
                clearInterval(SoundsLibrary.collection_latin.timerObj);
                loadingStatus("Latin sounds loaded.");
                SoundsLibrary.load.loadPop();
            }
        }, 200);
        // Pop to Rock ticker
        SoundsLibrary.collection_pop.timerObj = setInterval(function() {
            if (SoundsLibrary.collection_pop.loadcount+1 > SoundsLibrary.collection_pop.total) {
                clearInterval(SoundsLibrary.collection_pop.timerObj);
                loadingStatus("Pop sounds loaded.");
                SoundsLibrary.load.loadRock();
            }
        }, 200);
        
        // Rock to MAIN ticker
        SoundsLibrary.collection_rock.timerObj = setInterval(function() {
            if (SoundsLibrary.collection_rock.loadcount+1 > SoundsLibrary.collection_rock.total) {
                clearInterval(SoundsLibrary.collection_rock.timerObj);
                loadingStatus("Rock sounds loaded.");
                SoundsLibrary.load.loadComplete();
            }
        }, 200);
        
        

    },
    loadCountry: function() {
        var country_sounds = [
            "countryOne_bass00.mp3",
            "countryOne_guitar00.mp3",
            "countryTwo_banjo00.mp3",
            "countryTwo_bass00.mp3",
            "countryTwo_beatz00.mp3",
            "countryTwo_beatz01.mp3",
            "danceTwo_strings00.mp3",
            "misc_cowbell00.mp3",
            "misc_harmonica00.mp3"
        ];

        SoundsLibrary.collection_country.load(country_sounds);

    },
    loadDance: function() {
        var dance_sounds = [
            "danceOne_bass00.mp3",
            "danceOne_beatz00.mp3",
            "danceOne_beatz01.mp3",
            "danceTwo_effect00.mp3",
            "danceTwo_strings00.mp3",
            "misc_jazzGuit00.mp3",
            "misc_shaker00.mp3",
            "misc_tubularBells00.mp3",
            "misc_vocal04.mp3",
            "popTwo_bass00.mp3"
        ];

        SoundsLibrary.collection_dance.load(dance_sounds);
	},
    loadHipHop: function() {
        var hiphop_sounds = [
            "hipHopOne_bass00.mp3",
            "hipHopOne_beatz01.mp3",
            "hipHopOne_kbd00.mp3",
            "hipHopTwo_beatz00.mp3",
            "misc_effect00.mp3",
            "misc_fastScratch00.mp3",
            "misc_vocal02.mp3",
            "misc_vocal03.mp3",
            "shared_triangle00.mp3"
        ];

        SoundsLibrary.collection_hiphop.load(hiphop_sounds);
	},
	loadLatin: function() {
        var latin_sounds = [
            "latinOne_sax00.mp3",
            "latinoOne_percCombo00.mp3",
            "latinoTwo_marracas00.mp3",
            "latinoTwo_percCombo00.mp3",
            "latinoTwo_piano00.mp3",
            "misc_jazzTrumpet00.mp3",
            "misc_rachet00.mp3",
            "shared_crash00.mp3",
            "shared_latinoBells00.mp3"
        ];

        SoundsLibrary.collection_latin.load(latin_sounds);
	},
	loadPop: function() {
        var pop_sounds = [
            "misc_bass00.mp3",
            "misc_funkGuit00.mp3",
            "misc_spanishGuit00.mp3",
            "misc_vocal00.mp3",
            "popOne_kbd00.mp3",
            "popOne_vocal00.mp3",
            "popTwo_bass00.mp3",
            "popTwo_beatz00.mp3",
            "popTwo_kbd00.mp3"
        ];

        SoundsLibrary.collection_pop.load(pop_sounds);
	},
	loadRock: function() {
        var rock_sounds = [
            "misc_cowbell00.mp3",
            "misc_easternPerc00.mp3",
            "rockOne_bass00.mp3",
            "rockOne_beatz00.mp3",
            "rockOne_cymbal00.mp3",
            "rockOne_guitar00.mp3",
            "rockOne_guitar01.mp3",
            "rockTwo_beatz00.mp3",
            "shared_crash00.mp3"
        ];

        SoundsLibrary.collection_rock.load(rock_sounds);
	}
}