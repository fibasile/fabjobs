# Deploy

1. Build app with: 

	meteor build web

2. Upload the tgz

3. Untar in bundle or bundle-staging

4. Run

 cd program/server
 npm install

Then FIX the bcrypt error

 rm npm/npm-bcrypt/node_modules/bcrypt -rf
 npm install bcrypt
  
As root

start jobs 

or

start jobs-staging
