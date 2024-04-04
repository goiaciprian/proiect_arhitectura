build_common:
	$(MAKE) -C common_services build
build_all:
	docker compose build
start_all_d:
	docker compose up -d
start_all:
	docker compose up
clean:
	docker compose down