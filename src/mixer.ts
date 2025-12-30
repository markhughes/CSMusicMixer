import { getById, getFirstByClass } from "./dom";
import { Interface } from "./interface";
import { Packs } from "./packs";
import { StepSequence } from "./stepSequence";
import { loadingStatus, showStage } from "./ui";

type TrackRow = Array<string>;
type TrackData = Array<TrackRow>;

function buildStepsLayout(row: number, size: number): string | null {
  function buildTabs(count: number, width: number, height: number): string {
    let out = "";
    for (let i = 1; i <= count; i++) {
      out +=
        "<img id='s_" +
        row +
        "_" +
        i +
        "' src='assets/images/tabs/2s_clear.png' onclick='Mixer.toggle(" +
        row +
        ", " +
        i +
        ")' alt='' width='" +
        width +
        "' height='" +
        height +
        "' selected='0'>";
    }
    return out;
  }

  if (size <= 2) return buildTabs(30, 18, 36);
  if (size === 4) return buildTabs(15, 36, 36);
  if (size === 10) return buildTabs(6, 90, 36);
  return null;
}

export const Mixer = {
  _slots: [] as string[],

  currentPack: null as string | null,
  currentI: 0,

  removeStored(rem: number) {
    const workingWith = JSON.parse(localStorage.getItem("savedTracks") || "[]");
    workingWith.splice(rem, 1);
    localStorage.setItem("savedTracks", JSON.stringify(workingWith));
    Mixer.loadExistingTracks();
  },

  doLoad(collection: string, trackData: string, skipURIDecode?: boolean, silent?: boolean) {
    const start = new Date();

    showStage("mixer");
    Mixer.setPack(collection);

    if (skipURIDecode == null) {
      trackData = decodeURI(trackData);
    }

    const parsed: TrackData = JSON.parse(trackData);

    Mixer.buildBlankRows();

    let row = 0;
    parsed.forEach((data) => {
      if (data.length > 0) {
        data.forEach((sample_id) => {
          if (sample_id !== "_" && sample_id !== "") {
            Mixer.setSample(sample_id, row);
            return;
          }
        });

        Mixer.setRow(row);

        let col = 1;
        data.forEach((sample_id) => {
          if (sample_id !== "_" && sample_id !== "") {
            Mixer.toggle(row, col);
          }
          col = col + 1;
        });
      }

      row++;
    });

    if (silent != null) return;

    Interface.showMessage(
      "Loaded!",
      "The track has been loaded in " + (new Date().getTime() - start.getTime()) + "ms",
      undefined,
      { yes: true }
    );
  },

  loadExistingTracks() {
    let built = "<ul>";

    Mixer.currentI = 0;

    const raw = localStorage.getItem("savedTracks");
    if (raw != null) {
      const st: string[] = JSON.parse(raw);

      st.forEach((a) => {
        const splitUp = a.split("||[/@]/@||");

        built +=
          '<li><a href="#" onclick="Mixer.doLoad(\'' +
          encodeURI(splitUp[1]) +
          "', '" +
          encodeURI(splitUp[2]) +
          "');\">" +
          splitUp[0] +
          '</a> <a href="#" onclick="Mixer.removeStored(' +
          JSON.parse(localStorage.getItem("savedTracks") || "[]").indexOf(a) +
          ');" class="removeButton">X</a></li>';

        Mixer.currentI++;
      });
    }

    built += "</ul>";
    if (Mixer.currentI === 0) built = "You have no stored tracks!";

    getById("storedTracksList").innerHTML = built;
  },

  setSample(sample_id: string, row: number) {
    Mixer._slots[row] = sample_id;
    const input = getById<HTMLInputElement>("row" + row + "_option");
    input.value = Packs.soundLabels[sample_id];
    input.setAttribute("sample_id", sample_id);
  },

  setPack(pack: string) {
    const classes = [
      "Country_class",
      "Dance_class",
      "Hip-Hop_class",
      "Latin_class",
      "Pop_class",
      "Rock_class",
    ];
    classes.forEach((c) => {
      const el = getFirstByClass(c);
      if (el) el.style.color = "#000000";
    });

    const active = getFirstByClass(pack + "_class");
    if (active) active.style.color = "red";

    Packs.show(pack);
    Mixer.currentPack = pack;
  },

  getSample(row: number) {
    return Mixer._slots[row];
  },

  getSound(row: number) {
    return Packs.audioObjects[this._slots[row]];
  },

  getLengthInSeconds(row: number) {
    let dur = Math.floor(this.getSound(row).duration());
    if (dur === 8) dur = 10;
    if (dur === 7) dur = 10;
    if (dur < 2) dur = 2;
    return dur;
  },

  buildBlankRows() {
    let rows = "";
    for (let i = 0; i < 6; i++) {
      rows +=
        '			<div id="row" class="row' +
        i +
        ' two">' +
        '				<div id="leftbox" ondrop="return(Mixer.droppedOn(event))" ondragover="event.preventDefault();" row="' +
        i +
        '">' +
        '					<input id="row' +
        i +
        '_option" class="trackID" disabled value="" row="' +
        i +
        '">' +
        '					<br row="' +
        i +
        '">' +
        '					<input class="volumeSlider" type="range" min="1" max="100" value="100" id="volume_' +
        i +
        '" onchange="Mixer.changeVolume(' +
        i +
        ', this.value);" row="' +
        i +
        '">' +
        "				</div>" +
        '				<div id="rightbox" class="rightbox-' +
        i +
        '"></div>' +
        "			</div>";
    }
    getById("rows-collection").innerHTML = rows;
  },

  setRow(row: number) {
    const rightbox = getFirstByClass("rightbox-" + row);
    if (!rightbox) return;

    if (this._slots[row] != null && this._slots[row] !== "_") {
      rightbox.innerHTML = buildStepsLayout(row, this.getLengthInSeconds(row)) || "";
    } else {
      rightbox.innerHTML = "";
    }
  },

  toggle(row: number, tab: number) {
    const el = document.getElementById("s_" + row + "_" + tab);
    if (!el) return;

    if (el.getAttribute("selected") === "0") {
      el.setAttribute("selected", "1");
      el.setAttribute("src", "assets/images/tabs/2s_clear_enabled.png");
    } else {
      el.setAttribute("selected", "0");
      el.setAttribute("src", "assets/images/tabs/2s_clear.png");
    }

    StepSequence.buildSequence();
  },

  changeSampleAtRow(row: number) {
    const input = getById<HTMLInputElement>("row" + row + "_option");
    Mixer.setSample(input.value, row);
    Mixer.setRow(row);
  },

  playStopButton() {
    const playButton = getById("playButton");
    if (playButton.getAttribute("state") === "stopped") {
      playButton.setAttribute("class", "s_playing");
      playButton.setAttribute("state", "playing");
      StepSequence.playTrack();
    } else {
      playButton.setAttribute("class", "s_stopped");
      playButton.setAttribute("state", "stopped");
      StepSequence.stop();
    }
  },

  clearAll() {
    StepSequence.stop();
    Mixer.buildBlankRows();

    for (let row = 0; row <= 5; row++) StepSequence._set[row] = [];
    StepSequence.buildSequence();

    const playButton = getById("playButton");
    playButton.setAttribute("class", "s_stopped");
    playButton.setAttribute("state", "stopped");
  },

  save() {
    Interface.showInput("Save Track", "Name this track", "New Track 1", (results) => {
      if (results != null) {
        if (localStorage.getItem("savedTracks") == null) {
          localStorage.setItem("savedTracks", JSON.stringify([]));
        }

        const tracks = JSON.parse(localStorage.getItem("savedTracks") || "[]");
        tracks.push(
          results.value +
            "||[/@]/@||" +
            0 +
            "||[/@]/@||" +
            JSON.stringify(StepSequence._set)
        );

        localStorage.setItem("savedTracks", JSON.stringify(tracks));

        Mixer.loadExistingTracks();

        Interface.showMessage("Saved", "Your track has been saved!", undefined, { yes: true });
      }
    });
  },

  share() {
    window.lzmalib.compress(
      JSON.stringify(0 + "||[/@]/@||" + JSON.stringify(StepSequence._set)),
      1,
      function on_compress_complete(str: any) {
        const shareable = str.toString().replaceAll(",", " ");
        const content =
          'Here is your share key:<br><textarea name="textarea" rows="10" cols="40">' +
          shareable +
          '</textarea><br>or, <a href="https://is.gd/create.php?url=' +
          encodeURI(
            "https://markhughes.github.io/CSMusicMixer/index.html?load=" + btoa(shareable)
          ) +
          '">click here</a> to get a share link.';
        Interface.showMessage("Share this!", content, undefined, { yes: true });
      }
    );
  },

  doImport(str: string) {
    showStage("load");
    loadingStatus("Loading track ...");

    window.lzmalib.decompress(str.split(" "), function on_decompress_complete(out: string) {
      const data = out.split("||[/@]/@||");
      showStage("mixer");
      const filtered_string = data[1].replace(/\\"/g, '"');

      Mixer.doLoad(
        data[0].substring(1),
        filtered_string.substring(0, filtered_string.length - 1),
        true
      );
    });
  },

  importDefaultForPack(pack: string | null) {
    if (!pack) return;
    if (Packs.defaultTracks[pack] == null) return;

    window.lzmalib.decompress(Packs.defaultTracks[pack].split(" "), function on_decompress_complete(out: string) {
      const data = out.split("||[/@]/@||");
      showStage("mixer");
      const filtered_string = data[1].replace(/\\"/g, '"');

      Mixer.doLoad(
        data[0].substring(1),
        filtered_string.substring(0, filtered_string.length - 1),
        true,
        true
      );
    });
  },

  changeVolume(row: number, value: string) {
    const sound = Packs.getSound(Mixer.getSample(row));
    if (!sound) return;
    sound.volume(Number(value) / 100);
  },

  droppedOn(event: any) {
    const elementTo = event.relatedTarget || event.toElement || event.target;
    const row = elementTo.getAttribute("row");
    const input = getById<HTMLInputElement>("row" + row + "_option");
    input.value = window.dragID || "";
    Mixer.changeSampleAtRow(Number(row));
    return false;
  },
};


