CURRENT_DATE := $(shell date -d '0 day' '+%Y%m%d')

deploy:
	pnpm build
	cd ./public/
	echo "Personal Blog built with vitepress + github-pages" > README.md
	echo "【[https://eraserandrain.github.io/](https://eraserandrain.github.io/)】" >> README.md
	git init
	git add -A
	git commit -m "deploy_$(CURRENT_DATE)"
	git push -f git@github.com:EraserandRain/EraserandRain.github.io.git master:master
	cd -
	echo 'deploy success!'