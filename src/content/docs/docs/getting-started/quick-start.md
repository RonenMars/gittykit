---
title: Quick Start
description: Clone a repository and make your first commit with Gitty in minutes.
---

This guide walks you through the most common operations: cloning, staging, committing, and pushing.

## Clone a repository

```swift
import Gitty

let repo = try await Repository.clone(
    from: URL(string: "https://github.com/user/repo")!,
    to: URL(fileURLWithPath: "/path/to/local"),
    credentials: .token("ghp_yourtoken")
)
```

## Open an existing repository

```swift
let repo = try Repository.open(at: URL(fileURLWithPath: "/path/to/repo"))
```

## Stage and commit

```swift
let author = Signature(name: "Alice", email: "alice@example.com")

try repo.stageAll()
let commit = try repo.commit(message: "Initial commit", author: author)
print(commit.oid.string)
```

## Check status

```swift
let entries = try repo.status()
for entry in entries {
    print(entry.path, entry.status)
}
```

## Push to remote

```swift
try await repo.remotes.push(
    to: "origin",
    branch: "main",
    credentials: .token("ghp_yourtoken")
)
```

## Next steps

- [Repository guide](/docs/guides/repository) — open, initialize, clone options
- [Credentials guide](/docs/guides/credentials) — token, SSH, username/password
- [Branches guide](/docs/guides/branches) — create, checkout, merge
