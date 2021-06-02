defmodule BlockScoutWeb.API.RPC.CirculationView do
  use BlockScoutWeb, :view

  alias BlockScoutWeb.API.RPC.RPCView

  def render("get_circulation.json", %{result: result}) do
    RPCView.render("show.json", data: result)
  end

  def render("get_sumgas.json", %{result: result}) do
    RPCView.render("show.json", data: result)
  end

  def render("error.json", assigns) do
    RPCView.render("error.json", assigns)
  end

end
