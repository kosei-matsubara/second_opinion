class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_user, only: [:update] # プロフィールの更新前データを取得する

  def show
    # serializerを定義してユーザーテーブルからの取得項目を制御する
    render json: current_user, serializer: CurrentUserSerializer
  end

  def update
    @user.update!(user_params)
    render json: @user
  end

  private

    def set_user
      # サインインユーザーのデータを取得する
      @user = current_user
    end

    def user_params
      params.require(:user).permit(
        :user_division,
        :name,
        :sex,
        :generation,
        :family_structure,
        :prefectures,
        :belong,
        :address,
        :self_introduction,
        :my_strength,
        :career,
        :message,
        :access,
        :website,
        :inquiry_opening_time,
        :inquiry_telephone_number
      )
    end
end
