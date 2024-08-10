class Api::V1::ArticlesController < Api::V1::BaseController
  include Pagination

  def index
    # 公開中の相談を取得し、ページネーションを適用する
    articles = Article.published
                      .order(created_at: :desc)
                      .page(params[:page] || 1)
                      .per(10)
                      .includes(:user)

    # メタ情報にページネーションを含める
    render json: articles, meta: pagination(articles), adapter: :json
  end

  def show
    # 公開中の相談かつ指定IDの相談を取得する
    article = Article.published.find(params[:id])
    render json: article
  end
end
