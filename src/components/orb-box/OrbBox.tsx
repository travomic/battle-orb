import * as React from 'react';
// import produce from 'immer';
import { useRef, useState } from 'react';
import { TCubeFlag, TCubeFlags, TFaceTile, TViewMode } from './types';
import { faceStyle, getTiles } from './utils';
import './orb-box.styl';

interface IProps {
  rows: number;
  scale: number;
}

// FAKE, til wired up as an observable stream.
const aim$: any = {
  '--foo': 'red',
};
const baseStyle$: any = {
  '--rot-x': '120deg',
};
const flag$ = {
  orbit: false,
};
const orb$: any = {
  '--bar': 'blue',
};

export const OrbBox = ({ rows, scale }: IProps) => {
  const aimRef = useRef<any>(null);
  const boxRef = useRef<any>(null);
  const orbRef = useRef<any>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<TViewMode>('orb');
  const [flags, setFlags] = useState<TCubeFlags>({ orbit: false, flip: false });
  const [tiles, setTiles] = useState<Array<TFaceTile>>(getTiles(rows, scale));
  
  const handleViewModeClick = () => {
    setViewMode(viewMode === 'flat' ? 'orb' : 'flat');
    setFlags({...flags, orbit: !flags.orbit });
    setIsDragging(false);
    setTiles([]);
  };

  function makeViewModeHandler(mode: TViewMode, prop?: string, val?: any) {
    return () => {
      setViewMode(mode);
      if (prop) {
        boxRef.current.style.setProperty(`--${mode}-${prop}`, val);
      }
    }
  }

  const makeFlagTapHandler = (flagKey: TCubeFlag) => () => {
    setFlags({
      ...flags,
      [flagKey]: !flags[flagKey],
    });
  }

  return (
    <figure className="orb-box"
      onClick={handleViewModeClick}
      data-mode={viewMode}
      data-orbit={(flags.orbit || flag$.orbit) ? 'on' : 'off' }
      data-flip={flags.flip ? 'on' : 'off' }
      data-drag={isDragging ? 'on' : 'off' }
      style={baseStyle$}
    >
      <section className="box"
        ref={boxRef}
        data-stream--mousedown="mouseDown$"
        data-stream--mousemove="mouseMove$"
        data-stream--mouseup="mouseUp$"
        data-stream--touchstart="touchStart$"
        data-stream--touchmove="touchMove$"
        data-stream--touchend="touchEnd$"
      >
        <div className="aim"
          ref={aimRef}
          style={aim$}
        >
          <div className="orb"
            ref={orbRef}
            style={orb$}
          >
            <button className="pole pole--north">
              <i className="icon">N</i>
            </button>

            {['north', 'south'].map(hemi => (
              <ul key={hemi} className={`hemi hemi--${hemi}`}>
                {[0,1,2,3,4,5].map(face => (
                  <li key={`face-${face}`}
                    className={`face face--${face}`}
                    style={faceStyle(face)}
                  >
                    {tiles.map((tile: TFaceTile, tileIndex: number) => (
                      <button key={`tile-${tileIndex}`}
                        className={`tile tile-${tileIndex}`}
                        data-stream--click="tileClick$"
                        data-style={tile.style}
                      >
                        <i className="m-icon glyph">{tile.glyph}</i>
                      </button>
                    ))}
                  </li>
                ))}
              </ul>
            ))}

            <button className="pole pole--south">
              <i className="icon">S</i>
            </button> 
          </div>
        </div>
      </section>

      <figcaption>
        <nav className="desk">
          {(viewMode === 'orb') ? (
            <>
              <button
                data-icon
                onClick={makeViewModeHandler('flat', 'x', 0)}
              >
                <i className="m-icon">select_all</i>
              </button>
              <button
                data-icon
                onClick={makeFlagTapHandler('orbit')}
              >
                <i className="m-icon">
                  {flags.orbit ? 'sync_disabled' : 'sync' }
                </i>
              </button>
            </>
          ) : (viewMode === 'flat') ? (
            <>
              <button
                data-icon
                onClick={makeViewModeHandler('orb')}
              >
                <i className="m-icon">all_out</i>
              </button>
              <button
                data-icon
                onClick={makeFlagTapHandler('flip')}
              >
                <i className="m-icon">
                  {flags.flip ? 'flip_to_front' : 'flip_to_back' }
                </i>
              </button>
            </>
          ) : '[UNKNOWN VIEW-MODE]'}
        </nav>
      </figcaption>
    </figure>
  );
}
