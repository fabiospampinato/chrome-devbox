
/* MAIN */

class EventEmitter<Event extends string = string> {

  /* VARIABLES */

  private listeners: Partial<Record<Event, Set<Callback>>> = {};

  /* API */

  off = ( event: Event, listener: Callback ): void => {

    const listeners = this.listeners[event];

    if ( !listeners ) return;

    listeners.delete ( listener );

    if ( listeners.size ) return;

    delete this.listeners[event];

  };

  on = ( event: Event, listener: Callback ): void => {

    const listeners = ( this.listeners[event] ??= new Set () );

    listeners.add ( listener );

  };

  trigger = ( event: Event ): void => {

    const listeners = this.listeners[event];

    if ( !listeners ) return;

    for ( const listener of listeners ) {

      listener ();

    }

  };

}

/* EXPORT */

export default new EventEmitter<EventType> ();
