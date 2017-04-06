Rails.application.routes.draw do

  get 'faker', to: 'faker#fake', as: 'faker'
  get 'fakeoff', to: 'faker#fakeOff', as: 'fakeoff'

  get 'start_training/:id', to: 'mqtt#start_training', as: 'start_training'
  get 'stop_training/:id', to: 'mqtt#stop_training', as: 'stop_training'

  get 'activities', to: 'activities#index', as: 'activities'
  get 'activities/:id', to: 'activities#show', as: 'activity'

  get 'participants', to: 'participants#index', as: 'participants'
  get 'participants/:id', to: 'participants#show', as: 'participant'

  get 'static/homepage' => 'static#homepage', as: 'homepage'

  get 'user_edit',  to:'users#edit', as: 'user_edit'
  put 'user_update/:id', to:'users#update', as: 'user_update'
  put 'updateAAR/:id', to: 'trainings#updateAAR', as:'updateAAR'



  devise_for :users, controllers: {
       registrations: 'users/registrations'

     }
     devise_scope :user do
       root :to => 'devise/sessions#new'
     end
  resources :users
  resources :trainees
  resources :trainings
  root 'static#homepage'
end
