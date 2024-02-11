test:
	npm run test

test-ci:
	npm run test-ci

build:
	npm run build

run:
	npm run start

release-version:
	sed -i 's/"version": ".*\..*\..*"/"version": "$(VERSION)"/g' package.json
	echo $(VERSION) > version.txt