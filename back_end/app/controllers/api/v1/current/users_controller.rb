class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    # serializerを定義してユーザーテーブルからの取得項目を制御する
    render json: current_user, serializer: CurrentUserSerializer
  end
end
