---
title: Models
description: Reference for all public model types in Gitty.
---

## OID

A Git object identifier (SHA-1 hash).

```swift
public struct OID: Sendable, Hashable {
    public let string:      String   // full 40-char hex
    public let shortString: String   // first 7 chars
}
```

## Commit

```swift
public struct Commit: Sendable, Identifiable {
    public let oid:        OID
    public let message:    String
    public let author:     Signature
    public let committer:  Signature
    public let parentOIDs: [OID]
}
```

## Signature

```swift
public struct Signature: Sendable {
    public let name:  String
    public let email: String
    public let date:  Date
}
```

## Branch

```swift
public struct Branch: Sendable, Identifiable {
    public let name:      String   // full ref name, e.g. refs/heads/main
    public let shortName: String   // e.g. main
    public let isHead:    Bool
    public let isRemote:  Bool
}
```

## Remote

```swift
public struct Remote: Sendable, Identifiable {
    public let name: String
    public let url:  String
}
```

## Tag

```swift
public struct Tag: Sendable, Identifiable {
    public let name:    String
    public let oid:     OID
    public let message: String?
    public let tagger:  Signature?
}
```

## StatusEntry

```swift
public struct StatusEntry: Sendable {
    public let path:   String
    public let status: FileStatus   // .new, .modified, .deleted, .renamed, ...
}
```

## FileDiff / DiffHunk / DiffLine

See [Diff guide](/docs/guides/diff).

## MergeResult

```swift
public enum MergeResult: Sendable {
    case upToDate
    case fastForward(Commit)
    case merged(Commit)
    case conflict([ConflictedFile])
}
```

## RebaseResult

```swift
public enum RebaseResult: Sendable {
    case success
    case conflict(ConflictedFile)
}
```

## CherryPickResult

```swift
public enum CherryPickResult: Sendable {
    case success(Commit)
    case conflict
}
```

## StashEntry

```swift
public struct StashEntry: Sendable, Identifiable {
    public let index:   Int
    public let message: String
    public let oid:     OID
}
```

## BlameHunk

```swift
public struct BlameHunk: Sendable {
    public let startLine:      Int
    public let endLine:        Int
    public let finalCommitOID: OID
    public let finalSignature: Signature
    public let origCommitOID:  OID
    public let origSignature:  Signature
    public let origPath:       String
}
```

## TransferProgress

```swift
public struct TransferProgress: Sendable {
    public let totalObjects:    UInt32
    public let indexedObjects:  UInt32
    public let receivedObjects: UInt32
    public let receivedBytes:   Int
}
```

## Credentials

```swift
public enum Credentials: Sendable {
    case token(String)
    case usernamePassword(username: String, password: String)
    case sshAgent
    case `default`
}
```
