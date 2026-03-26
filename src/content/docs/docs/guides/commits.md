---
title: Commits & Staging
description: Stage files and create commits.
---

## Stage files

```swift
// Stage specific paths
try repo.stage(paths: ["README.md", "Sources/MyFile.swift"])

// Stage everything (git add -A)
try repo.stageAll()
```

## Unstage files

```swift
try repo.unstage(paths: ["README.md"])
```

## Commit

```swift
let author = Signature(name: "Alice", email: "alice@example.com")
let commit = try repo.commit(message: "feat: add login screen", author: author)
print(commit.oid.string) // full SHA
```

The committer is set to the same value as the author. Both timestamp from the current time.

## Walk commit history

Gitty exposes history as an `AsyncSequence` via `CommitLog`:

```swift
// Last 20 commits
let commits = try repo.log(limit: 20)
for commit in commits {
    print(commit.oid.shortString, commit.message)
}

// From a specific ref
let commits = try repo.log(from: "origin/main", limit: 50)
```

## Commit model

```swift
public struct Commit: Sendable, Identifiable {
    public let oid:       OID
    public let message:   String
    public let author:    Signature
    public let committer: Signature
    public let parentOIDs: [OID]
}
```

## Cherry-pick

```swift
let result = try repo.cherryPick(commit)
switch result {
case .success(let commit): print("Picked:", commit.oid.shortString)
case .conflict:            print("Conflicts — resolve and commit")
}
```
