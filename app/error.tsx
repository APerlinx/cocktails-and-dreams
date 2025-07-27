'use client'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 mt-12">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-destructive rounded-lg text-white px-6 py-3 text-lg cursor-pointer "
        onClick={reset}
      >
        Try again
      </button>
    </main>
  )
}
