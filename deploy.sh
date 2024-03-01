#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

if [[ ! -d "./.git" ]]
then
  echo "Initializing GIT repository..."
  git init
fi

git add -A
git commit -m "new deployment `date +'%d-%m-%Y %H:%M'`"

# push to gh-pages branch
git push -f https://github.com/felmarlop/planbchannels.git master:gh-pages

cd -
echo "Deployment finished!"