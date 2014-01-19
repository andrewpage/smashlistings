class EventsController < ApplicationController
	def index
		@events = Event.all
	end

	def show
		@event = Event.find(params[:id])
	end

	def new
		@event = Event.new
		@user = current_user
	end

	def create
		@event = Event.new(event_params)
		@event.host_id = params['event']['host_id']

		if @event.save
			redirect_to @event
		else
			redirect_to events_path
		end
	end

	def find
	end

	def map_api
		min_lat = params['minLat']
		max_lat = params['maxLat']

		min_lng = params['minLng']
		max_lng = params['maxLng']

		print "MinLat: %s, MaxLat: %s. MinLng: %s, MaxLng: %s" % [min_lat, max_lat, min_lng, max_lng]
	end

	private
	def event_params 
		params.require(:event).permit(:name, :address, :time, :max_occup)
	end
end
