# Publishing

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

## First publish

The package must exist on npm before trusted publishing can be configured. For the initial publish, add an `NPM_TOKEN` repository secret (Settings > Secrets and variables > Actions) with a granular access token from [npmjs.com](https://www.npmjs.com/settings/~/tokens).

## Switching to trusted publishing

After the first version is on npm, configure [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) to eliminate the token:

1. On [npmjs.com](https://www.npmjs.com), go to the package **Settings > Trusted Publisher** and configure:
   - **Owner:** `trasherdk`
   - **Repository:** `promised-timeout`
   - **Workflow filename:** `publish.yml`
2. Delete the `NPM_TOKEN` repository secret.

The npm CLI prefers OIDC when available and falls back to the token, so the workflow handles both.
