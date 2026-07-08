DB_URL=postgres://postgres:postgres@postgres:5432/tartua?sslmode=disable

migrate-up:
	docker compose run --rm migrate -path=/migrations -database "$(DB_URL)" up

migrate-down:
	docker compose run --rm migrate -path=/migrations -database "$(DB_URL)" down

migrate-create:
	 docker compose run --rm migrate create -ext sql -dir /migrations -seq $(NAME)