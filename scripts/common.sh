#!/bin/bash -e

CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR=$CURR_DIR/..
WEB_DIR=$ROOT_DIR/web

function build() {
    pushd $WEB_DIR
    npm run-script build
    popd
}