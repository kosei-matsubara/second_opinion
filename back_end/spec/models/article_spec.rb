require "rails_helper"

RSpec.describe Article, type: :model do
  context "factoryのデフォルト設定に従った時" do
    subject { create(:article) }

    it "正常にレコードを新規作成する" do
      expect { subject }.to change { described_class.count }.by(1)
    end
  end

  describe "Validations" do
    subject { article.valid? }

    let(:article) { build(:article, title:, background:, content:, status:, user:) }
    let(:title) { Faker::Lorem.sentence }
    let(:background) { Faker::Lorem.paragraph }
    let(:content) { Faker::Lorem.paragraph }
    let(:status) { :published }
    let(:user) { create(:user) }

    context "全ての値が正常である場合" do
      it "検証結果が正常修了する" do
        expect(subject).to be_truthy
      end
    end

    context "ステータスが公開済みかつ、タイトルがNullの場合" do
      let(:title) { "" }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsy
        expect(article.errors.full_messages).to eq ["タイトルを入力してください"]
      end
    end

    context "ステータスが公開済かつ、質問が未入力の場合" do
      let(:content) { "" }
      let(:background) { "" }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsy
        expect(article.errors.full_messages).to include("背景を入力してください", "質問を入力してください")
      end
    end

    context "ステータスが未保存かつ、すでに同一ユーザーが未保存ステータスの保険相談レコードを保持の場合" do
      let(:status) { :unsaved }

      before { create(:article, status: :unsaved, user:) }

      it "例外エラーが発生する" do
        expect { subject }.to raise_error(StandardError, "未保存の相談は複数保有できません")
      end
    end
  end

  describe "Scopes" do
    let!(:published_article) { create(:article, status: :published) }
    let!(:draft_article) { create(:article, status: :draft) }

    it "公開された記事のみ取得できる" do
      expect(described_class.published).to include(published_article)
      expect(described_class.published).not_to include(draft_article)
    end
  end
end
