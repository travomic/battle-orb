import { makeSubject, pipe, subscribe } from 'wonka';
import { makeTimeObserver } from './drivers/time';

export function makeStreams() {
  return {
    user$: makeSubject(),
    game$: makeSubject(),
    time$: makeSubject(),
  };
}

export const streams = makeStreams();

pipe(streams.time$.source, subscribe(makeTimeObserver()));
