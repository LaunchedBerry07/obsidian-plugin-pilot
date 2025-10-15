# See here for image contents: https://github.com/devcontainers/images/tree/main/src/typescript-node
# This Dockerfile starts from a pre-built image that includes Node.js, TypeScript, and other common development tools.
FROM mcr.microsoft.com/devcontainers/typescript-node:18

# You can add custom system-level dependencies here if needed in the future.
# For example:
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-here>