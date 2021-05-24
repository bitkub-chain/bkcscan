defmodule Explorer.Repo.Migrations.AddIsOfficialColumnToTokes do
    use Ecto.Migration
  
    def change do
      alter table(:tokens) do
        add(:is_official, :boolean, null: true)
      end
    end
  end
  