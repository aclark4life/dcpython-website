deploy-prod:
	aws --profile=dc s3 cp --recursive --exclude "lib/*" --exclude "bin/*" . s3://dcpython.org --exclude "node_modules/*" --exclude ".git/*" --exclude Makefile --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

deploy-dev:
	aws --profile=dc s3 cp --recursive --exclude "lib/*" --exclude "bin/*" . s3://dev.dcpython.org --exclude "node_modules/*" --exclude ".git/*" --exclude Makefile --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
	aws --profile=dc cloudfront create-invalidation --distribution-id E13BTW6RNYVM9H --paths "/*"

pack:
	./node_modules/.bin/webpack

eb-deploy:
	$(MAKE) deploy-prod
