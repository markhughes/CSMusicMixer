function packExample() {
	// This is our UNIQUE pack name in a "pack name - creator" style
	const PACK_ID = "Example - Mark Hughes";

	// This sets the path to the sounds for the pack
	Packs.setSoundPath(PACK_ID, "assets/packs/example/sounds/");

	// This is our first sound we're adding, the label does NOT have to be unique
	// however the filename must be unique, I suggested starting it with your pack name
	Packs.addSound({
		pack_id: PACK_ID,
		label: "Schoolbell",
		file: "example_markhughes_schoolbell.mp3",
		icon: "assets/packs/default/icons/bell.png"
	});

	/* pack_id:  Your pack ID - its easier just to use a constant like we have in this example
	* label:    The label that is shown to people viewing the pack
	* file:     The file name, this also becomes a unique ID, so ensure it is unique
	* icon:     Currently unused, but in the future we'll show icons next to tracks. 
	*/

	// This is another sound we're adding, called Bip. This is less than 1s long.. however, it
	// will be moved to a 2s slot automatically 
	Packs.addSound({
		pack_id: PACK_ID,
		label: "Bip",
		file: "example_markhughes_bip.mp3",
		icon: "assets/packs/default/icons/fx.png"
	});

}

packExample();