echo "Cleaning old images and unused files.."
docker image prune -f
sleep 1;

echo "List available images"
docker images
