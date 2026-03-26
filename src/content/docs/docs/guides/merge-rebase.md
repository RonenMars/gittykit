---
title: Merge & Rebase
description: Merge branches and rebase commits onto a new base.
---

## Merge

```swift
let branch = try repo.branches.list().first(where: { $0.shortName == "feature/x" })!
let result = try repo.merge(branch: branch)

switch result {
case .upToDate:
    print("Already up to date")
case .fastForward(let commit):
    print("Fast-forwarded to", commit.oid.shortString)
case .merged(let commit):
    print("Merged, new commit:", commit.oid.shortString)
case .conflict(let files):
    print("Conflicts in:", files.map(\.path))
}
```

### Resolving conflicts

After a `.conflict` result, the conflicted files are in the working directory with conflict markers. Resolve them, then stage and commit:

```swift
// Edit conflicted files...
try repo.stageAll()
let author = Signature(name: "Alice", email: "alice@example.com")
try repo.commit(message: "Merge feature/x", author: author)
```

## Rebase

```swift
let onto = try repo.branches.list().first(where: { $0.shortName == "main" })!
let author = Signature(name: "Alice", email: "alice@example.com")

let result = try repo.rebase(onto: onto, author: author)

switch result {
case .success:          print("Rebase complete")
case .conflict(let f):  print("Conflict in:", f.path)
}
```

### Abort a rebase

```swift
try repo.abortRebase()
```
