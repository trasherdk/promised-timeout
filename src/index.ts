export interface TimeoutOptions<T> {
  action: (() => T | Promise<T>) | Promise<T>;
  time?: number;
  error?: unknown;
}

export function timeout<T>({
  action,
  time = 0,
  error = new Error("timeout"),
}: TimeoutOptions<T>): Promise<T> {
  if (!action) throw new Error("no action provided");

  let timer: ReturnType<typeof setTimeout> | undefined;

  const run = Promise.resolve().then(() =>
    typeof action === "function" ? action() : action,
  ).then((value) => {
    clearTimeout(timer);
    return value;
  });

  if (time <= 0) return run;

  const sleep = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(reject, time, error);
  });

  return Promise.race([run, sleep]);
}
