CONTAINER=$(docker ps | grep bkc-explorer | awk '{print $1}')
sudo docker stop $CONTAINER
wait 1
sudo docker rm $CONTAINER
