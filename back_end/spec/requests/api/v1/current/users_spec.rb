require "rails_helper"

RSpec.describe "Api::V1::Current::Users", type: :request do
  describe "GET api/v1/current/user" do
    subject { get(api_v1_current_user_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    context "ヘッダー情報が正常に送られた場合" do
      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "name", "email", "user_division", "sex", "generation", "family_structure", "prefectures", "belong", "address", "self_introduction", "my_strength", "career", "message", "access", "website", "inquiry_opening_time", "inquiry_telephone_number"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "ヘッダー情報が空のままリクエストが送信された場合" do
      let(:headers) { nil }

      it "unauthorized エラーが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res["errors"]).to eq ["ログインもしくはアカウント登録してください。"]
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PATCH api/v1/current/user" do
    subject { patch(api_v1_current_user_path, headers:, params:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) do
      {
        user: {
          name: "更新ユーザー",
          self_introduction: "自己紹介更新", my_strength: "強み更新", career: "経歴更新", message: "メッセージ更新", access: "アクセス更新", website: "https://example.com", inquiry_opening_time: "9:00-18:00", inquiry_telephone_number: "123-456-7890"
        }
      }
    end

    context "ヘッダー情報が正常に送られた場合" do
      it "ユーザー情報が更新される" do
        expect { subject }.to change { current_user.reload.name }.to("更新ユーザー")
        expect { subject }.to change { current_user.reload.self_introduction }.to("自己紹介更新")
        expect { subject }.to change { current_user.reload.my_strength }.to("強み更新")
        expect { subject }.to change { current_user.reload.career }.to("経歴更新")
        expect { subject }.to change { current_user.reload.message }.to("メッセージ更新")
        expect { subject }.to change { current_user.reload.access }.to("アクセス更新")
        expect { subject }.to change { current_user.reload.website }.to("https://example.com")
        expect { subject }.to change { current_user.reload.inquiry_opening_time }.to("9:00-18:00")
        expect { subject }.to change { current_user.reload.inquiry_telephone_number }.to("123-456-7890")
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "name", "email", "self_introduction", "my_strength", "career", "message", "access", "website", "inquiry_opening_time", "inquiry_telephone_number"]
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
