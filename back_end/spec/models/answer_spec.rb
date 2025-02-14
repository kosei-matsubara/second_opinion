require "rails_helper"

RSpec.describe Answer, type: :model do
  describe "バリデーションをテストする" do
    subject { answer.valid? }

    let(:answer) { build(:answer, content:, article:, user:) }
    let(:content) { "有効な回答内容" }
    let(:article) { create(:article) }
    let(:user) { create(:user) }

    context "contentが存在する場合" do
      it "データが有効である" do
        expect(subject).to be_truthy
      end
    end

    context "contentが空の場合" do
      let(:content) { "" }
      it "データが無効である" do
        expect(subject).to be_falsy
        expect(answer.errors.full_messages).to include("回答を入力してください")
      end
    end

    context "contentが601文字以上の場合" do
      let(:content) { "a" * 601 }
      it "データが無効である" do
        expect(subject).to be_falsy
        expect(answer.errors.full_messages).to include("回答は600文字以内で入力してください")
      end
    end
  end

  describe "スコープをテストする" do
    let!(:article1) { create(:article) }
    let!(:article2) { create(:article) }
    let!(:answer1) { create(:answer, article: article1) }
    let!(:answer2) { create(:answer, article: article2) }

    it "特定の記事に紐づく回答を取得できる" do
      expect(described_class.by_article(article1.id)).to include(answer1)
      expect(described_class.by_article(article1.id)).not_to include(answer2)
    end
  end
end
