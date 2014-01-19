class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :configure_devise_params, if: :devise_controller?
  def configure_devise_params
  	devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :zip, :email, :password, :password_confirmation)
    end
    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(:first_name, :last_name, :address, :city, :state, :country, :zip, :location, :birthdate, :email, :password, :password_confirmation, :current_password)
    end
  end
end
