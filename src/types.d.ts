
/* HELPERS */

type $<T> = (() => T) | T;

type ArrayMaybe<T> = T | T[];

type BoundingBox = { bottom: number, height: number, left: number, right: number, top: number, width: number, x: number, y: number };

type Callback = () => void;

type Dimensions = { height: number, width: number };

type Disposer = () => void;

type EventType = 'devbox.debugger.detached';

type JSONPrimitive = null | boolean | number | string;

type JSONArray = Array<Value>;

type JSONObject = { [key: string]: Value };

type JSONValue = JSONPrimitive | JSONArray | JSONObject;

type Observable<T> = import ( 'voby' ).Observable<T>;

type ObservableLike<T> = import ( 'voby' ).ObservableLike<T>;

type ObservableReadonly<T> = import ( 'voby' ).ObservableReadonly<T>;

type ObservableReadonlyLike<T> = import ( 'voby' ).ObservableReadonlyLike<T>;

/* MAIN */

type AnimationThrottlerState = {
  active: Observable<boolean>
};

type ContainmentOutlinerState = {
  active: Observable<boolean>
};

type CpuThrottlerState = {
  active: Observable<boolean>
};

type DashboardState = {
  active: Observable<boolean>
};

type DisplayOutlinerState = {
  active: Observable<boolean>
};

type ElementCounterState = {
  active: Observable<boolean>
};

type ElementOutlinerState = {
  active: Observable<boolean>
};

type FpsMeterState = {
  active: Observable<boolean>
};

type IntrinsicSizeOutlinerState = {
  active: Observable<boolean>
};

type LagRadarState = {
  active: Observable<boolean>
};

type LayerOutlinerState = {
  active: Observable<boolean>
};

type MutationHighlighterState = {
  active: Observable<boolean>
};

type OverflowOutlinerState = {
  active: Observable<boolean>
};

type PaintHighlighterState = {
  active: Observable<boolean>
};

type RulersState = {
  active: Observable<boolean>
};

type ScrollBottlenckHighlighterState = {
  active: Observable<boolean>
};

type WebComponentOutlinerState = {
  active: Observable<boolean>
};

type State = {
  animationThrottler: AnimationThrottlerState,
  containmentOutliner: ContainmentOutlinerState,
  cpuThrottler: CpuThrottlerState,
  dashboard: DashboardState,
  displayOutliner: DisplayOutlinerState,
  elementCounter: ElementCounterState,
  elementOutliner: ElementOutlinerState,
  fpsMeter: FpsMeterState,
  intrinsicSizeOutliner: IntrinsicSizeOutlinerState,
  lagRadar: LagRadarState,
  layerOutliner: LayerOutlinerState,
  mutationHighlighter: MutationHighlighterState,
  overflowOutliner: OverflowOutlinerState,
  paintHighlighter: PaintHighlighterState,
  rulers: RulersState,
  scrollBottleneckHighlighter: ScrollBottlenckHighlighterState,
  webComponentOutliner: WebComponentOutlinerState
};

type ToolConfig<State extends {} = unknown> = {
  id: string,
  name: string,
  description: string,
  enabled: boolean,
  command: string,
  shortcut: string,
  state: State,
  trigger: () => Disposer | void
};
