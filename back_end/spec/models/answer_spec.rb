require 'rails_helper'

RSpec.describe Answer, type: :model do
  describe "Validations" do
    subject { answer.valid? }

    let(:answer) { build(:answer, content:, article:, user:) }
    let(:content) { "Valid Answer Content" }
    let(:article) { create(:article) }
    let(:user) { create(:user) }

    context "when content is present" do
      it "is valid" do
        expect(subject).to be_truthy
      end
    end

    context "when content is empty" do
      let(:content) { "" }
      it "is invalid" do
        expect(subject).to be_falsy
        expect(answer.errors.full_messages).to include("内容を入力してください")
      end
    end

    context "when content exceeds 600 characters" do
      let(:content) { "a" * 601 }
      it "is invalid" do
        expect(subject).to be_falsy
        expect(answer.errors.full_messages).to include("内容は600文字以内で入力してください")
      end
    end
  end

  describe "Associations" do
    it { should belong_to(:user) }
    it { should belong_to(:article) }
  end

  describe "Scopes" do
    let!(:article1) { create(:article) }
    let!(:article2) { create(:article) }
    let!(:answer1) { create(:answer, article: article1) }
    let!(:answer2) { create(:answer, article: article2) }

    it "returns answers for a specific article" do
      expect(Answer.by_article(article1.id)).to include(answer1)
      expect(Answer.by_article(article1.id)).not_to include(answer2)
    end
  end
end
