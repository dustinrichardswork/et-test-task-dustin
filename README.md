# Overview

PoC project to figure out keywords for a given website.

## Methodology

TODO

# Requirements

- Linux
- node v16.18.1
- npm v8.19.2

Earlier/later versions and other OS might work, but it was developed and tested with aforementioned versions so try those for the best results.

## Tools / plugins

Before working on this project, make sure your IDE is set up correctly. In particular, it has extensions/support for the following:

- eslint
- prettier
- editorconfig (Optional. Some IDEs don't respect prettier's space/tab width settings for new files and editorconfig helps with that.)

# Usage (dev)

```sh
npm run dev -- --url=<url>
```

Example:

```sh
npm run dev -- --url="https://herbalvineyards.com/"
```

# Usage (prod)

```sh
npm run build
npm start -- --url=<url>
```

# Testing

Tests use pre-downloaded data for analysis. No network requests are made.

```sh
npm test
```
