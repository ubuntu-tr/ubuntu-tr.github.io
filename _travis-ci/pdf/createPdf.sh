#!/bin/bash

cd ..
cd ..
mkdir temp
cp $1* temp/

FILES=./temp/*
latexTemplate="_travis-ci/pdf/_pdf.latex"
mainFont="Ubuntu"
lang="turkish"
for f in $FILES
do
  echo "Processing $f file..."
  f2=$(cat $f | grep -m 1 'permalink:' | awk '{print $2}' | sed 's/\r//g;s/\"//g')
  fo="assets/post/$f2/$f2.pdf"

  sed -i -- 's/{{ site.assetsDir }}{{ page.permalink }}/assets\/post\/'$f2'/g' $f
  
  pandoc -f markdown+hard_line_breaks -s --template=$latexTemplate  --variable mainfont="$mainFont" --latex-engine=xelatex --toc  $f -o $fo --chapters  -V documentclass=report --listings --variable lang=$lang --variable babel-lang=$lang --variable polyglossia-lang=$lang -N
done

rm -r temp
cd _travis-ci/pdf
