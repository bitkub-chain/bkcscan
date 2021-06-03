defmodule BlockScoutWeb.Plugs.Locale do
  import Plug.Conn

  @locales ["en", "th"]

  def init(default), do: default

  def call(%Plug.Conn{params: %{"locale" => loc}} = conn, _default) when loc in @locales do
    assign(conn, :locale, loc)
    Gettext.put_locale(BlockScoutWeb.Gettext, loc)
    conn = put_resp_cookie conn, "locale", loc, max_age: 10*24*60*60 # <===
    conn |> put_session(:locale, loc)
  end

end
