# code to deploy angular app
cp -a /home/pratyush/azagent/_work/r2/a/Vinyl3.mypd/drop/. /home/pratyush/
cd /home/pratyush
npm install
nohup ng serve --host 0.0.0.0 &
