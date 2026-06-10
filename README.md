# NestForge CLI

[![Release](https://github.com/vernonthedev/nestforge-cli-npm/actions/workflows/release.yml/badge.svg)](https://github.com/vernonthedev/nestforge-cli-npm/actions/workflows/release.yml)

The official NPM distribution for the [NestForge](https://github.com/vernonthedev/nestforge) Rust framework CLI.

## Installation

```bash
npm install -g nestforge-cli
```

## Usage

```bash
nestforge --help
nestforge new my-api-app
nestforge g module users
```

## Platform Support

| Package | OS | Architecture |
|---------|----|-------------|
| `@vernonthedev/cli-darwin-arm64` | macOS | ARM64 (Apple Silicon) |
| `@vernonthedev/cli-linux-x64` | Linux | x86_64 |
| `@vernonthedev/cli-win32-x64` | Windows | x86_64 |

The correct platform package is selected automatically at install time via `optionalDependencies`.

## How It Works

This monorepo uses NPM workspaces to ship the `nestforge` CLI binary as a native platform package:

- `packages/cli/` — The main `nestforge` package with a small JS shim that detects the current OS and architecture, resolves the matching binary via `require.resolve`, and spawns it with all arguments forwarded.
- `packages/darwin-arm64/`, `packages/linux-x64/`, `packages/win32-x64/` — Platform-specific packages containing the compiled Rust binary, restricted to their OS/CPU via `os` and `cpu` fields in `package.json`.

## Release

Releases are triggered manually via GitHub Actions:

```bash
gh workflow run release.yml -f version=1.2.3
```

The workflow bumps versions across all packages, downloads compiled binaries from the [upstream repository](https://github.com/vernonthedev/nestforge), places them in the correct platform directories, and publishes to npm.

## Source

Built from the CLI crate at [`vernonthedev/nestforge`](https://github.com/vernonthedev/nestforge/tree/main/crates/nestforge-cli).
