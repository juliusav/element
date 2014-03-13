
build: components index.js
	@component build -o ./ -s element.js -n element

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean build
