class Events < ActiveRecord::Migration
  def change
  	add_column :events, :name, :string
  	add_column :events, :address, :string
  	add_column :events, :latitude, :float
  	add_column :events, :longitude, :float
  	add_column :events, :host_id, :integer
  	add_column :events, :attendees, :integer, :array => true
  end
end
