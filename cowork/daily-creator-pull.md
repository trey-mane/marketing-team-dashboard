# Daily Creator Pull — Claude Co-Work Prompt

**Schedule:** 8:00 AM daily (managed via Claude Code → Scheduled Tasks)
**Task file:** `~/.claude/scheduled-tasks/daily-creator-pull/SKILL.md`
**Destination:** `POST /api/creator-pull` on the deployed dashboard

---

## Creator Accounts

| Creator | Platforms | Accent Color |
|---|---|---|
| Dan Martell | YouTube, Instagram, TikTok | #F97316 |
| Gary Vee | YouTube, Instagram, TikTok | #3B82F6 |
| Alex Hormozi | YouTube, Instagram, TikTok | #EF4444 |
| Sam Gaudet | Instagram only | #8B5CF6 |
| Diary of a CEO | YouTube, Instagram, TikTok | #10B981 |

Sam Gaudet is Instagram only — no other platforms.

---

## Classification Method

The agent uses **screenshots only** — it cannot play videos. All format classification is inferred from:
- Thumbnail image
- Video title
- Caption / description (first visible line)
- Any text overlays visible in the thumbnail or cover frame
- Duration shown on page
- View count as displayed

See SKILL.md for the full inference rules per field.

---

## Setup Checklist (one-time, after deploying to Vercel)

1. Add Vercel KV storage: Vercel dashboard → Storage → Create KV → link to project
2. Set env var in Vercel: `CREATOR_PULL_SECRET=<strong random string>`
3. Open `~/.claude/scheduled-tasks/daily-creator-pull/SKILL.md` and replace:
   - `YOUR_DASHBOARD_URL` → your Vercel URL (e.g. `https://team-dashboard.vercel.app`)
   - `YOUR_CREATOR_PULL_SECRET` → the value you set above
4. In Claude Code sidebar → Scheduled → "daily-creator-pull" → **Run Now** once to pre-approve tool permissions

After step 4, the task runs hands-off every morning at 8 AM.

---

## Adding / Removing Creators

1. Edit `cowork/creator-accounts.json`
2. Add or remove the matching row(s) in the creator table in `~/.claude/scheduled-tasks/daily-creator-pull/SKILL.md`
3. Assign an `accentColor` hex — this controls the card color in the video editor's dashboard
