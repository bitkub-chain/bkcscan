defmodule BlockScoutWeb.Plugs.Locale do
  import Plug.Conn

  @locales ["en", "th"]

  def init(default), do: default

  # def call(%Plug.Conn{params: %{"locale" => loc}} = conn, _default) when loc in @locales do
  #   assign(conn, :locale, loc)
  #   Gettext.put_locale(BlockScoutWeb.Gettext, loc)
  #   conn = put_resp_cookie conn, "locale", loc, max_age: 10*24*60*60 # <===
  #   conn |> put_session(:locale, loc)
  # end

  @spec call(atom | %{:params => nil | maybe_improper_list | map, optional(any) => any}, any) ::
          atom | %{:params => nil | maybe_improper_list | map, optional(any) => any}
  def call(conn, _opts) do
    case locale_from_params(conn) || locale_from_cookies(conn) do
      nil     -> conn
      locale  ->
        Gettext.put_locale(BlockScoutWeb.Gettext, locale)
        Gettext.put_locale(locale)
        # Gettext.put_locale(conn.params["locale"])
        conn = conn |> persist_locale(locale)
        conn
    end
  end

  defp locale_from_params(conn) do
    conn.params["locale"] |> validate_locale
  end

  defp locale_from_cookies(conn) do
    conn.cookies["locale"] |> validate_locale
  end

  defp validate_locale(locale) when locale in @locales, do: locale

  defp validate_locale(_locale), do: nil

  defp persist_locale(conn, new_locale) do
    if conn.cookies["locale"] != new_locale do
      conn |> put_resp_cookie("locale", new_locale, max_age: 10 * 24 * 60 * 60)
    else
      conn
    end
  end


end
