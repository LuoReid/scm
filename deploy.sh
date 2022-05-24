#! /usr/bin/env sh

set -env
 npm run build

 cd dist

 git init 
 git checkout -b gitio
 git add -A
 git commit -m 'deploy'

 # if you deploy https://luoreid.github.io
 git push -f git@github.com:luoreid/luoreid.github.io.git master

 # if you deploy https://luoreid.github.io/<REPO>
 # git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

 cd -