---
title: Error Handling
description: How Gitty surfaces errors from libgit2.
---

All throwing functions in Gitty throw `GittyError`.

## GittyError

```swift
public struct GittyError: Error, Sendable {
    public let message: String
    public let code:    Int32?    // libgit2 error code, nil for logic errors
}
```

## Catching errors

```swift
do {
    let repo = try Repository.open(at: someURL)
} catch let error as GittyError {
    print("Git error:", error.message)
    if let code = error.code {
        print("libgit2 code:", code)
    }
}
```

## Common error scenarios

| Scenario | Typical message |
|----------|----------------|
| Path is not a repository | `"could not find repository"` |
| Branch already exists | `"a reference with that name already exists"` |
| Uncommitted changes during checkout | `"your local changes would be overwritten"` |
| Authentication failure | `"authentication required but no callback set"` |
| Network unreachable | `"failed to connect"` |

## libgit2 error codes

Gitty passes through the raw libgit2 error code in `error.code` when available. A full list of libgit2 error codes is available in the [libgit2 API reference](https://libgit2.org/libgit2/#HEAD/type/git_error_code).
