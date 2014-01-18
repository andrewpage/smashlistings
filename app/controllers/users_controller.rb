class UsersController < ApplicationController
	private
	def user_params
		params.require(:user).permit(:username, :first_name,
									 :last_name, :address, :city, 
									 :state, :country, :zip, :location, 
									 :birthdate)
	end
end
