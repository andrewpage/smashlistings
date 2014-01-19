class AddingStuffToEevents < ActiveRecord::Migration
  def change
  	add_column :events, :time, :datetime
  	add_column :events, :max_occup, :integer
  end
end
