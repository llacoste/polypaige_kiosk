.DEFAULT_GOAL := help

define POLYPAIGE_KIOSK
---------------------------------------------------
 ____   __   __    _  _  ____   __   __  ___  ____ 
(  _ \ /  \ (  )  ( \/ )(  _ \ / _\ (  )/ __)(  __)
 ) __/(  O )/ (_/\ )  /  ) __//    \ )(( (_ \ ) _) 
(__)   \__/ \____/(__/  (__)  \_/\_/(__)\___/(____)
---------------------------------------------------
endef
export POLYPAIGE_KIOSK

help: ## Shows this message.
	@echo "$$POLYPAIGE_KIOSK"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

server: ## Runs an HTTP Server to host POLYPAIGE_KIOSK locally.
	http-server -c-1

setup: ## Installs dependencies for POLYPAIGE_KIOSK.
	npm install -g http-server
