
const isClean = require('git-is-clean')

const format       =(e)=> `\n${LINE}${e}\n${LINE}`
const LINE         = `------------------\n`
const INFO_COMMIT  = format('请先提交代码!')


const run =async()=>{
  // 检查代码是否提交
  const clean = await isClean()
  if (!clean) {
    console.log(INFO_COMMIT)
    process.exit(1);
  }
}

run()
