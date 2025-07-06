# Development Guide

## Mock Data Updates

When you make changes to `app/data/mockResumeData.ts`, the changes won't automatically appear in the app because the data is persisted using Zustand with AsyncStorage. Here are the ways to handle this:

### Option 1: Use the DevTools Component (Recommended for Development)

The app now includes a `DevTools` component that provides a "Reload Mock Data" button. This button will:
1. Clear the saved data from Zustand store
2. Load the updated mock data
3. Automatically persist the new mock data

To use it:
1. Make your changes to `app/data/mockResumeData.ts`
2. In the app, tap the "Reload Mock Data" button (located below the footer)
3. The app will now use your updated mock data

### Option 2: Use the resetToMockData Function

The Zustand store provides a `resetToMockData` function that you can call programmatically:

```typescript
const { resetToMockData } = useResumeStore();
resetToMockData();
```

### Option 3: Clear App Data

For a complete reset, you can:
1. Uninstall the app
2. Reinstall it
3. The app will use the updated mock data on first launch

## Zustand Store Implementation

The app now uses Zustand for state management with the following benefits:

- **Automatic Persistence**: Data is automatically saved to AsyncStorage
- **Better Performance**: No unnecessary re-renders
- **Simpler API**: Direct state updates without context providers
- **Type Safety**: Full TypeScript support
- **DevTools Support**: Better debugging capabilities

### Store Structure

The Zustand store (`app/store/resumeStore.ts`) includes:

- **State**: `resumeData`, `currentSection`, `isLoading`
- **Actions**: Individual setters for each data section
- **Utilities**: `resetToMockData`, `forceReloadMockData`

### Data Flow

1. **Initial Load**: Zustand automatically loads data from AsyncStorage
2. **Fallback**: If no saved data exists, uses `mockResumeData`
3. **Persistence**: Any changes are automatically saved to AsyncStorage
4. **Subsequent Loads**: Always loads from AsyncStorage (not mock data)

## Production Considerations

- Remove the `DevTools` component before deploying to production
- The `forceReloadMockData` function should not be exposed in production builds
- Consider using environment variables to control development features
- Zustand provides better performance and simpler state management compared to React Context

This design ensures user data persists across app sessions while providing development tools for testing mock data changes. 