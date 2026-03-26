---
title: Installation
description: Add Gitty to your Swift project via Swift Package Manager.
---

Gitty is distributed as a Swift Package. It requires **Swift 5.9+** and supports **iOS 16+** and **macOS 13+**.

## Swift Package Manager

### Xcode

1. Open your project in Xcode
2. Go to **File → Add Package Dependencies…**
3. Enter the repository URL:
   ```
   https://github.com/RonenMars/Gitty
   ```
4. Set the version to `from: "0.1.0"`
5. Click **Add Package**

### Package.swift

Add Gitty to your `Package.swift` dependencies:

```swift
dependencies: [
    .package(url: "https://github.com/RonenMars/Gitty", from: "0.1.0"),
],
```

Then add it to your target:

```swift
targets: [
    .target(
        name: "YourTarget",
        dependencies: ["Gitty"]
    ),
]
```

## Import

```swift
import Gitty
```

That's it. No system dependencies, no CMake, no Homebrew — Gitty bundles libgit2 as a pure SPM package.
