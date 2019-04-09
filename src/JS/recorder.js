const recordDiv = document.getElementById("record");
const logger = console;
let recordStatue = false;

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
  if(recordStatue === false) {
    let fileName = path.join(output, Math.random().toString(36).replace(/[^a-z]+/g, ``).substr(0, 4).concat(`.wav`));
    let fileStream = fs.createWriteStream(fileName, { encoding: `binary` });
    audioRecorder.start().stream().pipe(fileStream);
    recordDiv.style.color = "#f44336";
    recordStatue = true;
  } else {
    audioRecorder.stop()
    recordDiv.style.color = "#111";
    recordStatue = false;
  }
}

ipcRenderer.on("RecordCall", (e, res) => {
  changeRecord();
});
