eb-deploy:
	aws --profile=dc s3 cp --recursive --exclude "lib/*" --exclude "bin/*" . s3://dev.dcpython.org --exclude "node_modules/*" --exclude ".git/*" --exclude Makefile --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

pack:
	./node_modules/.bin/webpack
