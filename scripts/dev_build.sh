#!/bin/bash -e

source $(dirname "$0")/common.sh

pushd $WEB_DIR
npm run-script watch