
/* HELPERS */

type $<T> = (() => T) | T;

type ArrayMaybe<T> = T | T[];

type Callback = () => void;

type Disposer = () => void;

type Observable<T> = import ( 'voby' ).Observable<T>;

type ObservableReadonly<T> = import ( 'voby' ).ObservableReadonly<T>;

/* MAIN */

//TODO
