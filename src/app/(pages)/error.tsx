"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  return (
    <div>
      <h2>{error.message || "Something went wrong!"}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
