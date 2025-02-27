require "rails_helper"

RSpec.describe "Api::V1::Current::Articles", type: :request do
  describe "GET api/v1/current/articles" do
    subject { get(api_v1_current_articles_path, headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:other_user) { create(:user) }

    before { create_list(:article, 2, user: other_user) }

    context "when articles exist for the logged-in user" do
      before { create_list(:article, 3, user: current_user) }

      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 3

        expect(res[0].keys).to eq [
          "id",
          "categories",
          "title",
          "background",
          "content",
          "status",
          "created_at",
          "from_today",
          "user"
        ]

        expect(res[0]["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "ログインユーザーに紐づく articles レコードが存在しない場合" do
      it "空の配列が返る" do
        subject
        res = JSON.parse(response.body)

        expect(res["articles"]).to eq []
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/current/articles/:id" do
    subject { get(api_v1_current_article_path(id), headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context ":id がログインユーザーに紐づく articles レコードの id である場合" do
      let(:current_user_article) { create(:article, user: current_user) }
      let(:id) { current_user_article.id }

      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)

        expect(res.keys).to eq [
          "id",
          "categories",
          "title",
          "background",
          "content",
          "status",
          "created_at",
          "from_today",
          "answers_count",
          "user"
        ]

        expect(res["user"].keys).to eq [
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

    context ":id がログインユーザーに紐づく articles レコードの id ではない場合" do
      let(:other_user_article) { create(:article) }
      let(:id) { other_user_article.id }

      it "例外が発生する" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "POST api/v1/current/articles" do
    subject { post(api_v1_current_articles_path, headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context "ログインユーザーに紐づく未保存ステータスの保険相談が0件の場合" do
      it "未保存ステータスの保険相談が新規作成される" do
        expect { subject }.to change { current_user.articles.count }.by(1)
        expect(current_user.articles.last).to be_unsaved
        res = JSON.parse(response.body)

        expect(res.keys).to eq [
          "id",
          "categories",
          "title",
          "background",
          "content",
          "status",
          "created_at",
          "from_today",
          "answers_count",
          "user"
        ]

        expect(res["user"].keys).to eq [
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

    context "ログインユーザーに紐づく未保存ステータスの保険相談が1件の場合" do
      before { create(:article, user: current_user, status: :unsaved) }

      it "未保存ステータスの保険相談が新規作成される" do
        expect { subject }.not_to change { current_user.articles.count }
        res = JSON.parse(response.body)

        expect(res.keys).to eq [
          "id",
          "categories",
          "title",
          "background",
          "content",
          "status",
          "created_at",
          "from_today",
          "answers_count",
          "user"
        ]

        expect(res["user"].keys).to eq [
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
  end

  describe "PATCH api/v1/current/articles" do
    subject { patch(api_v1_current_article_path(id), headers:, params:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:params) { { "article": { "title": "テストタイトル2", "background": "テスト背景2", "content": "テスト本文2", "status": "published" } } }

    context ":id がログインユーザーに紐づく articles レコードの id である場合" do
      let(:current_user_article) { create(:article, title: "テストタイトル1", content: "テスト本文1", status: :draft, user: current_user) }
      let(:id) { current_user_article.id }

      it "正常にレコードを更新できる" do
        expect { subject }.to change { current_user_article.reload.title }.from("テストタイトル1").to("テストタイトル2")
        expect { subject }.to change { current_user_article.reload.background }.from("テスト背景1").to("テスト背景2")
        expect { subject }.to change { current_user_article.reload.content }.from("テスト本文1").to("テスト本文2")
        expect { subject }.to change { current_user_article.reload.status }.from("draft").to("published")

        res = JSON.parse(response.body)

        expect(res.keys).to eq [
          "id",
          "categories",
          "title",
          "background",
          "content",
          "status",
          "created_at",
          "from_today",
          "user"
        ]

        expect(res["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    context ":id がログインユーザーに紐づく articles レコードの id ではない場合" do
      let(:other_user_article) { create(:article, user: other_user) }
      let(:id) { other_user_article.id }

      it "例外が発生する" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
