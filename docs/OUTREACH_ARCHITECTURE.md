# Outreach architecture pointer

This standalone repository is retained as an archive and does not deploy. The active copy of this folder lives inside `Ofunrein/real-estate-email-agent`.

For positive-reply automation, use these sources in order:

1. [`Ofunrein/iris-outreach-queue`](https://github.com/Ofunrein/iris-outreach-queue) — reply classification, active-listing match, Demo Room request, same-thread AgentMail response, follow-ups, Cloud Run schedule, and durable state.
2. [`Positive reply → Demo Room setup`](https://github.com/Ofunrein/iris-outreach-queue/blob/main/docs/POSITIVE_REPLY_DEMO_AUTOMATION.md) — canonical plain-language setup and QA checklist.
3. [`Ofunrein/real-estate-email-agent`](https://github.com/Ofunrein/real-estate-email-agent) — active source repository for both app.lumenosis.com and lumenosis.com; its `lumenosis-site/` folder contains the current web runtime.
4. [`Outreach Demo Room handoff`](https://github.com/Ofunrein/real-estate-email-agent/blob/main/docs/OUTREACH_DEMO_ROOM_HANDOFF.md) — generator boundary and delivery-mode rule.

In the active parent repository, the generator entry point is `lumenosis-site/app/api/admin/demos/generate/route.ts`. Keep outreach polling, AgentMail credentials, campaign state, and follow-up orchestration in `iris-outreach-queue`.
