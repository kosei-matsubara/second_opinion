require "rails_helper"

RSpec.describe "Api::V1::Answers", type: :request do
  describe "GET /index" do
    let!(:article) { create(:article) }
    let!(:answers) { create_list(:answer, 3, article: article) }

    context "全ての回答を取得する場合" do
      before { get "/api/v1/answers" }

      it "成功のステータスコードを返す" do
        expect(response).to have_http_status(:ok)
      end

      it "正しいJSONデータを返す" do
        json = JSON.parse(response.body)
        expect(json["data"].size).to eq(3)
        expect(json["meta"]["total_count"]).to eq(3)
      end
    end

    context "特定の記事に紐づく回答を取得する場合" do
      before { get "/api/v1/answers", params: { article_id: article.id } }

      it "成功のステータスコードを返す" do
        expect(response).to have_http_status(:ok)
      end

      it "指定したarticle_idの回答のみを取得する" do
        json = JSON.parse(response.body)
        expect(json["data"].all? { |a| a["attributes"]["article_id"] == article.id }).to be_truthy
      end
    end
  end
end
