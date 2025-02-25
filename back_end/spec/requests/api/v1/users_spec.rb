require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/v1/users" do
    subject(:request_users) { get api_v1_users_path, params: params }

    before do
      create_list(:user, 12, user_division: :insurance_agent)
      create_list(:user, 5, user_division: :policyholder)
    end

    context "ページパラメータが指定されていない場合" do
      let(:params) { nil }

      it "1ページ目の保険営業者のレコードを10件取得する" do
        request_users
        res = response.parsed_body # 修正: JSON.parse(response.body) → response.parsed_body
        expect(res.keys).to eq ["users", "meta"]
        expect(res["users"].length).to eq 10

        expect(res["users"][0].keys).to eq [
          "id",
          "email",
          "user_division",
          "name",
          "sex",
          "generation",
          "family_structure",
          "prefectures",
          "belong",
          "address",
          "self_introduction",
          "my_strength",
          "career",
          "message",
          "access",
          "website",
          "inquiry_opening_time",
          "inquiry_telephone_number",
          "created_at"
        ]

        expect(res["meta"].keys).to eq ["current_page", "total_pages", "total_count"]
        expect(res["meta"]["current_page"]).to eq 1
        expect(res["meta"]["total_pages"]).to be > 1
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET /api/v1/users/:id" do
    subject(:request_user) { get api_v1_user_path(user_id) }

    let(:user) { create(:user, user_division: user_division) }

    context "指定されたユーザーが存在する場合" do
      let(:user_id) { user.id }

      context "ユーザーが保険営業者の場合" do
        let(:user_division) { :insurance_agent }

        it "ユーザーの詳細を取得する" do
          request_user
          res = response.parsed_body # 修正: JSON.parse(response.body) → response.parsed_body

          expect(res.keys).to eq [
            "id",
            "email",
            "user_division",
            "name",
            "sex",
            "generation",
            "family_structure",
            "prefectures",
            "belong",
            "address",
            "self_introduction",
            "my_strength",
            "career",
            "message",
            "access",
            "website",
            "inquiry_opening_time",
            "inquiry_telephone_number",
            "created_at"
          ]

          expect(response).to have_http_status(:ok)
        end
      end

      context "ユーザーが保険契約者の場合" do
        let(:user_division) { :policyholder }

        it "ActiveRecord::RecordNotFound を返す" do
          expect { request_user }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    context "指定されたユーザーが存在しない場合" do
      let(:user_id) { 10_000_000_000 }

      it "ActiveRecord::RecordNotFound を返す" do
        expect { request_user }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
