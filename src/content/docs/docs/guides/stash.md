---
title: Stash
description: Stash and restore uncommitted changes.
---

Stash operations are available via `repo.stash`.

## Push (save) a stash

```swift
let author = Signature(name: "Alice", email: "alice@example.com")
try repo.stash.push(message: "WIP: login screen", author: author)
```

## List stashes

```swift
let stashes = try repo.stash.list()
for entry in stashes {
    print(entry.index, entry.message)
}
```

## Apply a stash

Apply without removing it from the stash list:

```swift
try repo.stash.apply(index: 0)
```

## Pop a stash

Apply and remove from the stash list:

```swift
try repo.stash.pop(index: 0)
```

## Drop a stash

Remove without applying:

```swift
try repo.stash.drop(index: 0)
```

## StashEntry model

```swift
public struct StashEntry: Sendable, Identifiable {
    public let index:   Int
    public let message: String
    public let oid:     OID
}
```
