const argResult = remote.process.argv;
const argOne = argResult[1];
const argTwo = argResult[2];
let rate = 48000;
let output = os.homedir()+"\\Desktop";

function argHandling() {
  if(argOne != undefined) {
    if(argOne != "") {
      if(argOne == "def" || argOne == "default" || argOne == ".") {
        rate = 48000;
      } else {
        let argOneInt = parseInt(argOne, 10);
        rate = argOneInt;
      }
    }
  }
  if(argTwo != undefined) {
    if(argTwo != "") {
      if(argTwo == "def" || argTwo == "default" || argTwo == ".") {
        output = os.homedir()+"\\Desktop";
      } else {
        output = argTwo;
      }
    }
  }
}

argHandling();
