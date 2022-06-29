export const ErrorFallback = ({ error }: any) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}
