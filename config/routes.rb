Rails.application.routes.draw do

  root 'static#homepage'

  devise_for :users

  get 'activities/index'
  get 'activities/:id', to: 'activities#show', as: 'activity'

  get 'participants/index'
  get 'participants/:id', to: 'participants#show', as: 'participant'
  
  resources :trainings
end
