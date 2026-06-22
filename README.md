# CommunityEventApp

React Native community event app with Discover, event details, RSVP state, host profiles, favorites/my events, search, and a React Native Web target.

## Setup and Run

```sh
npm install
npm start
npm run ios
npm run android
npm run web
```

Notes:

- `npm run web` starts the Webpack dev server using `webpack.web.js` on port `8082` and serves the compiled files from `dist`.
- For iOS first-time setup, install CocoaPods if needed:

```sh
bundle install
bundle exec pod install
```

## Screenshots

> Place screenshot files in `src/assets/screenshots` with the names below.

### Home

| Light | Dark | Web |
|---|---|---|
| <img src="src/assets/screenshots/Home(light).png" width="260" alt="Home Light" /> | <img src="src/assets/screenshots/Home(dark).png" width="260" alt="Home Dark" /> | <img src="src/assets/screenshots/web-home.png" width="260" alt="Web Home" /> |

### Event Details

| Details(Mobile) | Details(Web) |
|---|---|
| <img src="src/assets/screenshots/Event-details.png" width="260" alt="Event Details" /> |
| <img src="src/assets/screenshots/web-event-details.png" width="260" alt="Web Event Details" /> |

### My Events

| Saved Events Screen |
|---|
| <img src="src/assets/screenshots/My-events.png" width="260" alt="My Events" /> |

### Host Details

| Host Details Screen |
|---|
| <img src="src/assets/screenshots/host-details.png" width="260" alt="Host Details" /> |
| <img src="src/assets/screenshots/web-host-details.png" width="260" alt="Web Host Details" /> |

### Search

| Search Screen |
|---|
| <img src="src/assets/screenshots/Over-search.png" width="260" alt="Search Overlay" /> |
| <img src="src/assets/screenshots/Search-with-result.png" width="260" alt="Search Results" /> |
| <img src="src/assets/screenshots/Tab-filtering.png" width="260" alt="Tab Filtering" /> |

### Misc

| Raw Capture |
|---|
| <img src="src/assets/screenshots/Screenshot_1782140208.png" width="260" alt="Raw Capture" /> |

## Project Structure

- `src/core`: navigation, shared components, theme, hooks, app-level types
- `src/data`: repository implementations, data sources, and mappers
- `src/domain`: contracts, models, use cases, and business logic
- `src/presentation`: screens, view models, context providers, and UI components

## Technical Decisions

### 1) State Management Rationale

- Chosen approach: React Context + hooks (`useRSVP`, `useEvent`, `useTheme`).
- Why: shared app state is moderate and can be managed by lightweight provider/hook pairs.
- Benefits:
    - Simple and explicit data flow.
    - Minimal boilerplate.
    - Good TypeScript ergonomics.

### 2) Architecture Choices

- Pattern used: layered separation by responsibility.
- `domain`: use cases and repository interfaces.
- `data`: repository implementations and remote/local data access.
- `presentation`: UI screens, components, and state orchestration.
- Rationale:
    - Keeps UI independent of data source details.
    - Improves maintainability and testability.

### 3) Persistence Strategy

- Local persistence is implemented with `@react-native-async-storage/async-storage`.
- Persisted data:
    - RSVP state.
- Rationale:
    - Works offline.
    - Lightweight and sufficient for this app.
    - Easy hydration on app launch.

### 4) Performance and Security Considerations

- Performance:
    - `FlatList` for list rendering.
    - `useMemo` and `useCallback` in key UI paths.
    - Responsive web layout logic for tablets and desktop.
- Security:
    - No sensitive secrets stored in AsyncStorage.
    - Navigation params are typed via TypeScript.

### 5) Testing Strategy

- Framework: Jest + React Test Renderer.
- Current coverage focus:
    - Context provider logic.
    - Component rendering and RSVP behavior.
- Strategy:
    - Unit tests for provider behavior and shared components.
    - Behavioral assertions for navigation and conditionals.

## Useful Scripts

```sh
npm start        # Start Metro
npm test         # Run tests
npm run lint     # Run eslint
npm run web      # Run webpack dev server
```
