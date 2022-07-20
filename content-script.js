(() => {
  let isAltCtrlPressed = false;
  let isMouseUp = true;
  let scheduleAfterMouseUp = false;

  const findWord = () => {
    if (!isAltCtrlPressed) {
      return;
    }
    if (!isMouseUp) {
      scheduleAfterMouseUp = true;
      return;
    }
    const selection = window.getSelection();
    if (!selection || selection.rangesCount == 0) {
      return;
    }
    let text = selection.getRangeAt(0).toString();
    if (text) {
      openModal(text.trim());
    }
  };

  const getModal = () => {
    return document.getElementById("wh-modal");
  };

  const openModal = (text) => {
    if (getModal()) {
      return;
    }
    modal = document.createElement("div");
    modal.setAttribute("id", "wh-modal");
    modal.addEventListener("click", deleteModal);

    const content = document.createElement("div");
    content.setAttribute("id", "wh-modal-content");

    const iframe = document.createElement("iframe");
    iframe.setAttribute("id", "wh-iframe");
    iframe.setAttribute("src", "https://wooordhunt.ru/word/" + text);

    content.appendChild(iframe);
    modal.appendChild(content);
    document.body.appendChild(modal);
  };

  const deleteModal = () => {
    const modal = getModal();
    if (modal) {
      modal.remove();
    }
  };

  document.addEventListener("selectionchange", () => {
    findWord();
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey) {
      isAltCtrlPressed = true;
    }
    if (e.key == "Escape") {
      deleteModal();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (!e.ctrlKey || !e.altKey) {
      isAltCtrlPressed = false;
    }
  });

  document.addEventListener("mousedown", () => {
    isMouseUp = false;
  });

  document.addEventListener("mouseup", () => {
    isMouseUp = true;
    if (scheduleAfterMouseUp) {
      scheduleAfterMouseUp = false;
      findWord();
    }
  });
})();
