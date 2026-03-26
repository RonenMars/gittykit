---
title: Tags
description: Create lightweight and annotated tags.
---

Tag operations are available via `repo.tags`.

## List tags

```swift
let tags = try repo.tags.list()
for tag in tags {
    print(tag.name)
}
```

## Create a lightweight tag

A lightweight tag is just a named pointer to a commit — no metadata.

```swift
let commit = try repo.log(limit: 1).first!
try repo.tags.create(named: "v1.0.0", at: commit)
```

## Create an annotated tag

An annotated tag stores a message, tagger identity, and timestamp.

```swift
let tagger = Signature(name: "Alice", email: "alice@example.com")
let commit = try repo.log(limit: 1).first!
try repo.tags.create(
    named: "v1.0.0",
    at: commit,
    message: "Initial public release",
    tagger: tagger
)
```

## Delete a tag

```swift
try repo.tags.delete(named: "v1.0.0")
```

## Tag model

```swift
public struct Tag: Sendable, Identifiable {
    public let name:    String
    public let oid:     OID
    public let message: String?   // nil for lightweight tags
    public let tagger:  Signature?
}
```
