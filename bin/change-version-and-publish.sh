#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$(readlink -f "$BASH_SOURCE")")"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"
PACKAGE_DIR="$WORKSPACE_DIR/packages/maplibre-react-components"

set -e

cd "$WORKSPACE_DIR"

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

cd "$PACKAGE_DIR"

npm --no-git-tag-version --allow-same-version version "$VERSION"

pnpm build

cd "$WORKSPACE_DIR"

git add .
git commit -m "change version $VERSION"

git tag -a "$VERSION" -m "$VERSION"

git push origin

cd "$PACKAGE_DIR/dist"

pnpm publish

