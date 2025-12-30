import { getFirstByClass } from "./dom";

type InterfaceCallback = (selection: boolean) => void;

export const Interface = {
  callBacks: {} as Record<string, InterfaceCallback | undefined>,

  showMessage(
    _title: string,
    content: string,
    callback?: InterfaceCallback,
    options?: { cancel?: boolean; yes?: boolean }
  ) {
    const messageBox = document.createElement("div");

    messageBox.id = "messageBox";
    messageBox.className =
      "messageBox-" + Math.floor(Math.random() * 9999 + 1000);

    this.callBacks[messageBox.className] = callback;

    // Core content
    messageBox.innerHTML = "<br><br><br><span>" + content + "</span><br><br>";

    const buttonRow = document.createElement("div");
    buttonRow.style.textAlign = "center";

    const wantsCancel = options ? !!options.cancel : true;
    const wantsYes = options ? !!options.yes : true;

    let cancelButton: HTMLImageElement | null = null;
    let yesButton: HTMLImageElement | null = null;

    if (wantsCancel) {
      cancelButton = document.createElement("img");
      cancelButton.id = "cancel_button";
      cancelButton.src = "assets/images/interface_cancel.png";
      cancelButton.alt = "0";
      cancelButton.width = options ? 70 : 60;
      cancelButton.onclick = () => this.callbackOMatic(messageBox.className, false);
      buttonRow.appendChild(cancelButton);
    }

    if (wantsYes) {
      yesButton = document.createElement("img");
      yesButton.id = "yes_button";
      yesButton.src = "assets/images/interface_yes.png";
      yesButton.alt = "0";
      yesButton.width = options ? 70 : 60;
      yesButton.onclick = () => this.callbackOMatic(messageBox.className, true);
      if (wantsCancel) buttonRow.appendChild(document.createTextNode(" "));
      buttonRow.appendChild(yesButton);
    }

    messageBox.appendChild(buttonRow);

    document.getElementsByTagName("body")[0].appendChild(messageBox);

    cancelButton?.focus?.();
    yesButton?.focus?.();
  },

  showInput(
    title: string,
    content: string,
    defaultValue: string,
    callback?: (results: { value: string } | null) => void
  ) {
    content +=
      '<br><br><input type="text" id="i_inputbox" value="' +
      defaultValue +
      '" onkeydown="if (event.keyCode == 13) document.getElementById(\'yes_button\').click();"/>';

    this.showMessage(title, content, (selection: boolean) => {
      if (selection) {
        const value = (document.getElementById("i_inputbox") as HTMLInputElement)
          .value;
        callback?.({ value });
      } else {
        callback?.(null);
      }
    });

    (document.getElementById("i_inputbox") as HTMLInputElement | null)?.select?.();
  },

  callbackOMatic(callbackId: string, c: boolean) {
    const cb = this.callBacks[callbackId];
    if (cb) cb(c);

    getFirstByClass(callbackId)?.remove();
  },
};


