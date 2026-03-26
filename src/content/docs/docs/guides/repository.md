---
title: Repository
description: Open, initialize, and clone Git repositories with Gitty.
---

`Repository` is the root object in Gitty. All operations start from a repository instance.

## Open an existing repository

```swift
let repo = try Repository.open(at: URL(fileURLWithPath: "/path/to/repo"))
```

Throws `GittyError` if the path is not a valid Git repository.

## Initialize a new repository

```swift
// Standard repository
let repo = try Repository.initialize(at: URL(fileURLWithPath: "/path/to/new-repo"))

// Bare repository (no working directory)
let bare = try Repository.initialize(at: URL(fileURLWithPath: "/path/to/new-repo.git"), bare: true)
```

## Check if a path is a repository

```swift
let isRepo = Repository.exists(at: URL(fileURLWithPath: "/some/path"))
```

## Clone

Clone is `async` — it performs network I/O.

```swift
let repo = try await Repository.clone(
    from: URL(string: "https://github.com/user/repo")!,
    to: URL(fileURLWithPath: "/local/path")
)
```

### With credentials

```swift
let repo = try await Repository.clone(
    from: URL(string: "https://github.com/user/private-repo")!,
    to: URL(fileURLWithPath: "/local/path"),
    credentials: .token("ghp_yourtoken")
)
```

### With progress

```swift
let repo = try await Repository.clone(
    from: remoteURL,
    to: localURL,
    credentials: .token("ghp_yourtoken"),
    progress: { p in
        print("Received \(p.receivedObjects) / \(p.totalObjects)")
    }
)
```

See [Credentials](/docs/guides/credentials) for all authentication options.
