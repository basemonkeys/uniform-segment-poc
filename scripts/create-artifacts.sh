#!/bin/bash

mkdir -p artifacts
cd .open-next/server-function
zip --no-dir-entries -r ../../artifacts/server-function.zip .

cd ../warmer-function
zip --no-dir-entries -r ../../artifacts/warmer-function.zip .

cd ../revalidation-function
zip --no-dir-entries -r ../../artifacts/revalidation-function.zip .

cd ../image-optimization-function
zip --no-dir-entries -r ../../artifacts/image-optimization-function.zip .