class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :configure_devise_params, if: :devise_controller?
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = '*'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end

  def configure_devise_params
  	devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :zip, :email, :password, :password_confirmation)
    end
    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(:first_name, :last_name, :address, :city, :state, :country, :zip, :location, :birthdate, :email, :password, :password_confirmation, :current_password)
    end
  end
end
