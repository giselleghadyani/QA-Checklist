module.exports = (grunt) ->


	##--------------------------------------
	## Watch
	##--------------------------------------

	@config 'watch',
		options:
			event: 'all'
			livereload: true
			livereloadOnError: false


		##--------------------------------------
		## Site
		##--------------------------------------

		# Web
		web:
			files: 'web/*'
			tasks: []

	@loadNpmTasks 'grunt-contrib-watch'
