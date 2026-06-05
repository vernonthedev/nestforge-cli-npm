const assert = require('assert');

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

function testPlatforms() {
  const platforms = [
    { key: 'darwin-arm64', pkg: '@nestforge/cli-darwin-arm64', bin: 'nestforge-darwin-arm64' },
    { key: 'linux-x64', pkg: '@nestforge/cli-linux-x64', bin: 'nestforge-linux-x64' },
    { key: 'win32-x64', pkg: '@nestforge/cli-win32-x64', bin: 'nestforge-win32-x64.exe' },
  ];

  for (const plat of platforms) {
    assert.strictEqual(PLATFORM_PACKAGES[plat.key], plat.pkg, `PLATFORM_PACKAGES[${plat.key}] mismatch`);
    assert.strictEqual(BINARY_NAMES[plat.key], plat.bin, `BINARY_NAMES[${plat.key}] mismatch`);
  }

  assert.strictEqual(PLATFORM_PACKAGES['linux-arm64'], undefined, 'Unknown platform should not be supported');
  assert.strictEqual(BINARY_NAMES['linux-arm64'], undefined, 'Unknown binary should not be supported');
}

function testMappingsComplete() {
  const keys = Object.keys(PLATFORM_PACKAGES);
  assert.deepStrictEqual(keys.sort(), Object.keys(BINARY_NAMES).sort(), 'Package and binary key sets must match');
}

testPlatforms();
testMappingsComplete();
console.log('All smoke tests passed.');
