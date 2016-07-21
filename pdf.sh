#!/bin/bash

FILES=./_posts/*
#FILES=./_posts/2016-04-19-pyhton-programlama-seri-i.md
#FILES=./_posts/2016-04-13-bash-3.md
latexTemplate="_extension/helper/_pdf.latex"
mainFont="Times New Roman"
for f in $FILES
do
  echo "Processing $f file..."
  f2=$(cat $f | grep -m 1 'permalink:' | awk '{print $2}' | sed 's/\r//g;s/\"//g')
  fo="images/post/$f2/$f2.pdf"
  pandoc -f markdown+hard_line_breaks -s --template=$latexTemplate  --variable mainfont="$mainFont" --latex-engine=xelatex --toc  $f -o $fo --chapters  -V documentclass=report --listings --variable lang=turkish --variable babel-lang=turkish --variable polyglossia-lang=turkish -N
done