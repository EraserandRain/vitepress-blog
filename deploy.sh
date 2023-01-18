#!/bin/bash
export LC_ALL=C
CURRENT_DATE=$(date -d '0 day' '+%Y%m%d')

set -e
pnpm docs:build
cd ./public/
echo "Personal Blog built with vitepress + github-pages" > README.md
echo "【[https://eraserandrain.github.io/](https://eraserandrain.github.io/)】" >> README.md
git init
git add -A
git commit -m "deploy_${CURRENT_DATE}"
git push -f git@github.com:EraserandRain/EraserandRain.github.io.git master:master
cd -
echo 'deploy success!'
exit 0