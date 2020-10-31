import dropRepeats from 'callbag-drop-repeats';
import startWith from 'callbag-start-with';
import { combine, flatten, fromDomEvent, fromValue, interval, map, merge, pipe } from 'wonka';

const isVisible = () => document.visibilityState === 'visible';
const isOnline = () => window.navigator.onLine;

const setupTimeStreams = () => {
  const visible$: any = pipe(
    fromDomEvent(document as any, 'visibilitychange' as any),
    map(isVisible),
    startWith(isVisible())
  );

  const online$: any = pipe(
    merge([
      pipe(fromDomEvent(window as any, 'online' as any), map(() => true)),
      pipe(fromDomEvent(window as any, 'offline' as any), map(() => false))
    ]),
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
        ) : fromValue({ type: 'PAUSE' })
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
