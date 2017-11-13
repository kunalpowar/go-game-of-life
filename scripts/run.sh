#!/bin/bash -e

source $(dirname "$0")/common.sh

pushd $ROOT_DIR
go run *.go
popd