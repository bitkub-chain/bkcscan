echo "Stopping old containers.."
docker stop bkc-explorer-read
docker rm bkc-explorer-read
sleep 1;

echo "\nSetting env variable.."
source ../env_read.sh
sleep 1;

echo "\nStarting new containers.."
make -f Makefile.read start
sleep 1;

echo "\n------------Finished------------"
docker container ls
