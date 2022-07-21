/*----------------------
// 1. call eslint
// 2. run prettier
// 3. add version + 1
// 4. npm run build
// 5. publish
------------------------*/

const {cmd, version} = require("./fn")

const format       =(e)=> `\n${LINE}${e}\n${LINE}`
const LINE         = `------------------\n`
const INFO_COMMIT  = format('请先提交代码!')
const INFO_ESLINT  = format('检查代码规范...')
const INFO_PRETTEY = format('格式化代码中...')
const INFO_VERSION = format('修改工程版本!')
const INFO_BUILD   = format('编译代码中...')
const INFO_PUSH    = format('提交代码中...')
const CMD_ESLINT   = `npx eslint --fix --ext .js,.jsx,.ts,.tsx src`
const CMD_PRETTEY  = `npx prettier --write src/**/*.{js,jsx,tsx,ts,less,md,json}`
const CMD_ADDFILE  = `git add .`
const CMD_BUILD    = `npm run build`
const CMD_PUSH     = `npm publish`

const run =async()=>{
  // 1. 检查代码格式
  await cmd(CMD_ESLINT, INFO_ESLINT)

  // 2. 格式化代码
  await cmd(CMD_PRETTEY,INFO_PRETTEY)

  // 3. 添加版本号
  version()

  // 4. 执行 git add .
  await cmd(CMD_ADDFILE, null)

  // 5. 编译代码
  await cmd(CMD_BUILD,INFO_BUILD)

  // 检查代码是否提交
  // const clean = await isClean()
  // if (!clean) {
  //   console.log(INFO_COMMIT)
  //   process.exit(1);
  // }

  // // 提交项目
  // await cmd(CMD_PUSH,INFO_PUSH)
}

run()
