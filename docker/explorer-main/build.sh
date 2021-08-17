echo "Building new docker image.."
docker build -t bkc-explorer -f ./Dockerfile ../../
sleep 1;
