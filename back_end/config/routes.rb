Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"

      namespace :user do
        resource :confirmations, only: [:update]
      end

      namespace :current do
        resource :user, only: [:show, :update]
        resources :articles, only: [:index, :show, :create, :update]
        resources :answers, only: [:index, :create]
      end

      resources :users, only: [:index, :show]
      resources :articles, only: [:index, :show]
      resources :answers, only: [:index]
    end
  end
end
