
# element

  titanium element proxy wrapper

## Installation

  Install with [component(1)](http://component.io):

    $ component install tipm/element

## API

### Element

### element.set(key, val)

  Set Ti-Proxy property

### element.get(key)
  
  Get Ti-Proxy property

### element.on(event, fn)

  Register an `event` handler `fn`.

### element.once(event, fn)

  Register a single-shot `event` handler `fn`,
  removed immediately after it is invoked the
  first time.

### element.off(event, fn)

  * Pass `event` and `fn` to remove a listener.
  * Pass `event` to remove all listeners on that event.
  * Pass nothing to remove all listeners on all events.

### element.emit(event, ...)

  Emit an `event` with variable option args.

### element.listeners(event)

  Return an array of callbacks, or an empty array.

### element.hasListeners(event)

  Check if this emitter has `event` handlers.

### element.onProxy(event, fn)

  Add Ti-Proxy event listener

### element.onceProxy(event, fn)
  
  Add one time Ti-Proxy event listener

### element.offProxy([event], [fn])
  
  Remove one or more Ti-Proxy event listeners
  
  * Pass `event` and `fn` to remove a listener.
  * Pass `event` to remove all listeners on that event.
  * Pass nothing to remove all listeners on all events.

### element.emitProxy(event, [data]);

  Emit event to Ti-Proxy event listener

### element.add(Element)
  
  Add child element to Ti-Proxy element

### element.rm(Element)

  Remove child element to Ti-Proxy element

### element.open([args])

  Execute `open` on the Ti-Proxy element (if applicable)

### element.close([args])

  Execute `close` on the Ti-Proxy element (if applicable)

### element.show([args])

  Execute `show` on the Ti-Proxy element (if applicable)

### element.hide([args])

  Execute `hide` on the Ti-Proxy element (if applicable)

### element.el()

  Directly access the elements Ti-Proxy element

### element.exec(cmd)([args])

  Execute a given command on the Ti-Proxy element

## License

  MIT
