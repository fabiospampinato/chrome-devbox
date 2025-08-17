
/* HELPERS */

type $<T> = (() => T) | T;

type ArrayMaybe<T> = T | T[];

type BoundingBox = { bottom: number, height: number, left: number, right: number, top: number, width: number, x: number, y: number };

type Callback = () => void;

type Dimensions = { height: number, width: number };

type Disposer = () => void;

type JSONPrimitive = null | boolean | number | string;

type JSONArray = Array<Value>;

type JSONObject = { [key: string]: Value };

type JSONValue = JSONPrimitive | JSONArray | JSONObject;

type Observable<T> = import ( 'voby' ).Observable<T>;

type ObservableLike<T> = import ( 'voby' ).ObservableLike<T>;

type ObservableReadonly<T> = import ( 'voby' ).ObservableReadonly<T>;

type ObservableReadonlyLike<T> = import ( 'voby' ).ObservableReadonlyLike<T>;

/* MAIN */

type ToolConfig = {
  id: string,
  name: string,
  description: string,
  command: string,
  shortcut: string,
  active?: Observable<boolean>,
  trigger: () => Disposer | void
};
