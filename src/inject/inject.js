for (var feature in bes.features) {
	var featureObj = bes.features[feature]

	if (featureObj.shouldRun()) {
		featureObj.run()
	}
}
