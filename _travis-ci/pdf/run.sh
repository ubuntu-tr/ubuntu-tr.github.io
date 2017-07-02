RUN=0
for VAR in $(git diff-tree --no-commit-id --name-only -r HEAD~1..HEAD)
do
  if [[ $VAR == _posts/*.md ]]; then
    RUN=1
  fi
done

if [[ $RUN == 1 ]]; then
  bash ./install.sh
  
  for VAR in $(git diff-tree --no-commit-id --name-only -r HEAD~1..HEAD)
  do
    if [[ $VAR == _posts/*.md ]]; then
      bash ./createPdf.sh $VAR
    fi
  done
  
else
  echo "No new post found."
fi
