defmodule BlockScoutWeb.API.RPC.Circulation do
  use BlockScoutWeb, :controller

  import BlockScoutWeb.Chain, only: [paging_options: 1, next_page_params: 3, split_list_by_page: 1]

  alias Explorer.Chain

  alias Explorer.Chain.Transaction

  @query_where """
  t.contract_address_hash IN (
    decode('D78A91F21B12de8793BB8616961F31BEefa97fE4','hex'),
    decode('FE28FfD8c528066bE3aE4B0D95db0478EfBA7413','hex'),
    decode('755FD36eC8F6E2eb69bCeC441bacA89855747d50','hex'),
    decode('c9760469d7635916D20329e4bac99ffBBFD38DF4','hex'),
    decode('6DfBA1364e9627b863c6188a6545000e675E5898','hex'),
    decode('c6422b55db8b3288a1f8316bc07375948e08082f','hex'),
    decode('52cB901D945B7499f1457d36b882a59cDe9664D5','hex')
  )
"""

  defp get_circulation() do


    query =
      from( a0 in Address,
      select: fragment("1000000000 - SUM(a0.fetched_coin_balance)"),
      where: [@query_where]
      )

    render(conn, Repo.one!(query, timeout: :infinity) || 0, %{status: true})
  end
end
