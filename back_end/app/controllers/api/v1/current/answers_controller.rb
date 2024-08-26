class Api::V1::Current::AnswersController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    answers = current_user.answers.order(created_at: :desc).includes([:article])

    # 合計件数を取得する
    total_count = answers.count

    # メタ情報に合計件数を含める
    render json: answers, meta: { total_count: total_count }, adapter: :json
  end

  def create
    answer = current_user.answers.create!(answer_params)
    render json: answer
  end

  # 不要になるかも
  # def update
  #   answer = current_user.answers.find(params[:id])
  #   answer.update!(answer_params)
  #   render json: answer
  # end

  private

  def answer_params
    params.require(:answer).permit(:content, :article_id)
  end
end
