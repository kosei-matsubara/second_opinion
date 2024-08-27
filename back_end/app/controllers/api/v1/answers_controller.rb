class Api::V1::AnswersController < Api::V1::BaseController

  def index
    # article_idが指定されている場合はscopeを適用する
    answers = params[:article_id] ? Answer.by_article(params[:article_id]) : Answer.all
    answers = answers.order(created_at: :desc).includes(:article, :user)

    # 合計件数を取得する
    total_count = answers.count

    # メタ情報に合計件数を含める
    render json: answers, meta: { total_count: total_count }, adapter: :json
  end
end
