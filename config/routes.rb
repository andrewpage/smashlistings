Smashlistings::Application.routes.draw do
  root to: "pages#home"

  match 'about', to: 'pages#about', via: 'get'
  match 'find', to: 'events#find', via: 'get'

  match 'map_api', to: 'events#map_api', via: 'get'
  
  devise_for :users
  resources :users

  resources :events
end
