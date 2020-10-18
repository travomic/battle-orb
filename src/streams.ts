import makeSubject from "callbag-subject";

export function makeStreams() {
  return {
    user$: makeSubject(),
    game$: makeSubject(),
    time$: makeSubject(),
  };
}

export const streams = makeStreams();
