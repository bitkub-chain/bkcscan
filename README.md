<h1 align="center">Bitkub Chain Explorer (forked from blockscout)</h1>
<h3> Test URL: [https://testnet.bkcscan.com](https://testnet.bkcscan.com) </h3>
<p align="center">Blockchain Explorer for inspecting and analyzing EVM Chains.</p>
<div align="center">

[![BitkubChain](https://github.com/poanetwork/blockscout/workflows/Blockscout/badge.svg?branch=master)](https://github.com/poanetwork/blockscout/actions) [![Coverage Status](https://coveralls.io/repos/github/poanetwork/blockscout/badge.svg?branch=master)](https://coveralls.io/github/poanetwork/blockscout?branch=master) [![Join the chat at https://gitter.im/poanetwork/blockscout](https://badges.gitter.im/poanetwork/blockscout.svg)](https://gitter.im/poanetwork/blockscout?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

</div>

## About BiktubChain Explorer

Bitkub Chain Explorer is an Elixir application that allows users to search transactions, view accounts and balances, and verify smart contracts on the Biktub Chain network including all block data and transactions.

Currently available full-featured block explorers (Etherscan, Etherchain, Blockchair) are closed systems which are not independently verifiable.  As Ethereum sidechains continue to proliferate in both private and public settings, transparent, open-source tools are needed to analyze and validate transactions.

## BiktubChain Supported Projects

Biktub Chain supports a number of projects. Hosted instances include POA Network, xDai Chain, Ethereum Classic, Sokol & Kovan testnets, and other EVM chains. 

- [List of hosted mainnets, testnets, and additional chains using BlockScout](https://docs.blockscout.com/for-projects/supported-projects)
- [Hosted instance versions](https://docs.blockscout.com/about/use-cases/hosted-blockscout)

## Prerequisites
- Install docker

## Step to run the explorer
1. `git clone https://gitlab.com/bitkub-chain/bkc-explorer.git`
2. `cd bkc-explorer`
3. run `source env_mainnet.sh`
3. run `docker-compose up -d`
4. run `docker ps` to get ID of explorer_web container (make sure there are 2 containers, one for web and another one for database)
5. run `docker exec -it {container-ID} bash`
6. run `echo $$MIX_ENV && mix do ecto.create, ecto.migrate` to create tables in database
7. `cd apps/block_scout_web`
8. run `mix phx.gen.cert` to generate app's certification
9. `exit`
10. run `docker exec {container-ID} mix phx.server` this might take long
7. try to access at url: **http://{ip-address}** or **http://{domain name}**

## License

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
