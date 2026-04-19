const widthAsyncError = <T>(p: Promise<T>) =>
  p.then(
    (data) => [data, null] as const,
    (err) => [null, err] as const,
  );

export { widthAsyncError };
