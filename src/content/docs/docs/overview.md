---
title: Overview
description: What Gitty is, how it works, and why it exists.
---

Gitty is a Swift library that wraps [libgit2](https://libgit2.org) — the C library that powers Git operations in GitHub Desktop, GitKraken, and hundreds of other tools. It gives Swift developers a clean, modern API to work with Git repositories directly from their apps.

## What Gitty is

A **Swift Package** — the equivalent of an npm package or a RubyGem. You add it as a dependency, import it, and use it. It is not an app, a CLI, or a service.

```swift
import Gitty

let repo = try Repository.open(at: url)
let status = try repo.status()
```

## Why it exists

The existing Swift Git libraries are either unmaintained, lack async support, or require complex system dependencies. Gitty is built with three goals:

- **SPM-native** — no Homebrew, no CMake, no system setup. Add the package URL and you're done.
- **Async-first** — network operations (`clone`, `fetch`, `push`) use Swift Concurrency natively.
- **Type-safe** — results and errors are typed Swift values, not raw integers or stringly-typed responses.

## What it can do

| Area | Operations |
|------|-----------|
| Repository | open, initialize, clone (async) |
| Stage & Commit | stage, unstage, commit, log |
| Status | working directory status |
| Diff | working tree, commit-to-commit |
| Branches | list, create, delete, rename, checkout |
| Remotes | list, add, remove, fetch (async), push (async) |
| Merge | merge with typed result (fast-forward, merged, conflict) |
| Rebase | rebase onto branch, abort |
| Cherry-pick | pick a commit, handle conflicts |
| Tags | lightweight and annotated, list, delete |
| Stash | push, pop, apply, drop, list |
| Blame | per-line commit and author attribution |
| Worktrees | add, remove, lock, unlock |
| Credentials | token, username/password, SSH agent |

## Architecture

Gitty is a thin Swift layer over libgit2. The C library is bundled via [`RonenMars/libgit2`](https://github.com/RonenMars/libgit2) — a fork with a `Package.swift` manifest added for SPM compatibility. No system libgit2 installation is needed.

```
Your app → Gitty (Swift) → RonenMars/libgit2 (C, via SPM)
```

All libgit2 pointers are managed automatically via `GitPointer`, a wrapper that calls the appropriate `git_X_free` on deinit. You never deal with raw C pointers or manual memory management.

## Requirements

| | Minimum |
|--|--|
| Swift | 5.9 |
| iOS | 16.0 |
| macOS | 13.0 |
| Xcode | 15.0 |

## Next steps

- [Installation](/docs/getting-started/installation) — add Gitty to your project
- [Quick Start](/docs/getting-started/quick-start) — clone, commit, and push in minutes
