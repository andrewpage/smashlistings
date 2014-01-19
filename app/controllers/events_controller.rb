class EventsController < ApplicationController
	def index
		@events = Event.all
	end

	def show
		@event = Event.find(params[:id])
	end

	def new
		@event = Event.new
	end

	def create
	end

	def find
	end

	private
	def event_params 
		params.require(:event).permit(:name, :address, :time, :max_occup)
	end
end
