release-version:
	sed -i 's/"version": ".*\..*\..*"/"version": "$(VERSION)"/g' package.json
	echo $(VERSION) > version.txt