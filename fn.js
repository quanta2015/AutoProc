const fs = require('fs');
const { exec,spawn,spawnSync } = require("child_process");
const isClean = require('git-is-clean')


const CrReset  = "\x1b[0m"
const FgYellow = "\x1b[33m"
const FgWhite  = "\x1b[1m"

const format   =(e)=> `\n${LINE}${e}\n${LINE}`
const debug    =(e)=> console.log(`${FgYellow}${e}${CrReset}`)
const succ     =(e)=> console.log(`${FgWhite}${e}${CrReset}`)

const LINE         = `------------------\n`
const INFO_COMMIT  = format('请先提交代码!')
const INFO_ESLINT  = format('检查代码规范...')
const INFO_PRETTEY = format('格式化代码中...')
const INFO_VERSION = format('修改工程版本!')
const INFO_BUILD   = format('编译代码中...')
const INFO_PUSH    = format('提交代码中...')
const ERR_FILE     = `err_eslint`
const PKG_FILE     = `package.json`
const CMD_ESLINT   = `npm run eslint`
const CMD_ADDFILE  = `git add .`
const CMD_PRETTEY  = `npm run prettier`
const CMD_BUILD    = `npm run build`
const CMD_PUSH     = `npm publish`

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