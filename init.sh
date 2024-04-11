#!/bin/bash

# Define file paths
WEB_PAGE_REPLAY_ZIP="web_page_replay_go.zip"
GECKODRIVER_TAR_GZ="geckodriver-v0.34.0-linux64.tar.gz"
FIREFOX_TAR_BZ2="firefox-116.0.en-US.linux-x86_64.tar.bz2"
FOXHOUND_TAR_BZ2="foxhound-114.0.2.en-US.linux-x86_64.tar.bz2"
JEST_ZIP="jest.zip"

# Function to decompress files
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

# Decompress files
decompress_files "$WEB_PAGE_REPLAY_ZIP"
decompress_files "$GECKODRIVER_TAR_GZ"
decompress_files "$FIREFOX_TAR_BZ2"
decompress_files "$FOXHOUND_TAR_BZ2"
decompress_files "$JEST_ZIP"

# Execute npm i in if-transpiler directory
echo "Executing 'npm i' in if-transpiler directory..."
(cd if-transpiler && npm i)

# Execute npm i in jalangi2 directory
echo "Executing 'npm i' in jalangi2 directory..."
(cd jalangi2 && npm i)

# Execute npm i and npm run build in aran-linvail directory
echo "Executing 'npm i' and 'npm run build' in aran-linvail directory..."
(cd aran-linvail && npm i && npm run build)

echo "Script execution completed successfully."
