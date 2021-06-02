defmodule BlockScoutWeb.API.RPC.Circulation do
  use BlockScoutWeb, :controller
  import Ecto.Query

  alias Explorer.{Repo}


  alias Explorer.Chain.{
    Address,
    Transaction
  }


  def get_circulation(conn, _params) do
    # address_list = ["decode('D78A91F21B12de8793BB8616961F31BEefa97fE4','hex')","decode('FE28FfD8c528066bE3aE4B0D95db0478EfBA7413','hex')","decode('755FD36eC8F6E2eb69bCeC441bacA89855747d50','hex')","decode('c9760469d7635916D20329e4bac99ffBBFD38DF4','hex')","decode('6DfBA1364e9627b863c6188a6545000e675E5898','hex')","decode('c6422b55db8b3288a1f8316bc07375948e08082f','hex')","decode('52cB901D945B7499f1457d36b882a59cDe9664D5','hex')"]
    query = from( a0 in Address,
        select: fragment("SUM(a0.fetched_coin_balance_block_number)"),
        where: fragment(" a0.hash in (
          decode('D78A91F21B12de8793BB8616961F31BEefa97fE4','hex'),
          decode('FE28FfD8c528066bE3aE4B0D95db0478EfBA7413','hex'),
          decode('755FD36eC8F6E2eb69bCeC441bacA89855747d50','hex'),
          decode('c9760469d7635916D20329e4bac99ffBBFD38DF4','hex'),
          decode('6DfBA1364e9627b863c6188a6545000e675E5898','hex'),
          decode('c6422b55db8b3288a1f8316bc07375948e08082f','hex'),
          decode('52cB901D945B7499f1457d36b882a59cDe9664D5','hex')
        ) ")
      )

    result_circulation = Repo.one!(query, timeout: :infinity) || 0

    render(conn, "get_circulation.json", result: result_circulation)

  end

  def get_sumgas(conn, _params) do

    query =
      from(
        t0 in Transaction,
        select: fragment("SUM(t0.gas_used)")
      )

    result_sum_gas = Repo.one!(query, timeout: :infinity) || 0

    render(conn, "get_sumgas.json", result: result_sum_gas)
  end
end
