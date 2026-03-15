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
