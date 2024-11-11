class Api::V1::UsersController < Api::V1::BaseController
  include Pagination

  def index
    users = User.insurance_agent
                .order(created_at: :desc)
                .page(params[:page] || 1)
                .per(10)

    # メタ情報にページネーション情報と取得レコード合計件数を含める
    render json: users, meta: pagination(users), adapter: :json
  end

  def show
    # 保険営業者かつ指定IDの保険営業者プロフィールを取得する
    user = User.insurance_agent.find(params[:id])
    render json: user
  end
end
