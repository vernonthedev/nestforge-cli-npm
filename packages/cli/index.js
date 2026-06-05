#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const { platform, arch } = process;

const PLATFORM_PACKAGES = {
  'darwin-arm64': '@vernonthedev/cli-darwin-arm64',
  'linux-x64': '@vernonthedev/cli-linux-x64',
  'win32-x64': '@vernonthedev/cli-win32-x64',
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

let binaryPath;
try {
  const pkgJsonPath = require.resolve(`${pkgName}/package.json`);
  const pkgDir = path.dirname(pkgJsonPath);
  binaryPath = path.join(pkgDir, binaryName);
} catch (err) {
  console.error(`Failed to resolve binary for ${platform} ${arch}: ${err.message}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const child = spawn(binaryPath, args, { stdio: 'inherit' });

process.on('SIGINT', () => { child.kill('SIGINT'); });
process.on('SIGTERM', () => { child.kill('SIGTERM'); });

child.on('exit', (code) => process.exit(code ?? 1));
