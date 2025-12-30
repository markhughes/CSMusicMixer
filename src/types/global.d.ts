declare global {
  // Minimal globals provided by third-party libraries loaded via <script> tags.
  const LZMA: any;

  interface Window {
    lzmalib?: any;
    dragID?: string;
    previewSound?: any;

    // Legacy globals we keep exporting for HTML inline handlers + pack scripts.
    Mixer?: any;
    Packs?: any;
    StepSequence?: any;
    Interface?: any;
    Txt?: any;

    loadingStatus?: (txt: string) => void;
    showStage?: (stage: string) => void;
    openMixer?: () => void;
    showImport?: () => void;
    runFixes?: () => void;
    help?: () => void;
  }
}

export {};


