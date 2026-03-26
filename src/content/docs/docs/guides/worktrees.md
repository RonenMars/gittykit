---
title: Worktrees
description: Manage linked working trees for parallel branch work.
---

Worktree operations are available via `repo.worktrees` (or top-level worktree functions on `Repository`).

## List worktrees

```swift
let worktrees = try repo.worktreeList()
for wt in worktrees {
    print(wt.name, wt.path)
}
```

## Add a worktree

```swift
try repo.addWorktree(
    named: "hotfix",
    path: URL(fileURLWithPath: "/path/to/hotfix"),
    branch: "hotfix/critical"
)
```

## Remove a worktree

```swift
try repo.removeWorktree(named: "hotfix")
```

## Lock a worktree

Locking prevents pruning and accidental removal — useful for worktrees on removable storage.

```swift
try repo.lockWorktree(named: "hotfix", reason: "On external drive")
```

## Unlock a worktree

```swift
try repo.unlockWorktree(named: "hotfix")
```
