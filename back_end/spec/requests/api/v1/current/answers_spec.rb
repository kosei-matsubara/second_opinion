require "rails_helper"

RSpec.describe "Api::V1::Current::Answers", type: :request do
  let(:user) { create(:user) }
  let!(:answers) { create_list(:answer, 3, user: user) }
  let(:headers) { user.create_new_auth_token }

  describe "GET /api/v1/current/answers" do
    subject { get api_v1_current_answers_path, headers: headers }

    context "認証されたユーザーがリクエストした場合" do
      it "ユーザーの回答を取得する" do
        subject
        res = JSON.parse(response.body)

        expect(res.keys).to eq ["data", "meta"]
        expect(res["data"].size).to eq 3
        expect(res["meta"].keys).to eq ["total_count"]
        expect(res["meta"]["total_count"]).to eq 3

        expect(response).to have_http_status(:ok)
      end
    end

    context "認証されていないユーザーがリクエストした場合" do
      let(:headers) { {} }

      it "認証エラーを返す" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /api/v1/current/answers" do
    subject { post api_v1_current_answers_path, params: params, headers: headers }

    let(:article) { create(:article) }
    let(:params) { { answer: { content: "テスト回答", article_id: article.id } } }

    context "認証されたユーザーがリクエストした場合" do
      it "新しい回答を作成する" do
        expect { subject }.to change { Answer.count }.by(1)
        expect(response).to have_http_status(:ok)
      end
    end

    context "認証されていないユーザーがリクエストした場合" do
      let(:headers) { {} }

      it "認証エラーを返す" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
