DIRECTORY='scripts'


npx husky install


npx husky add .husky/pre-commit "exec 1>&2" 
npx husky add .husky/pre-commit "exec < /dev/tty" 
npx husky add .husky/pre-commit "npx eslint --fix --ext .js,.jsx,.ts,.tsx src" 
npx husky add .husky/pre-commit "npx stylelint 'src/**/*.less' --syntax less" 
npx husky add .husky/pre-commit "npm run prettier" 
npx husky add .husky/pre-commit "node script/preCommit.js" 
npx husky add .husky/pre-commit "git add ." 


npx husky add .husky/post-commit "git push && npm run build && npm publish" 

git clone git@github.com:quanta2015/AutoProc.git

if [ -d "$DIRECTORY" ]; then
  cp ./AutoProc/preCommit.js ./scripts
  rm -rf ./AutoProc
else
  mv ./AutoProc ./scripts
fi
