RUN=0
for VAR in $(git diff-tree --no-commit-id --name-only -r HEAD~1..HEAD)
do
  if [[ $VAR == assets/post/*/*[.jpg.jpeg.JPG.JPEG.gif.GIF.png.PNG] && $(echo $VAR | grep -e "/card_" -e "/item_") == "" ]]; then
    RUN=1
  fi
done

if [[ $RUN == 1 ]]; then
  for VAR in $(git diff-tree --no-commit-id --name-only -r HEAD~1..HEAD)
  do
    if [[ $VAR == assets/post/*/*[.jpg.jpeg.JPG.JPEG.gif.GIF.png.PNG] && $(echo $VAR | grep -e "/card_" -e "/item_") == "" ]]; then
      bash ./createThumbnail.sh $VAR
    fi
  done
  
else
  echo "No new image found."
fi
