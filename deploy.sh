npm i
npm run build
zip -r dist.zip dist
scp -r dist.zip adminserver@123.206.181.24:/home/adminserver/builds/
