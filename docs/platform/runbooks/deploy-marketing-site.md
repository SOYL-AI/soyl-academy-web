# Runbook: deploy the marketing site (www.soylai.com)

The marketing site is the Next.js app at the repository root, hosted on Vercel (project `soyl-academy-web`, production branch `main`). Every merge to `main` is a production deploy of the live site, so it follows D-029: platform CI green, marketing regression clean, flag-off HTML byte-identical, platform flags unset in Vercel production.

## 1. Before merging to `main`

From the branch you will merge (root and `platform/` dependencies installed):

```
npm run lint && npm run build                          # root: the build also type-checks
cd platform
npm run marketing:regression -w @soyl/e2e              # Windows baseline: visual + routes + Lighthouse
#  or, when the change is meant to look different (owner-approved redesign):
npm run marketing:diff -w @soyl/e2e -- --lighthouse    # merge-base vs HEAD; review the diffs, they are expected
```

- Lighthouse is judged differentially (D-028): base and head measured alternately on the same machine, within 5 points.
- A deliberate visual change needs the owner's approval and then a re-captured baseline: `npm run marketing:baseline -w @soyl/e2e` (owner-approved only), committed on `platform/main`.
- If the merge brings in `platform/main` (OA-10), also run `node e2e/tests/platform/web/flag-off-html.mjs` from `platform/` and confirm `NEXT_PUBLIC_PLATFORM_ENABLED` / `PLATFORM_ENABLED` are **unset** in Vercel production.

## 2. Normal path: Git integration

1. Merge (fast-forward when possible) into `main` and push.
2. Vercel builds `main` and promotes it to production automatically.
3. Watch the deployment in the Vercel dashboard until it is Ready.

## 3. When Vercel refuses the Git deploy (Hobby plan)

Two failures were seen on 2026-10-26/27:

| Symptom | Cause | Fix |
|---|---|---|
| "Deployment rate limited — retry in 24 hours" | Build quota used up by preview builds | D-030 stops `platform/**` builds (`vercel.json`). Wait, or use the CLI path below. |
| CLI deploy refused because the commit author is not a member | Hobby plan: a deployment carrying git metadata must be authored by the account's linked email | Deploy a clean archive with no git metadata, as the account owner (below) |

**CLI deploy from a clean archive** (owner-approved; run by the Vercel account owner or with the owner signed in to the CLI):

```bash
SHA=$(git rev-parse origin/main)                          # the exact commit to ship
OUT=$(mktemp -d)/soyl-$SHA
mkdir -p "$OUT" && git archive --format=tar "$SHA" | tar -x -C "$OUT"
cd "$OUT"
npx vercel@latest link --yes --project soyl-academy-web  # links this folder to the existing project (writes .vercel/)
npx vercel@latest deploy --prod                          # builds on Vercel and promotes to production
```

`git archive` exports tracked files only (no `.git`, no `.env*`, no `node_modules`), so the deployment carries no git author. Environment variables come from the Vercel project, not the folder. This is how the OA-11 hotfix `cd33ca7` went live on 2026-10-27 (deployment `soyl-academy-izudgre7e`, aliased to www.soylai.com).

## 4. After the deploy

```bash
for p in / /schools /students /parents /teachers /future-builders /journal /about /contact /book-a-demo \
         /privacy /terms /refund-policy /sitemap.xml /robots.txt /og /llms.txt /feed.xml; do
  printf "%-18s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://www.soylai.com$p)"
done
curl -s -o /dev/null -w "/learn %{http_code}\n" https://www.soylai.com/learn      # 404 while the platform is dark
```

Every marketing route must be 200 (the full list is in `app/sitemap.ts`; REPO_MAP §4) and `/learn` must stay 404 until launch. Record the deployment id and the check in [STATUS.md](../STATUS.md).

## 5. Roll back

- Vercel dashboard → Deployments → the previous production deployment → promote / roll back. This is immediate and does not rebuild.
- Then revert the commit on `main`, so the next deploy does not bring it back.
