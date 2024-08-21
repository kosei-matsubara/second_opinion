class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!
  # プロフィールの更新前データを取得する
  before_action :set_user, only: [:update]

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
      # ユーザー区分で更新項目を制御する
      case @user.user_division
      when "policyholder"
        params.require(:user).permit(
          :user_division,
          :name,
          :sex,
          :generation,
          :family_structure,
          :prefectures
        )
      when "insurance_agent"
        params.require(:user).permit(
          :user_division,
          :name,
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
      else
        # 想定外のユーザー区分の場合はエラーを出力する
        raise ActionController::BadRequest, "不正なユーザー区分です: #{@user.user_division}"
      end
    end
end
