class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # devise_token_authは新規userアカウントを登録時、デフォルトはemailとpasswordをuserレコードに登録するためnameを追加する
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
