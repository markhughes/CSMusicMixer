import { getById, getFirstByClass } from "./dom";
import { Packs } from "./packs";
import { Mixer } from "./mixer";

export type StepSet = Array<Array<string>>;

export const StepSequence = {
  _timers: [] as Array<number | null>,
  _set: [] as StepSet,
  timeLine: null as number | null,

  objCounts: 0,
  objs: [] as any[],

  gc() {
    this.objs = [];
    this.objCounts = 0;
  },

  set(set: StepSet) {
    this._set = set;
  },

  playRow(row: number) {
    if (this._set[row] == null || this._set.length === 0) return;
    this.playPointer(row, 0);
  },

  playPointer(row: number, at: number) {
    if ((this._set[row].length - 1) < 0) return;

    if (this._set[row][at] !== "_" && this._set[row][at] !== "") {
      this.objs[this.objCounts] = Packs.getSound(Mixer.getSample(row));
      this.objs[this.objCounts].play();
      this.objCounts++;
    }

    const nextAt = at + 1;
    if (this._set[row].length - 1 >= nextAt) {
      this._timers[row] = window.setTimeout(() => {
        this.playPointer(row, nextAt);
      }, Mixer.getLengthInSeconds(row) * 1000);
    } else {
      this._timers[row] = null;
    }
  },

  playTrack() {
    this.timeLine = window.setInterval(() => {
      this.moveTimeline();
    }, 110);

    for (let row = 0; row <= 5; row++) {
      if (this._set[row] != null) this.playRow(row);
    }
  },

  buildSequence() {
    this._set = [];

    for (let row = 0; row <= 5; row++) {
      const rightbox = getFirstByClass(`rightbox-${row}`);
      const imgs = rightbox?.getElementsByTagName("img") ?? [];

      this._set[row] = [];
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].getAttribute("selected") === "1") {
          this._set[row][i] = Mixer.getSample(row);
        } else {
          this._set[row][i] = "";
        }
      }
    }
  },

  _at: 0,

  moveTimeline() {
    this._at = this._at + 0.055;

    const timeline = getById("timeline-container");
    const leftPx = parseInt(timeline.style.left.replace("px", ""), 10);
    timeline.style.left = `${leftPx + 1}px`;

    getById("timeline-seconds").innerHTML = `${Math.floor(this._at)}s`;

    if (this._at >= 60) {
      Mixer.playStopButton();
      this.stop();
    }
  },

  stop() {
    for (let row = 0; row <= 5; row++) {
      const t = this._timers[row];
      if (t != null) clearTimeout(t);
      this._timers[row] = null;
    }

    this.objs.forEach((o) => {
      o.stop?.();
      o.setPosition?.(0);
    });

    if (this.timeLine != null) clearInterval(this.timeLine);
    this.timeLine = null;
    this._at = 0;

    this.gc();

    getById("timeline-container").style.left = "220px";
    getById("timeline-seconds").innerHTML = "0s";
  },
};


