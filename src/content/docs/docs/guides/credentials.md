---
title: Credentials
description: Authenticate with remote repositories using tokens, SSH, or username/password.
---

Gitty's `Credentials` enum covers all common authentication methods. Pass credentials to `clone`, `fetch`, and `push`.

## Personal Access Token (recommended for GitHub/GitLab)

```swift
let creds = Credentials.token("ghp_yourpersonalaccesstoken")
```

## Username & Password

```swift
let creds = Credentials.usernamePassword(
    username: "alice",
    password: "hunter2"
)
```

## SSH Agent

Delegates to the system SSH agent (`ssh-agent`). The agent must be running and have the key loaded.

```swift
let creds = Credentials.sshAgent
```

## Default (credential helper)

Falls back to the system Git credential helper (macOS Keychain, etc.):

```swift
let creds = Credentials.default
```

## Usage example

```swift
try await repo.remotes.fetch(
    remote: "origin",
    credentials: .token("ghp_yourtoken")
)

let repo = try await Repository.clone(
    from: URL(string: "https://github.com/user/private")!,
    to: localURL,
    credentials: .usernamePassword(username: "alice", password: "secret")
)
```
