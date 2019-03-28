const dragbar = document.getElementById("dragbar");

function dragbarChange() {
  dragbar.innerHTML = "Przytrzyjmaj tą belkę aby przesunąć program";
  setTimeout(() => {
    dragbar.innerHTML = "Ctrl+Q - wyjście";
  }, 5000);
  setTimeout(() => {
    dragbar.innerHTML = "Ctrl+R - przeładowanie";
  }, 10000);
  setTimeout(() => {
    dragbar.innerHTML = "Ctrl+Shift+R - restart";
  }, 15000);
  setTimeout(dragbarChange, 20000);
}

dragbarChange();
