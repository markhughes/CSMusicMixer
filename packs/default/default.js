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

// Name of the pack, this MUST be unique
// Feel free to make your pack more unique by saying something like this:
//		"My Pack by Markeh"
// it is recommended not to modify this default pack!

// WARNING: this pack is NOT a standard - do not use this as a guide! 
//          Check the wiki for examples!   



// This will set the cover icon for the pack. 
//Packs.setCover(pack, "packs/default/country.png");

// because this is the default, we're going to set it for all of them right now
Packs.setSoundPath("Country", "packs/default/sounds/");
Packs.setSoundPath("Dance", "packs/default/sounds/");
Packs.setSoundPath("Hip-Hop", "packs/default/sounds/");
Packs.setSoundPath("Latin", "packs/default/sounds/");
Packs.setSoundPath("Pop", "packs/default/sounds/");
Packs.setSoundPath("Rock", "packs/default/sounds/");

/** Country Sounds **/
var pack = "Country";

Packs.addSound({
	pack_id: pack,
	label: "Country 1 Bass",
	file: "countryOne_bass00.mp3",
	icon: "packs/default/icons/bass.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Country 1 Guitar",
	file: "countryOne_guitar00.mp3",
	icon: "packs/default/icons/guitar.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Country 2 Banjo",
	file: "countryTwo_banjo00.mp3",
	icon: "packs/default/icons/banjo.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Country 2 Bass",
	file: "countryTwo_bass00.mp3",
	icon: "packs/default/icons/banjo.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Country 2 Beatz 1",
	file: "countryTwo_beatz00.mp3",
	icon: "packs/default/icons/banjo.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Country 2 Beatz 2",
	file: "countryTwo_beatz01.mp3",
	icon: "packs/default/icons/banjo.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Strings",
	file: "danceTwo_strings00.mp3",
	icon: "packs/default/icons/strings.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Cowbell",
	file: "misc_cowbell00.mp3",
	icon: "packs/default/icons/bells.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Harmonica",
	file: "misc_harmonica00.mp3",
	icon: "packs/default/icons/harmonica.png"
});

Packs.setDefaultTrack(pack, "93 0 0 1 0 117 5 0 0 0 0 0 0 0 17 12 12 24 117 0 -53 31 -89 -67 23 -40 -56 -18 116 -111 5 77 68 -116 50 -121 126 -9 -63 -73 -34 7 124 -18 81 81 -28 75 -124 -115 116 -70 36 -96 -94 -119 -80 93 22 33 34 36 13 39 -47 -73 -44 127 80 27 94 73 -10 -122 -52 -74 -86 45 -43 57 65 41 -73 -68 -6 -21 80 -88 110 -104 -100 33 10 -61 -125 95 -88 57 18 1 -34 -19 80 -13 74 57 -97 -65 111 -91 36 111 -30 -47 -71 14 -92 8 45 -126 -61 -66 -8 -16 -122 -99 -108 -28 103 93 4 -15 -127 112 -109 48 -41 -71 -101 -121 12 73 70 107 18 64 -28 -7 -85 92 78 -84 -49 32 -34 -1 -1 79 -92 59 0")




/** Dance Sounds **/
var pack = "Dance";

Packs.addSound({
	pack_id: pack,
	label: "Dance 1 Bass",
	file: "danceOne_bass00.mp3",
	icon: "packs/default/icons/bass.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Dance 1 Beatz 1",
	file: "danceOne_beatz00.mp3",
	icon: "packs/default/icons/bass.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Dance 1 Beatz 2",
	file: "danceOne_beatz01.mp3",
	icon: "packs/default/icons/bass.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Dance 2 Effect",
	file: "danceTwo_effect00.mp3",
	icon: "packs/default/icons/bass.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Dance 2 Strings",
	file: "danceTwo_strings00.mp3",
	icon: "packs/default/icons/bass.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Jazz Guitar",
	file: "misc_jazzGuit00.mp3",
	icon: "packs/default/icons/guitar.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Shaker",
	file: "misc_shaker00.mp3",
	icon: "packs/default/icons/shaker.png"
});


Packs.addSound({
	pack_id: pack,
	label: "Tubular Bells",
	file: "misc_tubularBells00.mp3",
	icon: "packs/default/icons/bells.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Vocals: Higher!",
	file: "misc_vocal04.mp3",
	icon: "packs/default/icons/vocal.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Pop 2 Bass",
	file: "popTwo_bass00.mp3",
	icon: "packs/default/icons/vocal.png"
});

Packs.setDefaultTrack(pack, "93 0 0 1 0 51 4 0 0 0 0 0 0 0 17 12 12 24 117 0 -53 31 -89 -67 23 -40 -56 -18 117 99 91 31 -44 52 -12 -77 40 81 -104 -19 65 -35 110 -10 -87 83 -62 101 3 -29 -63 -108 53 107 42 16 -86 126 -67 -26 97 -115 114 31 -96 -106 25 30 37 -29 -30 80 -67 11 125 -115 -17 -50 2 0 -107 -2 100 -17 -27 103 14 -28 14 108 -101 -59 103 94 -33 -11 86 121 -45 43 -46 117 -54 -62 -120 126 -52 -86 58 123 -70 61 -20 -113 100 -105 -8 80 103 -26 -117 -113 -83 -54 -108 -49 -88 96 -46 17 106 101 68 -108 -18 -101 -112 -1 -26 -66 17 -23 -14 103 65 3 -119 -21 73 15 76 -100 43 127 -1 -6 -41 -128 -104")




/** Hip-Hop Sounds **/
var pack = "Hip-Hop";

Packs.addSound({
	pack_id: pack,
	label: "Hip-Hop 1 Bass",
	file: "hipHopOne_bass00.mp3",
	icon: "packs/default/icons/vocal.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Hip-Hop 1 Beatz",
	file: "hipHopOne_beatz01.mp3",
	icon: "packs/default/icons/vocal.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Hip-Hop 1 KDB Effect ",
	file: "hipHopOne_kbd00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Hip-Hop 2 Beatz ",
	file: "hipHopTwo_beatz00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Buzz Effect ",
	file: "misc_effect00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Fast Scratch ",
	file: "misc_fastScratch00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Vocals: Feel it",
	file: "misc_vocal02.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Vocals: Bass",
	file: "misc_vocal03.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Triangle",
	file: "shared_triangle00.mp3",
	icon: "packs/default/icons/fx.png"
});




/** Latin Sounds **/
var pack = "Latin";

Packs.addSound({
	pack_id: pack,
	label: "Sax",
	file: "latinOne_sax00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Percussion 1",
	file: "latinoOne_percCombo00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Marracas",
	file: "latinoTwo_marracas00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Percussion 2",
	file: "latinoTwo_percCombo00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Piano",
	file: "latinoTwo_piano00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Jazz Trumpet",
	file: "misc_jazzTrumpet00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rachet",
	file: "misc_rachet00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Crash",
	file: "shared_crash00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Latino Bells",
	file: "shared_latinoBells00.mp3",
	icon: "packs/default/icons/fx.png"
});




/** Pop Sounds **/
var pack = "Pop";

Packs.addSound({
	pack_id: pack,
	label: "Misc Bass",
	file: "misc_bass00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Funk Guitar",
	file: "misc_funkGuit00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Spanish Guitar",
	file: "misc_spanishGuit00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Beat Boxing",
	file: "misc_vocal00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Pop 1 Keyboard",
	file: "popOne_kbd00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Vocals: Come on!",
	file: "popOne_vocal00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Pop 2 Bass",
	file: "popTwo_bass00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Pop 2 Beatz",
	file: "popTwo_beatz00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Pop 2 Keyboard",
	file: "popTwo_kbd00.mp3",
	icon: "packs/default/icons/fx.png"
});




/** Rock Sounds **/
var pack = "Rock";

Packs.addSound({
	pack_id: pack,
	label: "Cowbell",
	file: "misc_cowbell00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Eastern Percussion",
	file: "misc_easternPerc00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rock 1 Bass",
	file: "rockOne_bass00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rock 1 Beatz",
	file: "rockOne_beatz00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rock 1 Cymbal",
	file: "rockOne_cymbal00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rock 1 Guitar 1",
	file: "rockOne_guitar00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rock 1 Guitar 2",
	file: "rockOne_guitar01.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Rock 2 Beatz",
	file: "rockTwo_beatz00.mp3",
	icon: "packs/default/icons/fx.png"
});

Packs.addSound({
	pack_id: pack,
	label: "Crash",
	file: "shared_crash00.mp3",
	icon: "packs/default/icons/fx.png"
});

