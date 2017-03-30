Rails.application.routes.draw do
  get 'faker', to: 'faker#fake', as: 'faker'
  get 'fakeoff', to: 'faker#fakeOff', as: 'fakeoff'

  devise_for :users
  root 'static#homepage'

  resources :participants
  resources :trainees
  resources :wearables
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
