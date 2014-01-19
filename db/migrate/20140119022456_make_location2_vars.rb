class MakeLocation2Vars < ActiveRecord::Migration
  def change
  	remove_column :users, :location
  	add_column :users, :latitude, :float
  	add_column :users, :longitude, :float
  end
end
