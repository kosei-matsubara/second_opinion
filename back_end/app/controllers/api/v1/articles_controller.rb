class Api::V1::ArticlesController < Api::V1::BaseController
  include Pagination

  def index
    # 公開中の保険相談を取得し、ページネーションを適用する
    articles = Article.published
                      .order(created_at: :desc)
                      .page(params[:page] || 1)
                      .per(10)
                      .includes(:user)

    # メタ情報にページネーション情報と取得レコード合計件数を含める
    render json: articles, meta: pagination(articles), adapter: :json
  end

  def show
    # 公開中かつ指定IDの保険相談を取得する
    article = Article.published.find(params[:id])
    render json: article
  end
end
