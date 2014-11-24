module.exports = (grunt) ->


	##--------------------------------------
	## Main Executable Build Tasks
	##--------------------------------------

	# Default
	@registerTask 'default', [
		'concurrent:servers'
	]

	@registerTask 'webServer', [
		'configureRewriteRules'
		'connect:main'
	]
