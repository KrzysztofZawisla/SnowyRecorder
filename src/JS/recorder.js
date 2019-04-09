const recordDiv = document.getElementById("record");
const logger = console;
let recordStatue = false;
let darkMode = false;

const options = {
  program: `sox`,
  device: null,
  bits: 32,
  channels: 1,
  encoding: `signed-integer`,
  format: `S32_LE`,
  rate: rate,
  type: `wav`,
  keepSilence: true
};

let audioRecorder = new AudioRecorder(options, logger);

function changeRecord() {
  ipcRenderer.send("ChangeRecord", true);
  if(recordStatue === false) {
    let fileName = path.join(output, Math.random().toString(36).replace(/[^a-z]+/g, ``).substr(0, 4).concat(`.wav`));
    let fileStream = fs.createWriteStream(fileName, { encoding: `binary` });
    audioRecorder.start().stream().pipe(fileStream);
    recordDiv.style.color = "#f44336";
    recordStatue = true;
  } else {
    audioRecorder.stop()
    darkMode === false ? recordDiv.style.color = "#222" : recordDiv.style.color = "#f9f9f9";
    recordStatue = false;
  }
}

ipcRenderer.on("RecordCall", (e, res) => {
  changeRecord();
});

ipcRenderer.on("DarkMode", (e, res) => {
  darkMode === false ? darkMode = true : darkMode = false;
  if(recordStatue === false && darkMode === true) {
    document.body.style.backgroundColor = "#222";
    recordDiv.style.color = "#f9f9f9";
  } else if (recordStatue === false && darkMode === false) {
    document.body.style.backgroundColor = "#f9f9f9";
    recordDiv.style.color = "#222";
  }
});
