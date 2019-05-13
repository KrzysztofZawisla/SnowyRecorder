const recordDiv:any = document.getElementById("record");
const logger:any = console;
let recordStatue:boolean = false;
let darkMode:boolean = false;

const options = {
   program: <string>`sox`,
   device: null,
   bits: <number>32,
   channels: <number>1,
   encoding: <string>`signed-integer`,
   format: <string>`S32_LE`,
   rate: <number>rate,
   type: <string>`wav`,
   keepSilence: <boolean>true
};

let audioRecorder:any = new AudioRecorder(options, logger);

function changeRecord():void {
   ipcRenderer.send("ChangeRecord", true);
   if (recordStatue === false) {
      let fileName:string = path.join(output, Math.random().toString(36).replace(/[^a-z]+/g, ``).substr(0, 4).concat(`.wav`));
      let fileStream:any = fs.createWriteStream(fileName, { encoding: `binary` });
      audioRecorder.start().stream().pipe(fileStream);
      recordDiv.style.color = "#f44336";
      recordStatue = true;
   } else {
      audioRecorder.stop()
      darkMode === false ? recordDiv.style.color = "#222" : recordDiv.style.color = "#f9f9f9";
      recordStatue = false;
   }
}

ipcRenderer.on("RecordCall", (e, res):void => {
   changeRecord();
});

ipcRenderer.on("DarkMode", (e, res):void => {
   darkMode === false ? darkMode = true : darkMode = false;
   if (recordStatue === false && darkMode === true) {
      document.body.style.backgroundColor = "#222";
      recordDiv.style.color = "#f9f9f9";
   } else if (recordStatue === false && darkMode === false) {
      document.body.style.backgroundColor = "#f9f9f9";
      recordDiv.style.color = "#222";
   }
});