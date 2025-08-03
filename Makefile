# Makefile

init:
	docker-compose up --build

up:
	docker-compose up -d

down:
	docker-compose down

migrate:
	@if [ -z "$(name)" ]; then \
		echo "❌ エラー: マイグレーション名を 'make migrate name=your_migration_name' の形式で指定してください。"; \
		exit 1; \
	fi
	docker-compose exec nextjs npx prisma migrate dev --name $(name)

app:
	docker-compose exec nextjs npm run dev

shell:
	docker-compose exec nextjs sh
