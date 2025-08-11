
/* HELPERS */

type $<T> = (() => T) | T;

type ArrayMaybe<T> = T | T[];

type Callback = () => void;

type Disposer = () => void;

type Observable<T> = import ( 'voby' ).Observable<T>;

type ObservableReadonly<T> = import ( 'voby' ).ObservableReadonly<T>;

/* MAIN */

type Box = {
  element: Element,
  level: number,
  rect: DOMRect
};

type ToolConfig = {
  id: string,
  name: string,
  command: string,
  shortcut: string,
  type: 'action' | 'toggle',
  trigger: () => Disposer | void
};
