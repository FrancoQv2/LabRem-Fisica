echo "-> Removing container..."
docker compose -v -f docker-compose.dev.yml down
echo "-> Removing volume..."
docker volume rm fisica-db
echo "-> Removing image..."
docker rmi fisica-server
echo "-> Running..."
docker compose -f docker-compose.dev.yml up
