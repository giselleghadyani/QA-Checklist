module.exports = (grunt) ->


	##--------------------------------------
	## Concurrent
	##--------------------------------------

	@config 'concurrent',
		options:
			logConcurrentOutput: true

		servers: [
			'connect'
			'watch'
		]

	@loadNpmTasks 'grunt-concurrent'
