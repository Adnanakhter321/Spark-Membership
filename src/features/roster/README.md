# Roster feature

Everything about the roster screen lives in this folder: the rules, the API
call and the UI. Three folders, and one rule between them.

## The rule

```
presentation  ---->  domain  <----  data
   (screen)          (rules)        (API)
```

`domain` is the middle. It imports nothing - no React, no Redux, no axios.
`presentation` and `data` both depend on it, never on each other.

## The files

**domain/** - plain TypeScript, the part that would survive a rewrite

| File | What it is |
|---|---|
| `entities.ts` | `Member` and `ClassRoster`, the shapes the app works with |
| `rosterRepository.ts` | the contract: "someone can give me the roster". It does not say how |
| `usecases.ts` | the rules: `getActiveClasses`, `searchRoster` (class name, member name or member ID), `countMembers` |

**data/** - the only folder that knows an API exists

| File | What it is |
|---|---|
| `rosterMapper.ts` | the API's JSON shape, and the code that turns it into entities |
| `rosterApiRepository.ts` | the contract implemented with axios + the mapper |

**presentation/** - screen and state

| File | What it is |
|---|---|
| `rosterSlice.ts` | redux state and the thunk. The thunk calls a use case, it holds no rules |
| `useRoster.ts` | everything the screen needs: data, states, actions |
| `RosterScreen.tsx` | renders, nothing else |

**rosterDependencies.ts** - one file that says which implementation is in use.
It is the only place where the two sides meet.

## Pointing this at the real API

1. Change the base URL in `.env`.
2. Update `rosterMapper.ts` to match the real field names. Nothing outside
   this file knows them.
3. If the endpoint path changes, edit `ROSTER_URL` in `rosterApiRepository.ts`.

The screen, the state and the rules stay untouched.

## Using a different data source

Write a second file next to `rosterApiRepository.ts` - say
`rosterMockRepository.ts` - that satisfies the same `RosterRepository`
interface, then point `rosterDependencies.ts` at it. One line changes.

## Adding another feature

Copy the same three folders under `src/features/<name>/` and keep the same
rule. Shared UI goes in `src/components`, shared theme in `src/theme`.
