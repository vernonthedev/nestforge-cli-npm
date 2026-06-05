# Contributing to NestForge CLI NPM Distribution

## Project Structure

```
nestforge-cli-npm/
  packages/
    cli/              # Main nestforge npm package (JS shim)
    darwin-arm64/     # macOS ARM64 binary package
    linux-x64/        # Linux x86_64 binary package
    win32-x64/        # Windows x86_64 binary package
  .github/workflows/
    release.yml       # Manual release workflow
```

## Development

```bash
npm install
node packages/cli/index.js --help
```

## Testing

```bash
node packages/cli/test/index.test.js
```

## Release Process

1. The upstream `vernonthedev/nestforge` Rust project produces versioned releases with compiled binaries.
2. A maintainer triggers the release workflow with the matching version.
3. The workflow downloads binaries, updates package versions, and publishes to npm.

For issues or feature requests, open a GitHub issue.
