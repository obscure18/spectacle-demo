# @spectacle/view-core

## How tos

### Add a provider
```tsx
// SomeProvider.tsx
export const SomeProvider = ({ children }: PropsWithChildren) => {
  return (
    <SomeContext.Provider value={...}>
      {children}
    </SomeContext.Provider>
  )
}

addProvider(SomeProvider)


// index.ts
import './SomeProvider'
```

### Set the entire app's layout
```tsx
// Layout.tsx
export const Layout = ({ children }: PropsWithChildren<any>) => {
  return <SomeLayoutUI>{children}</SomeLayoutUI>
}

// index.ts (recommended: the same place from where you export your pages)
setLayout(Layout)
```

### Handle errors
#### In functions:
```ts
const handleError = useErrorHandler()
const functionThatCanThrow = () => {
  try {
    console.log('...')
  } catch (e) {
    handleError(e)
  }
}
```
#### In components:
```tsx
const BombComponent = () => {
  throw new Error('💥 KABOOM 💥')
}
```
The app handles it with
```tsx
// BarebonesApp.tsx
<ErrorBoundary FallbackComponent={ErrorFallback}>
  {children}
</ErrorBoundary>

// ErrorFallback.tsx
const ErrorFallback = ({ error }: any) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      { ... }
    </div>
  )
}
```