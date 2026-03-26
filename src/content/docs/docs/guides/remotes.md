---
title: Remotes, Fetch & Push
description: Manage remotes and synchronize with remote repositories.
---

Remote operations are available via `repo.remotes`. Network operations (`fetch`, `push`) are `async`.

## List remotes

```swift
let remotes = try repo.remotes.list()
for remote in remotes {
    print(remote.name, remote.url)
}
```

## Add a remote

```swift
try repo.remotes.add(name: "origin", url: "https://github.com/user/repo")
```

## Remove a remote

```swift
try repo.remotes.remove(named: "origin")
```

## Rename a remote

```swift
try repo.remotes.rename("old-name", to: "new-name")
```

## Fetch

```swift
try await repo.remotes.fetch(
    remote: "origin",
    credentials: .token("ghp_yourtoken")
)
```

### With progress

```swift
try await repo.remotes.fetch(
    remote: "origin",
    credentials: .token("ghp_yourtoken"),
    progress: { p in
        print("Objects: \(p.receivedObjects)/\(p.totalObjects)")
    }
)
```

## Push

```swift
try await repo.remotes.push(
    to: "origin",
    branch: "main",
    credentials: .token("ghp_yourtoken")
)
```

See [Credentials](/docs/guides/credentials) for all authentication options.
