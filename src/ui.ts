import { addEvent, getById } from "./dom";
import { Interface } from "./interface";
import { Mixer } from "./mixer";

export function loadingStatus(txt: string) {
  getById("loadinfo").innerHTML = "<br><br><br><br><br>" + txt;
}

export function showStage(stage: string) {
  getById("load").style.display = "none";
  getById("main").style.display = "none";
  getById("mixer").style.display = "none";

  getById(stage).style.display = "block";
}

export function openMixer() {
  Mixer.buildBlankRows();
  Mixer.importDefaultForPack(Mixer.currentPack);
  showStage("mixer");
}

export function showImport() {
  Interface.showInput("Import", "Enter the import code!", "", (results) => {
    if (results != null) {
      Mixer.doImport(results.value);
    }
  });
}

export function runFixes() {
  // Firefox Fix
  const dragItems = document.querySelectorAll("[draggable=true]");
  for (let i = 0; i < dragItems.length; i++) {
    addEvent(dragItems[i], "dragstart", function (this: any, event: any) {
      event.dataTransfer.setData("Text", (this as any).id);
    });
  }

  window.previewSound = new Audio();
}

export function help() {
  // eslint-disable-next-line no-console
  console.log("For whatever reason, you're using the console.");
  // eslint-disable-next-line no-console
  console.log("Here are some functions that might interest you:");
  // eslint-disable-next-line no-console
  console.log("  showStage( stage ) --- shows a stage");
  // eslint-disable-next-line no-console
  console.log("");
  // eslint-disable-next-line no-console
  console.log("  StepSequence.set( array of steps ) --- sets the sequence");
  // eslint-disable-next-line no-console
  console.log("  StepSequence.playRow( row slot ) --- plays a row slot");
  // eslint-disable-next-line no-console
  console.log("  StepSequence.buildSequence() --- builds a sequence");
  // eslint-disable-next-line no-console
  console.log("");
  // eslint-disable-next-line no-console
  console.log("  Mixer.setSample( sample, row slot ) --- sets a sample");
  // eslint-disable-next-line no-console
  console.log("  Mixer.getSound( row slot ) --- gets a sound obj for a row slot");
  // eslint-disable-next-line no-console
  console.log("  Mixer.buildBlankRows() --- rebuilds the rows (data stays)");
}

// License stuff into terminal
// eslint-disable-next-line no-console
console.log("Music Mixer. Licensed under The MIT License (MIT).");
// eslint-disable-next-line no-console
console.log("Copyright (C) 2015  Mark William Hughes");
// eslint-disable-next-line no-console
console.log("");
// eslint-disable-next-line no-console
console.log("Use the help() function for help!");


