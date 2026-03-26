---
title: Blame
description: Trace which commit introduced each line of a file.
---

## Blame a file

```swift
let hunks = try repo.blame(file: "Sources/MyApp/Login.swift")

for hunk in hunks {
    print("Lines \(hunk.startLine)–\(hunk.endLine)")
    print("  Commit:", hunk.finalCommitOID.shortString)
    print("  Author:", hunk.finalSignature.name)
    print("  Date:  ", hunk.finalSignature.date)
}
```

## BlameHunk model

```swift
public struct BlameHunk: Sendable {
    public let startLine:       Int
    public let endLine:         Int
    public let finalCommitOID:  OID
    public let finalSignature:  Signature
    public let origCommitOID:   OID
    public let origSignature:   Signature
    public let origPath:        String
}
```

`finalCommitOID` is the commit in the current history that last changed these lines. `origCommitOID` is the commit where the lines were first introduced (may differ after renames or moves).
