# gittykit.dev

Documentation site for [Gitty](https://github.com/RonenMars/Gitty) — a Swift package that wraps libgit2 with an idiomatic, async-first API for iOS and macOS.

**Live site:** [gittykit.dev](https://gittykit.dev)

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

---

## About Gitty

Gitty is a Swift package (SPM-native, no Homebrew or CMake required) targeting **iOS 15+ / macOS 12+** with **Swift 5.9+**. It wraps [libgit2](https://github.com/ibrahimcetin/libgit2) and is designed for apps that need to _act_ on repositories — authenticate against remotes, commit with a specific author, resolve conflicts, and stream history without loading it all into memory at once.

**Current version:** 0.2.0 · **License:** MIT

---

## Site Structure

```
src/content/docs/
├── overview.md
├── getting-started/
│   ├── installation.md          SPM setup
│   └── quick-start.md           Clone → commit → push walkthrough
├── guides/
│   ├── repository.md            Open, initialize, clone
│   ├── branches.md              List, create, delete, rename, checkout
│   ├── commits.md               Stage, unstage, commit
│   ├── remotes.md               Fetch, push, add, remove
│   ├── diff.md                  Diff operations
│   ├── merge-rebase.md          Merge and rebase with conflict handling
│   ├── stash.md                 Push, pop, apply, drop
│   ├── tags.md                  Lightweight and annotated tags
│   ├── worktrees.md             Add, remove, lock, unlock
│   ├── blame.md                 Per-line attribution
│   └── credentials.md           Token, SSH, password auth
└── reference/
    ├── repository.md            Repository class API
    ├── models.md                Data types (Commit, Branch, Diff, …)
    └── errors.md                GittyError handling
```

---

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`         |
| `npm run preview` | Preview build locally before deploying     |
