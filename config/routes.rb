Rails.application.routes.draw do

  root 'static#homepage'

  get 'faker', to: 'faker#fake', as: 'faker'
  get 'fakeoff', to: 'faker#fakeOff', as: 'fakeoff'

  get 'start_training/:id', to: 'mqtt#start_training', as: 'start_training'
  get 'stop_training/:id', to: 'mqtt#stop_training', as: 'stop_training'

  get 'activities', to: 'activities#index', as: 'activities'
  get 'activities/:id', to: 'activities#show', as: 'activity'

  get 'participants', to: 'participants#index', as: 'participants'
  get 'participants/:id', to: 'participants#show', as: 'participant'


  devise_for :users, controllers: {
       registrations: 'users/registrations'
     }

     devise_scope :user do
     authenticated :user do
       root 'static#homepage', as: :authenticated_root
     end

     unauthenticated do
       root 'devise/sessions#new', as: :unauthenticated_root
     end
   end

  resources :trainees
  resources :trainings

end
