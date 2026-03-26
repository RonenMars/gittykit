---
title: Repository
description: Full API reference for the Repository type.
---

`Repository` is the root type. All operations are performed through an instance or its sub-objects.

## Initializers

| Method | Description |
|--------|-------------|
| `Repository.open(at:)` | Open existing repository |
| `Repository.initialize(at:bare:)` | Create new repository |
| `Repository.exists(at:)` | Check if path is a Git repo |
| `Repository.clone(from:to:credentials:progress:)` | Clone (async) |

## Sub-objects

| Property | Type | Description |
|----------|------|-------------|
| `repo.branches` | `BranchOperations` | Branch management |
| `repo.remotes` | `RemoteOperations` | Remote management + fetch/push |
| `repo.tags` | `TagOperations` | Tag management |
| `repo.stash` | `StashOperations` | Stash management |

## Stage & Commit

| Method | Description |
|--------|-------------|
| `stage(paths:)` | Stage specific file paths |
| `stageAll()` | Stage all changes |
| `unstage(paths:)` | Unstage specific file paths |
| `commit(message:author:)` | Create a commit from the index |

## Status

| Method | Description |
|--------|-------------|
| `status(includeUntracked:)` | Returns `[StatusEntry]` |

## Log

| Method | Description |
|--------|-------------|
| `log(limit:)` | Most recent commits |
| `log(from:limit:)` | Commits reachable from a ref |

## Diff

| Method | Description |
|--------|-------------|
| `diff()` | Working directory vs HEAD |
| `diff(from:)` | From commit vs its parent |
| `diff(from:to:)` | Between two commits |

## Merge & Rebase

| Method | Description |
|--------|-------------|
| `merge(branch:)` | Merge a branch → `MergeResult` |
| `rebase(onto:author:)` | Rebase onto a branch → `RebaseResult` |
| `abortRebase()` | Abort an in-progress rebase |
| `cherryPick(_:)` | Cherry-pick a commit → `CherryPickResult` |

## Blame

| Method | Description |
|--------|-------------|
| `blame(file:)` | Returns `[BlameHunk]` |

## Worktrees

| Method | Description |
|--------|-------------|
| `worktreeList()` | List linked worktrees |
| `addWorktree(named:path:branch:)` | Add a worktree |
| `removeWorktree(named:)` | Remove a worktree |
| `lockWorktree(named:reason:)` | Lock a worktree |
| `unlockWorktree(named:)` | Unlock a worktree |
