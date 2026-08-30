# Spark Roster

A React Native app that shows a gym's class rosters for the day. It loads the
classes and their members from an API, lets you search a member by name or ID,
and adapts from a phone to a large tablet in both orientations. Light and dark
mode are both supported.

Built with React Native 0.87 (New Architecture), TypeScript and Redux Toolkit.

## Requirements

- Node 22.11 or newer
- Yarn
- Xcode 16+ with CocoaPods (iOS)
- Android Studio with JDK 17 (Android)

## Setup

```sh
yarn
```

The API base URL lives in `.env`:

```
API_BASE_URL=https://api.mockfly.dev/mocks/<mock-id>
API_TIMEOUT=20000
```

`.env` is committed on purpose here, so the project runs straight after
cloning - the endpoint is the public mock API this assessment was given
against, not a secret. On a real project this file stays out of git and
`.env.example` is the template.

iOS also needs the pods:

```sh
cd ios && pod install && cd ..
```

## Running

```sh
yarn start        # Metro
yarn android
yarn ios
```

Release build for Android: `yarn installr`.

Tests:

```sh
yarn test
```

## What the screen does

- Loads the roster from `GET {API_BASE_URL}/contacts`
- Search matches a class name, a member name or a member ID, on the data
  already in the store, so typing never hits the network
- Separate states for loading, API error (with retry), no classes, and no
  search results
- Pull to refresh keeps the list on screen instead of showing a full spinner
- Instructor mode reveals the present / absent actions on every member
- Classes with no members are not shown
- Member avatars are cached on disk and fall back to a local placeholder if
  the image is missing or fails to load

## Project structure

```
src/
  api/                 axios instance, error to message mapping
  assets/              fonts, images, splash logo
  components/          shared UI: text, button, search, toggle, class card
  config/              env values
  features/roster/
    domain/            entities, repository interface, use cases
    data/              API DTOs, mapper, repository implementation
    presentation/      redux slice, screen state hook, screen
  navigation/          stack navigator and routes
  store/               redux store and typed hooks
  theme/               colors, fonts, spacing, responsive helpers
  types/               ambient type declarations
```

## Architecture

The roster feature follows Clean Architecture, so the dependencies point
inwards:

```
presentation  ---->  domain  <----  data
   (screen)          (rules)        (API)
```

- **domain** is plain TypeScript. It imports no React, no Redux and no axios.
  It holds the entities, a `RosterRepository` interface, and the use cases
  (`getActiveClasses`, `searchRoster`, `countMembers`).
- **data** is the only place that knows the API exists. The mapper turns the
  response into the app's own entities, so field names like
  `classRosterAttendeeID` never leak past this folder.
- **presentation** draws and dispatches. The thunk calls a use case and stores
  the result; it holds no rules of its own.

Inside the presentation layer, `useRoster.ts` holds everything the screen
needs - the data, the derived states and the actions - so `RosterScreen.tsx`
only renders. Because the use cases receive the repository as an argument
instead of importing it, the rules can be tested with a fake repository and
no network.

## Responsiveness

`src/theme/responsive.ts` exposes `scale()` for sizes and `fontSize()` for
type, both derived from the device's short side against an 834pt tablet
design. Styles are written through `makeStyles((theme, r) => ...)`, which
gives every component the current theme and those helpers, and re-runs on
rotation. The class card derives its column count from the available width
instead of hardcoding one, so the same card shows three members per row on a
phone and nine on a large tablet, with equal spacing on both edges.

## Libraries

| Library | Why |
|---|---|
| `@reduxjs/toolkit`, `react-redux` | predictable shared state, thunks for the API call |
| `axios` | interceptable HTTP client with timeouts and typed responses |
| `@shopify/flash-list` | keeps long rosters smooth |
| `@d11/react-native-fast-image` | disk and memory caching for member avatars |
| `react-native-vector-icons` | icons on both platforms without shipping images |
| `@react-navigation/native-stack` | native stack, ready for the screens that follow |
| `react-native-safe-area-context` | notch and edge-to-edge handling |
| `react-native-bootsplash` | splash screen on Android 12+ and iOS |
| `react-native-dotenv` | keeps the API URL out of the source |
