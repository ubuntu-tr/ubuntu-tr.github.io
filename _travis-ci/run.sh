cd _travis-ci
git diff-tree --no-commit-id --name-only -r HEAD~1..HEAD
find . -maxdepth 1 -type d -name [^\.]\* | sed 's:^\./::'
for VAR2 in $(find . -maxdepth 1 -type d -name [^\.]\* | sed 's:^\./::')
do
	cd $VAR2
	bash run.sh
	cd ..
done

cd ..
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git add .
git commit --message "[BOT] Makale için otomatik ayarlamalar yapıldı. [skip ci]"
git push https://${GH_TOKEN}@github.com/ubuntu-tr/ubuntu-tr.github.io.git HEAD:master
