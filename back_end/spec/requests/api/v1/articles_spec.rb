require "rails_helper"

RSpec.describe "Api::V1::Articles", type: :request do
  describe "GET api/v1/articles" do
    subject { get(api_v1_articles_path(params)) }

    before do
      # 公開済みの保険相談2件、下書きの保険相談8件を作成
      create_list(:article, 2, status: :published)
      create_list(:article, 8, status: :draft)
    end

    context "page を params で送信しない場合" do
      let(:params) { nil }

      it "1ページ目のレコード10件取得する" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["articles", "meta"]
        expect(res["articles"].length).to eq 10

        expect(res["articles"][0].keys).to eq [
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

        expect(res["articles"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 1
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end

    context "page を params で送信した場合" do
      let(:params) { { page: 2 } }

      it "該当ページにおいてレコード10件取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["articles", "meta"]
        expect(res["articles"].length).to eq 10

        expect(res["articles"][0].keys).to eq [
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

        expect(res["articles"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 2
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/articles/:id" do
    subject { get(api_v1_article_path(article_id)) }

    let(:article) { create(:article, status:) }

    context "article_id に対応する articles レコードが存在する場合" do
      let(:article_id) { article.id }

      context "articles レコードのステータスが公開中の場合" do
        let(:status) { :published }

        it "正常にレコードを取得する" do
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

      context "articles レコードのステータスが下書きの場合" do
        let(:status) { :draft }

        it "ActiveRecord::RecordNotFound エラーが返る" do
          expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    context "article_id に対応する「articles」レコードが存在しない場合" do
      let(:article_id) { 10_000_000_000 }

      it "ActiveRecord::RecordNotFound エラーが返る" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
