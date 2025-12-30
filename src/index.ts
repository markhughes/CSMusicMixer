import { Interface } from "./interface";
import { Mixer } from "./mixer";
import { Packs } from "./packs";
import { StepSequence } from "./stepSequence";
import { Txt } from "./txt";
import { help, loadingStatus, openMixer, runFixes, showImport, showStage } from "./ui";

const v = 1.4;

// Preserve legacy globals for:
// - inline HTML handlers in index.html
// - pack scripts under /packs/** which call global Packs.*
Object.assign(window, {
    Interface,
    Mixer,
    Packs,
    StepSequence,
    Txt,

    loadingStatus,
    showStage,
    openMixer,
    showImport,
    runFixes,
    help,
});

async function main() {
    loadingStatus("Loading packs ...");
    showStage("load");

    const packsJson = await fetch("assets/packs/packs.json").then(res => res.json());
    const packs: string[] = packsJson.packs;

    loadingStatus("Loading ...");

    window.lzmalib = new LZMA("assets/js/lzma_worker.js");


    packs.forEach((packName) => {
        Packs.prepared++;
        Packs.loadPack("assets/packs/" + packName + "/" + packName + ".js?" + v);
    });

}

window.addEventListener("load", main);


