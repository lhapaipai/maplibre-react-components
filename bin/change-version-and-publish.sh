#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$(readlink -f "$BASH_SOURCE")")"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

set -e

cd "$PROJECT_DIR"

# Make sure the working directory is clear.
if [[ ! -z "$(git status --porcelain)" ]]
then
    echo "Your working directory is dirty. Did you forget to commit your changes?"
    exit 1
fi

VERSION_TYPE="$1"

if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" ]]; then
  echo "Error version type must be 'patch', 'minor' or 'major'."
  exit 1
fi

# vX.Y.Z
VERSION=$(npm --no-git-tag-version --allow-same-version version $VERSION_TYPE)

# we remove the v
VERSION=${VERSION:1}


pnpm build

git add .
git commit -m "change version $VERSION"

git tag -a $VERSION -m $VERSION

git push origin

cd "$PROJECT_DIR/dist"

pnpm publish

