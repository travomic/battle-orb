import dropRepeats from 'callbag-drop-repeats';
import callbagOf from 'callbag-of';
import mapTo from 'callbag-map-to';
import startWith from 'callbag-start-with';
import { combine, flatten, fromEvent, interval, map, merge, pipe } from 'callbag-basics-esmodules';

const isVisible = () => document.visibilityState === 'visible';
const isOnline = () => window.navigator.onLine;

const setupTimeStreams = () => {
  const visible$: any = pipe(
    fromEvent(document, 'visibilitychange' as any),
    map(isVisible),
    startWith(isVisible())
  );

  const online$: any = pipe(
    merge(
      pipe(fromEvent(window, 'online' as any), mapTo(true)),
      pipe(fromEvent(window, 'offline' as any), mapTo(false))
    ),
    startWith(isOnline())
  );

  return pipe(
    combine(online$, visible$),
    map(([online, visible]: any) => online && visible),
    dropRepeats(),
    map(
      (onlineAndVisible: boolean) => onlineAndVisible ?
        pipe(
          interval(1000),
          map(() => ({ type: 'TICK' })),
          startWith({ type: 'RESUME' })
        ) : callbagOf({ type: 'PAUSE' })
    ),
    flatten
  )
}

const initialState = {
  lastResumeTimestamp: null,
  totalTime: 0,
  runningTime: 0
}

export const makeTimeObserver = () => (time$: any) => {
  const foo = setupTimeStreams();
  console.log('time$:', time$, foo);
}

console.log('time$ initialState:', initialState);
