# @trasherdk/promised-timeout

> For limiting the time to resolve a promise.

This is a maintained fork of [promised-timeout](https://github.com/xpepermint/promised-timeout) by Kristijan Sedlak, which is no longer actively maintained. This fork has been modernized with TypeScript strict mode, ESM-only output, and current tooling.

## Changes from the original

- Rewritten as strict TypeScript with generic return types
- ESM-only (no CommonJS)
- Vitest instead of AVA
- Node.js >= 18

## Install

```
pnpm add @trasherdk/promised-timeout
```

## Example

```ts
import { timeout } from '@trasherdk/promised-timeout';

const result = await timeout({
  action: () => fetch('https://example.com'),
  time: 5000,
  error: new Error('request timed out'),
});
```

## API

**timeout\<T\>({ action, time, error }): Promise\<T\>**

A timeout helper that resolves with the action's result, or rejects if the action takes longer than the specified time.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| action | `(() => T \| Promise<T>) \| Promise<T>` | Yes | - | A function returning a value/promise, or a promise directly.
| time | `number` | No | `0` | Milliseconds before the operation rejects (`0` disables the timeout).
| error | `unknown` | No | `new Error("timeout")` | Value to reject with on timeout.

## Releasing

1. Bump the version in `package.json`
2. Commit and tag:

```bash
git add package.json
git commit -m "v1.0.1"
git tag v1.0.1
git push --follow-tags
```

Pushing the `v*` tag triggers CI to build, test, and publish to npm.

### First publish

The package must exist on npm before trusted publishing can be configured. For the initial publish, add an `NPM_TOKEN` repository secret (Settings > Secrets and variables > Actions) with a granular access token from [npmjs.com](https://www.npmjs.com/settings/~/tokens).

### Switching to trusted publishing

After the first version is on npm, configure [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) to eliminate the token:

1. On [npmjs.com](https://www.npmjs.com), go to the package **Settings > Trusted Publisher** and configure:
   - **Owner:** `trasherdk`
   - **Repository:** `promised-timeout`
   - **Workflow filename:** `publish.yml`
2. Delete the `NPM_TOKEN` repository secret.

The npm CLI prefers OIDC when available and falls back to the token, so the workflow handles both.

## Motivation

`Promise.race` alone is insufficient for timeouts. It doesn't clear the timer after the actual promise resolves, so the process hangs until the timeout expires. If you set a 1-hour timeout and the promise resolves in 1 minute, the process waits another 59 minutes. This library clears the timer as soon as the action resolves.

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
