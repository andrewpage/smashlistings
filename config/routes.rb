Smashlistings::Application.routes.draw do
  root to: "pages#home"

  match 'about', to: 'pages#about', via: 'get'

  devise_for :users
  resources :users

  resources :events
end
