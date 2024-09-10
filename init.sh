#!/bin/bash

WPRGO_ZIP="web_page_replay_go.zip"
FOXHOUND_ZIP="foxhound.zip"

decompress_files() {
    echo "Decompressing $1..."
    if [[ $1 == *.zip ]]; then
        unzip -q "$1"
    elif [[ $1 == *.tar.gz ]]; then
        tar -xzf "$1"
    elif [[ $1 == *.tar.bz2 ]]; then
        tar -xjf "$1"
    else
        echo "Unsupported file format: $1"
        exit 1
    fi
}

echo "Decompressing WPRGO..."
decompress_files "$WPRGO_ZIP"

echo "Decompressing Project Foxhound..."
decompress_files "$FOXHOUND_ZIP"

echo "Setting up JEST..."
(cd jest && stack build)

echo "Setting up IF-Transpiler..."
(cd if-transpiler && npm i)

echo "Setting up GIFC..."
(cd gifc && npm i && npm run init)

echo "Setting up linvail-taint..."
(cd linvail-taint && npm i && npm run init)

echo "Setting up Jalangi2..."
(cd jalangi2 && npm i)

echo "Script execution completed successfully."
