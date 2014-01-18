class MakeColumnsUnique < ActiveRecord::Migration
  def change
  	remove_column :users, :username
  	add_column :users, :username, :string, :unique => true
  end
end
