import {Howl, Howler} from 'howler';

import { loadingStatus, runFixes, showStage } from "./ui";
import { Mixer } from "./mixer";

type SoundData = {
  pack_id: string;
  label: string;
  file: string;
  icon?: string;
};

export const Packs = {
  // Lookups
  collection: {} as Record<string, string[]>,
  audioObjects: {} as Record<string, Howl>,
  soundsPaths: {} as Record<string, string>,
  soundLabels: {} as Record<string, string>,
  defaultTracks: {} as Record<string, string>,

  setSoundPath(pack: string, path: string) {
    this.soundsPaths[pack] = path;
  },

  addSound(soundData: SoundData) {
    loadingStatus("Adding " + soundData.label + " to " + soundData.pack_id);

    this.soundsTotal++;

    const id = soundData.file.substring(0, soundData.file.length - 4);

    this.audioObjects[id] = new Howl({
        src: [this.soundsPaths[soundData.pack_id] + soundData.file],
        preload: true,
        onload: () => Packs.audioReady(),
    });

    const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    if (iOS) {
      Packs.audioReady();
    }

    if (this.collection[soundData.pack_id] == null)
      this.collection[soundData.pack_id] = [];
    this.collection[soundData.pack_id].push(id);

    this.soundLabels[id] = soundData.label;
  },

  setDefaultTrack(pack: string, data: string) {
    this.defaultTracks[pack] = data;
  },

  getCollections(): string[] {
    return Object.keys(this.collection);
  },

  loadPack(packURL: string) {
    // TODO: use dynamic import
    // TODO: check if it exports a default function, if so use new method, otherwise fallback to this method
    const head = document.getElementsByTagName("head")[0];
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = packURL;

    s.onload = () => Packs.loadComplete();

    head.appendChild(s);
  },

  getSound(id: string) {
    return this.audioObjects[id];
  },

  // Load state
  prepared: 0,
  loaded: 0,
  soundsTotal: 0,
  soundsReady: 0,

  loadComplete() {
    Packs.loaded++;

    loadingStatus(
      Packs.loaded +
        " / " +
        Packs.prepared +
        " packs loaded. " +
        "<br><br> " +
        Packs.soundsReady +
        " / " +
        Packs.soundsTotal +
        " sounds ready."
    );

    Packs.checkReady();
  },

  checkReady() {
    if (Packs.soundsReady === Packs.soundsTotal && Packs.loaded === Packs.prepared) {
      Mixer.loadExistingTracks();

      runFixes();

      setTimeout(() => {
        Packs.buildList();

        const url = new URL(window.location.href);
        const load = url.searchParams.get("load");

        if (load != null && load !== "") {
          Mixer.doImport(atob(load));
        } else {
          showStage("main");
        }
      });
    }
  },

  audioReady() {
    loadingStatus(
      Packs.loaded +
        " / " +
        Packs.prepared +
        " packs loaded. " +
        "<br><br> " +
        Packs.soundsReady +
        " / " +
        Packs.soundsTotal +
        " sounds ready."
    );

    Packs.soundsReady++;
    Packs.checkReady();
  },

  show(pack: string) {
    if (Packs.collection[pack] == null) return;

    const template =
      '<span id="%id%" class="trackname" draggable="true" ondrag="window.dragID = this.id;" ondragover="event.preventDefault();" onclick="Packs.preview(\'%id%\');" onmouseout="window.previewSound.pause();">%name%</span>';
    let masterTemplate = "";

    Packs.collection[pack].forEach((id) => {
      let add = template;
      add = add.replaceAll("%id%", id);
      add = add.replaceAll("%name%", Packs.soundLabels[id]);
      masterTemplate += add;
    });

    const packsData = document.getElementById("packs-data");
    if (packsData) packsData.innerHTML = masterTemplate;

    if (runFixes != null) {
      runFixes();
    }
  },

  buildList() {
    const template = '<span class="packname" onclick="Packs.show(\'%name%\');">%name%</span>';
    let masterTemplate = "";

    Packs.getCollections().forEach((name) => {
      let add = template;
      add = add.replaceAll("%name%", name);

      masterTemplate += add;
    });

    const packsList = document.getElementById("packs-list");
    if (packsList) packsList.innerHTML = masterTemplate;
  },

  preview(sound: string) {
    window.previewSound = this.getSound(sound);
    window.previewSound.currentTime = 0;
    window.previewSound.play();
  },
};


