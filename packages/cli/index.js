#!/usr/bin/env node

const { platform, arch } = process;

const PLATFORM_PACKAGES = {
  'darwin-arm64': '@nestforge/cli-darwin-arm64',
  'linux-x64': '@nestforge/cli-linux-x64',
  'win32-x64': '@nestforge/cli-win32-x64',
};

const BINARY_NAMES = {
  'darwin-arm64': 'nestforge-darwin-arm64',
  'linux-x64': 'nestforge-linux-x64',
  'win32-x64': 'nestforge-win32-x64.exe',
};

const platformKey = `${platform}-${arch}`;
const pkgName = PLATFORM_PACKAGES[platformKey];
const binaryName = BINARY_NAMES[platformKey];

if (!pkgName || !binaryName) {
  console.error(`Unsupported platform: ${platform} ${arch}`);
  process.exit(1);
}
