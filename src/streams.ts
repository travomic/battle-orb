import makeSubject from 'callbag-subject';
import observe from 'callbag-observe';

import { makeTimeObserver } from './drivers/time';

export function makeStreams() {
  return {
    user$: makeSubject(),
    game$: makeSubject(),
    time$: makeSubject(),
  };
}

export const streams = makeStreams();

observe(makeTimeObserver())(streams.time$);
