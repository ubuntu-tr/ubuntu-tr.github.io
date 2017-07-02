cd ..
cd ..

AA=$(echo $1 | rev)
DEST_CARD=$(echo ${AA/\//_drac\/} | rev)
DEST_ITEM=$(echo ${AA/\//_meti\/} | rev)
convert -resize 370X220! $1 $DEST_CARD
convert -resize 80 $1 $DEST_ITEM

cd _travis-ci/thumbnail
