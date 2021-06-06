defmodule BlockScoutWeb.Cldr do
  @moduledoc """
  Cldr global configuration.
  """

  use Cldr,
    default_locale: "th",
    locales: ["en","th"],
    gettext: BlockScoutWeb.Gettext,
    generate_docs: false,
    precompile_number_formats: ["#,###", "#,##0.##################", "#.#%", "#,##0"],
    providers: [Cldr.Number, Cldr.Unit]
end
