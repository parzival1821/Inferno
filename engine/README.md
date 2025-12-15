# Checklist

1. Generate wallets which the agents will use - one js script
2. Fund those wallets - one js script
3. Save these funded wallets in `wallets.json`
4. `telemetryService.js` -> For metric accounting
5. `agent.js` -> run a single agent's whole cycle : the requests(both) and transaction signing
6. `apiRoutes.js` -> the api endpoints to be hit by the cli
7. `payerService.js` -> loads the wallets, creates and signs the transactions, used inside agent.js
8. `server.js` -> main entrypoint
9. `simulationEngine.js` -> takes the config, spawns and runs agents