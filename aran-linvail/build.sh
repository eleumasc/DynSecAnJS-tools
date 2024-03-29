#!/bin/bash

# Remove existing build directory if it exists
rm -rf build

# Create new build directory
mkdir build

# Copy contents of lib directory to build directory
cp -r lib/* build/

# Copy files from template directory to each subdirectory of build
for dir in build/*/; do
    cp -r template/* "$dir"
    npx browserify "$dir/setup.js" > "$dir/bundle.js"
done
