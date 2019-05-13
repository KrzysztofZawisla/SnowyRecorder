const argResult:any = remote.process.argv;
const argOne:any = argResult[1];
const argTwo:any = argResult[2];
let rate:number = 48000;
let output:string = os.homedir() + "\\Desktop";

function argHandling():void {
   if (argOne != undefined) {
      if (argOne != "") {
         if (argOne == "def" || argOne == "default" || argOne == ".") {
            rate = 48000;
         } else {
            let argOneInt:number = parseInt(argOne, 10);
            rate = argOneInt;
         }
      }
   }
   if (argTwo != undefined) {
      if (argTwo != "") {
         if (argTwo == "def" || argTwo == "default" || argTwo == ".") {
            output = os.homedir() + "\\Desktop";
         } else {
            output = argTwo;
         }
      }
   }
}

argHandling();