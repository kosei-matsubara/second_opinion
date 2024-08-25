class Api::V1::Current::AnswersController < Api::V1::BaseController
  before_action :authenticate_user!

  def create
    answer = current_user.answers.create!
    render json: answer
  end

  def update
    answer = current_user.answers.find(params[:id])
    answer.update!(answer_params)
    render json: answer
  end

  private

  def answer_params
    params.require(:answer).permit(:content)
  end
end
