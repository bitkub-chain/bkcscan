echo "Setting environment variables.."
source /root/bkc-explorer/env_mainnet.sh
printenv
sleep 1;

echo "Stopping old container.."
docker stop bkc-explorer
sleep 1;

echo "Removing old container.."
docker rm bkc-explorer
docker ps -a
sleep 1;

echo "Start new container.."
make start
sleep 1;

echo "List running container.."
docker ps
sleep 1;
