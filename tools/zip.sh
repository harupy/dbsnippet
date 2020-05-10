#!/usr/bin/env bash 

./tools/build.sh

if [ -f dist.zip ]; then
  rm dist.zip
fi

zip -r dist.zip dist/
