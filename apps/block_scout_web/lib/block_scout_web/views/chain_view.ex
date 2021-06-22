defmodule BlockScoutWeb.ChainView do
  use BlockScoutWeb, :view

  import Number.Currency, only: [number_to_currency: 1, number_to_currency: 2]

  alias BlockScoutWeb.LayoutView
  alias Explorer.Chain.Supply.TokenBridge

  defp market_cap(:standard, %{available_supply: available_supply, usd_value: usd_value})
       when is_nil(available_supply) or is_nil(usd_value) do
    Decimal.new(0)
  end

  defp market_cap(:standard, %{available_supply: available_supply, usd_value: usd_value}) do
    Decimal.mult(available_supply, usd_value)
  end

  defp market_cap(:standard, exchange_rate) do
    exchange_rate.market_cap_usd
  end

  defp market_cap(module, exchange_rate) do
    module.market_cap(exchange_rate)
  end

  defp total_market_cap_from_token_bridge(%{usd_value: usd_value}) do
    TokenBridge.token_bridge_market_cap(%{usd_value: usd_value})
  end

  defp total_market_cap_from_omni_bridge do
    TokenBridge.total_market_cap_from_omni_bridge()
  end

  defp token_bridge_supply? do
    if System.get_env("SUPPLY_MODULE") === "TokenBridge", do: true, else: false
  end

  defp format_usd_value(value) do
    "#{format_currency_value(value)} USD"
  end

  defp format_currency_value(value, symbol \\ "$")

  defp format_currency_value(value, symbol) when value < 0 do
    "#{symbol}0.000000"
  end

  defp format_currency_value(value, symbol) when value < 0.000001 do
    "Less than #{symbol}0.000001"
  end

  defp format_currency_value(value, _symbol) when value < 1 do
    "#{number_to_currency(value, precision: 6)}"
  end

  defp format_currency_value(value, _symbol) when value < 100_000 do
    "#{number_to_currency(value)}"
  end

  defp format_currency_value(value, _symbol) do
    "#{number_to_currency(value, precision: 0)}"
  end

  def translate_time_unit(fullString) do
    cond do
      (String.ends_with? fullString, "milliseconds") -> String.replace(fullString, "milliseconds", "มิลลิวินาที")
      (String.ends_with? fullString, "millisecond") -> String.replace(fullString, "millisecond", "มิลลิวินาที")
      (String.ends_with? fullString, "seconds") -> String.replace(fullString, "seconds", "วินาที")
      (String.ends_with? fullString, "second") -> String.replace(fullString, "second", "วินาที")
      (String.ends_with? fullString, "minutes") -> String.replace(fullString, "minutes", "นาที")
      (String.ends_with? fullString, "minute") -> String.replace(fullString, "minute", "นาที")
      (String.ends_with? fullString, "hours") -> String.replace(fullString, "hours", "ชั่วโมง")
      (String.ends_with? fullString, "hour") -> String.replace(fullString, "hour", "ชั่วโมง")
      (String.ends_with? fullString, "days") -> String.replace(fullString, "days", "วัน")
      (String.ends_with? fullString, "day") -> String.replace(fullString, "day", "วัน")
      (String.ends_with? fullString, "weeks") -> String.replace(fullString, "weeks", "สัปดาห์")
      (String.ends_with? fullString, "week") -> String.replace(fullString, "week", "สัปดาห์")
      (String.ends_with? fullString, "months") -> String.replace(fullString, "months", "เดือน")
      (String.ends_with? fullString, "month") -> String.replace(fullString, "month", "เดือน")
      (String.ends_with? fullString, "years") -> String.replace(fullString, "years", "ปี")
      (String.ends_with? fullString, "year") -> String.replace(fullString, "year", "ปี")
      true -> fullString
    end
  end

end
