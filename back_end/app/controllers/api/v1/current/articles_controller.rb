class Api::V1::Current::ArticlesController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    articles = current_user.articles.not_unsaved.order(created_at: :desc)

    # 合計件数を取得する
    total_count = articles.count

    # メタ情報に合計件数を含める 課題：合計件数を表示しない場合削除する
    render json: articles, meta: { total_count: total_count }, adapter: :json
  end

  def show
    article = current_user.articles.find(params[:id])
    render json: article
  end

  def create
    # 未保存ステータスの保険相談が存在する場合は該当レコードを返す
    # 未保存ステータスの保険相談が存在しない場合は未保存相談を新規作成する
    unsaved_article = current_user.articles.unsaved.first || current_user.articles.create!(status: :unsaved)
    render json: unsaved_article
  end

  def update
    article = current_user.articles.find(params[:id])
    article.update!(article_params)
    render json: article
  end

  private

    def article_params
      params.require(:article).permit(:categories, :title, :background, :content, :status)
    end
end
