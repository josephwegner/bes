for (var feature in bdndb.features) {
	var featureObj = bdndb.features[feature]

	if (featureObj.shouldRun()) {
		featureObj.run()
	}
}
