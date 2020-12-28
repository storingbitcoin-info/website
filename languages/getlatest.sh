#!/bin/bash
read -p "Open https://storingbitcoin.info/?makejson in a browser and store file here $(readlink -f ./en.json) as en.json"
git add en.json
git commit
git push
