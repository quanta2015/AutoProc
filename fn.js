const fs = require('fs');
const { spawn } = require("child_process");


const CrReset  = "\x1b[0m"
const FgYellow = "\x1b[33m"
const FgWhite  = "\x1b[1m"
const debug    =(e)=> console.log(`${FgYellow}${e}${CrReset}`)
const succ     =(e)=> console.log(`${FgWhite}${e}${CrReset}`)
const PKG_FILE     = `package.json`

const cmd = async(CMD,info)=>{
  return new Promise(resolve => {
    info && debug(info)
    let params = CMD.split(' ')
    let child = spawn(params[0], params.slice(1), {
      cwd: process.cwd(),
      detached: true,
      stdio: "inherit"
    });

    child.on('error', (code) => {
      console.log('error', code)
      process.exit(1);
    });

    child.on('close', (code) => {
      if (code === 0) {
        info && succ('successful!')
        resolve()
      }else{
        process.exit(1);
      }
    });
  })
}

const version = ()=> {
  debug(INFO_VERSION)
  const data = fs.readFileSync(PKG_FILE,{encoding:'utf8', flag:'r'})
  const pkg = JSON.parse(data)
  const ver = pkg.version
  const arr = ver.split('.')
  const len = arr.length-1
  arr[len] = `${parseInt(ver.split('.')[len])+1}`
  pkg.version = arr.join('.')
  const file = JSON.stringify(pkg, null, 4)
  fs.writeFileSync(PKG_FILE, file)
  succ('successful!')
}


exports.cmd = cmd
exports.version = version