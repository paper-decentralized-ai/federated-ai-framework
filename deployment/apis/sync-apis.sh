#!/bin/bash
set -e

if [ ! -f .env.config ]; then
  echo "Error: .env.config file not found"
  exit 1
fi
set -a
source .env.config
set +a

npm_install() {
    REGISTRY="$1"
    PACKAGE_NAME="$2"
    VERSION="$3"

    max_attempts=5
    attempt=1

    echo "Installing from registry..."

    while [ $attempt -le $max_attempts ]; do
        echo "Attempt $attempt..."

        if npm install --prefer-online --registry "$REGISTRY" "${PACKAGE_NAME}@${VERSION}"; then
            echo "Install succeeded"
            return 0
        fi

        if [ $attempt -eq $max_attempts ]; then
            echo "Install failed after $max_attempts attempts"
            return 1
        fi

        sleep_time=$((attempt * 2))
        echo "Retrying in $sleep_time seconds..."
        sleep $sleep_time

        attempt=$((attempt + 1))
    done
}

publish_sdk() {
  local SERVICE_PATH=$1
  local CLIENT_NAME=$2

  echo "Syncing $CLIENT_NAME..."

  (
    cd "$SERVICE_PATH/scripts" && ./sync_api.sh

    VERSION=$(jq -r '.info.version' "../sdks/openapi.json")
#    echo "Version from toml: $VERSION"
#    TIMESTAMP=$(date +%s)
#    DEV_VERSION="$VERSION-dev.$TIMESTAMP"

    cd "../sdks/$CLIENT_NAME"
    #npm version "$VERSION" --no-git-tag-version

    REGISTRY="https://gitlab-edu.supsi.ch/api/v4/projects/1401/packages/npm/"
    echo "@paper-decentralized-ai:registry=${REGISTRY}" > .npmrc
    echo "//gitlab-edu.supsi.ch/api/v4/projects/1401/packages/npm/:_authToken=${PACKAGE_REGISTRY_TOKEN}" >> .npmrc

    npm publish --tag prod --registry "$REGISTRY"

    cd ../../../../frontend
    PACKAGE_NAME="@paper-decentralized-ai/${CLIENT_NAME}"

    #if wait_for_npm_package "$PACKAGE_NAME" "$VERSION" "$REGISTRY"; then
    echo "Installing from registry..."
    npm_install "$REGISTRY" "$PACKAGE_NAME" "$VERSION"
    #else
     # echo "Registry lookup failed; client package is not reachable from GitLab Package Registry."
     # exit 1
    #fi
  )
  echo "Published $CLIENT_NAME@$VERSION"
}

publish_sdk "../../institute/data-service" "data-service-client"
#publish_sdk "../inference-service" "inference-service-client"
publish_sdk "../../institute/model-service" "model-service-client"
publish_sdk "../../institute/chat-service" "chat-service-client"

publish_sdk "../../department/mlflow-service" "mlflow-service-client"
publish_sdk "../../department/institute-service" "institute-service-client"
publish_sdk "../../department/federated-learning-management-service" "federated-learning-management-service-client"