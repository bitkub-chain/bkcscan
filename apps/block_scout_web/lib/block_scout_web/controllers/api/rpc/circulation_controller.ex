defmodule BlockScoutWeb.API.RPC.Circulation do
  use BlockScoutWeb, :controller

  import BlockScoutWeb.Chain, only: [paging_options: 1, next_page_params: 3, split_list_by_page: 1]

  alias Explorer.Chain

  alias Explorer.Chain.Transaction

  def gettxinfo(conn, params) do
    with {:txhash_param, {:ok, txhash_param}} <- fetch_txhash(params),
         {:format, {:ok, transaction_hash}} <- to_transaction_hash(txhash_param),
         {:transaction, {:ok, %Transaction{revert_reason: revert_reason, error: error} = transaction}} <-
           transaction_from_hash(transaction_hash),
         paging_options <- paging_options(params) do
      logs = Chain.transaction_to_logs(transaction_hash, paging_options)
      {logs, next_page} = split_list_by_page(logs)

      transaction_updated =
        if error == "Reverted" do
          if revert_reason == nil do
            %Transaction{transaction | revert_reason: Chain.fetch_tx_revert_reason(transaction)}
          else
            transaction
          end
        else
          transaction
        end

      render(conn, :gettxinfo, %{
        transaction: transaction_updated,
        block_height: Chain.block_height(),
        logs: logs,
        next_page_params: next_page_params(next_page, logs, params)
      })
    else
      {:transaction, :error} ->
        render(conn, :error, error: "Transaction not found")

      {:txhash_param, :error} ->
        render(conn, :error, error: "Query parameter txhash is required")

      {:format, :error} ->
        render(conn, :error, error: "Invalid txhash format")
    end
  end

  def gettxreceiptstatus(conn, params) do
    with {:txhash_param, {:ok, txhash_param}} <- fetch_txhash(params),
         {:format, {:ok, transaction_hash}} <- to_transaction_hash(txhash_param) do
      status = to_transaction_status(transaction_hash)
      render(conn, :gettxreceiptstatus, %{status: status})
    else
      {:txhash_param, :error} ->
        render(conn, :error, error: "Query parameter txhash is required")

      {:format, :error} ->
        render(conn, :error, error: "Invalid txhash format")
    end
  end

  def getstatus(conn, params) do
    with {:txhash_param, {:ok, txhash_param}} <- fetch_txhash(params),
         {:format, {:ok, transaction_hash}} <- to_transaction_hash(txhash_param) do
      error = to_transaction_error(transaction_hash)
      render(conn, :getstatus, %{error: error})
    else
      {:txhash_param, :error} ->
        render(conn, :error, error: "Query parameter txhash is required")

      {:format, :error} ->
        render(conn, :error, error: "Invalid txhash format")
    end
  end

  defp fetch_txhash(params) do
    {:txhash_param, Map.fetch(params, "txhash")}
  end

  defp transaction_from_hash(transaction_hash) do
    case Chain.hash_to_transaction(transaction_hash, necessity_by_association: %{block: :required}) do
      {:error, :not_found} -> {:transaction, :error}
      {:ok, transaction} -> {:transaction, {:ok, transaction}}
    end
  end

  defp to_transaction_hash(transaction_hash_string) do
    {:format, Chain.string_to_transaction_hash(transaction_hash_string)}
  end

  defp to_transaction_status(transaction_hash) do
    case Chain.hash_to_transaction(transaction_hash) do
      {:error, :not_found} -> ""
      {:ok, transaction} -> transaction.status
    end
  end

  defp to_transaction_error(transaction_hash) do
    with {:ok, transaction} <- Chain.hash_to_transaction(transaction_hash),
         {:error, error} <- Chain.transaction_to_status(transaction) do
      error
    else
      _ -> ""
    end
  end
end

defp get_circulation() do

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
  query =
    from( a0 in Address,
    select: fragment("1000000000 - SUM(a0.fetched_coin_balance)"),
    where: [@query_where]
    )

  render(conn, Repo.one!(query, timeout: :infinity) || 0, %{status: true})
end
