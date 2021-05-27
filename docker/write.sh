echo "Stopping old containers.."
docker stop bkc-explorer-write
docker rm bkc-explorer-write
sleep 1;

echo "\nSetting env variable.."
source ../env_write.sh
sleep 1;

echo "\nStarting new containers.."
make -f Makefile.write start
sleep 1;

echo "\n------------Finished------------"
docker container ls
