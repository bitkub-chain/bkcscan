echo "Setup environment variables.."
source ../envSetup/env_mainnet.sh
sleep 1;

echo "Removing old containers.."
docker stop bkc-explorer
docker rm bkc-explorer
sleep 1;

echo "Starting new containers.."
make -f Makefile.mainnet start

