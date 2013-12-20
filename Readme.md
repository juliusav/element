
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

### element.onProxy(event, fn)
Add Ti-Proxy event listener

### element.onceProxy(event, fn)
Add one time Ti-Proxy event listener

### element.offProxy([event], [fn])
Remove one or more Ti-Proxy event listeners

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
