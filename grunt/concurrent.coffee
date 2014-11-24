module.exports = (grunt) ->


	##--------------------------------------
	## Concurrent
	##--------------------------------------

	@config 'concurrent',
		options:
			logConcurrentOutput: true

		servers: [
			'webServer'
			'watch'
		]

	@loadNpmTasks 'grunt-concurrent'
