---
title: Diff
description: Inspect changes between commits, branches, or the working directory.
---

## Working directory diff

Compare the current working tree against HEAD:

```swift
let diff = try repo.diff()
for file in diff {
    print(file.path, file.status)
    for hunk in file.hunks {
        print(hunk.header)
        for line in hunk.lines {
            print(line.origin, line.content)
        }
    }
}
```

## Diff from a commit

```swift
let commit = try repo.log(limit: 1).first!
let diff = try repo.diff(from: commit)
```

## Diff between two commits

```swift
let commits = try repo.log(limit: 2)
let diff = try repo.diff(from: commits[1], to: commits[0])
```

## FileDiff model

```swift
public struct FileDiff: Sendable {
    public let path:   String
    public let status: DeltaStatus   // .added, .deleted, .modified, .renamed, ...
    public let hunks:  [DiffHunk]
}

public struct DiffHunk: Sendable {
    public let header: String
    public let lines:  [DiffLine]
}

public struct DiffLine: Sendable {
    public let origin:  Character   // '+', '-', ' '
    public let content: String
    public let oldLine: Int32
    public let newLine: Int32
}
```
