require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/v1/users" do
    subject { get api_v1_users_path, params: params }

    before do
      create_list(:user, 2, user_division: :insurance_agent)
      create_list(:user, 8, user_division: :policyholder)
    end

    context "ページパラメータが指定されていない場合" do
      let(:params) { nil }

      it "1ページ目の保険営業者のレコードを10件取得する" do
        subject
        res = JSON.parse(response.body)

        expect(res.keys).to eq ["users", "meta"]
        expect(res["users"].length).to eq 2
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 1
        expect(res["meta"]["total_pages"]).to eq 1

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET /api/v1/users/:id" do
    subject { get api_v1_user_path(user_id) }

    let(:user) { create(:user, user_division: user_division) }

    context "指定されたユーザーが存在する場合" do
      let(:user_id) { user.id }

      context "ユーザーが保険営業者の場合" do
        let(:user_division) { :insurance_agent }

        it "ユーザーの詳細を取得する" do
          subject
          res = JSON.parse(response.body)

          expect(res.keys).to eq ["id", "name", "email", "user_division", "created_at"]
          expect(response).to have_http_status(:ok)
        end
      end

      context "ユーザーが保険契約者の場合" do
        let(:user_division) { :policyholder }

        it "ActiveRecord::RecordNotFound を返す" do
          expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    context "指定されたユーザーが存在しない場合" do
      let(:user_id) { 10_000_000_000 }

      it "ActiveRecord::RecordNotFound を返す" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
