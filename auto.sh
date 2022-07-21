DIRECTORY='scripts'


npx husky install
npx husky add .husky/pre-commit "node scripts/preCommit.js" 
npx husky add .husky/post-commit "git push && npm publish" 
git clone git@github.com:quanta2015/AutoProc.git

if [ -d "$DIRECTORY" ]; then
  cp ./AutoProc/*.js ./scripts
  rm -rf ./AutoProc
else
  mv ./AutoProc ./scripts
fi



npm version major 结果0.0.1->1.0.0
npm version minor 结果0.0.1->0.1.0
npm version patch 结果0.0.1->0.0.2