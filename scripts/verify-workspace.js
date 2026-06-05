const fs = require('fs');
const path = require('path');

const packages = {
  cli: { path: 'packages/cli/package.json', name: 'nestforge-cli' },
  darwin: { path: 'packages/darwin-arm64/package.json', name: '@vernonthedev/cli-darwin-arm64' },
  linux: { path: 'packages/linux-x64/package.json', name: '@vernonthedev/cli-linux-x64' },
  win32: { path: 'packages/win32-x64/package.json', name: '@vernonthedev/cli-win32-x64' },
};

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

let failed = false;

for (const [key, pkg] of Object.entries(packages)) {
  const manifest = loadJson(pkg.path);
  if (manifest.name !== pkg.name) {
    console.error(`FAIL: ${pkg.path} name mismatch. Expected "${pkg.name}", got "${manifest.name}"`);
    failed = true;
  }
}

const versions = {};
for (const [key, pkg] of Object.entries(packages)) {
  const manifest = loadJson(pkg.path);
  versions[key] = manifest.version;
}

const uniqueVersions = new Set(Object.values(versions));
if (uniqueVersions.size !== 1) {
  console.error(`FAIL: Package versions differ: ${JSON.stringify(versions)}`);
  failed = true;
} else {
  console.log(`OK: All packages at version ${[...uniqueVersions][0]}`);
}

const cli = loadJson(packages.cli.path);
for (const [key, pkg] of Object.entries(packages)) {
  if (key === 'cli') continue;
  const expectedDep = cli.optionalDependencies?.[pkg.name];
  if (!expectedDep) {
    console.error(`FAIL: Missing optionalDependency for ${pkg.name} in cli package`);
    failed = true;
  } else if (expectedDep !== versions.cli) {
    console.error(`FAIL: optionalDependency ${pkg.name}@${expectedDep} != ${versions.cli}`);
    failed = true;
  }
}

if (failed) {
  console.error('Workspace verification FAILED');
  process.exit(1);
} else {
  console.log('Workspace verification PASSED');
}
