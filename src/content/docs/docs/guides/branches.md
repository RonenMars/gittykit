---
title: Branches
description: List, create, delete, rename, and checkout branches.
---

Branch operations are available via `repo.branches`.

## List branches

```swift
// Local branches
let locals = try repo.branches.list()

// Remote branches
let remotes = try repo.branches.list(type: .remote)

// All
let all = try repo.branches.list(type: .all)
```

Each item is a `Branch` with `.name`, `.shortName`, and `.isHead`.

## Create a branch

```swift
let commit = try repo.log(limit: 1).first!
let branch = try repo.branches.create(named: "feature/my-feature", at: commit)
```

## Checkout

```swift
try repo.branches.checkout(named: "feature/my-feature")
```

## Delete

```swift
try repo.branches.delete(named: "feature/my-feature")
```

## Rename

```swift
try repo.branches.rename("old-name", to: "new-name")
```

## Current branch

```swift
let branches = try repo.branches.list()
let current = branches.first(where: { $0.isHead })
print(current?.shortName ?? "detached HEAD")
```
