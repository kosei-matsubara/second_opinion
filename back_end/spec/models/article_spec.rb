require "rails_helper"

RSpec.describe Article, type: :model do
  context "factoryのデフォルト設定に従った時" do
    subject { create(:article) }

    it "正常にレコードを新規作成する" do
      expect { subject }.to change { Article.count }.by(1)
    end
  end

  describe "Validations" do
    subject { article.valid? }

    let(:article) { build(:article, title:, content:, status:, user:) }
    let(:title) { Faker::Lorem.sentence }
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
        expect(article.errors.full_messages).to eq ["本文を入力してください"]
      end
    end

    context "ステータスが未保存かつ、すでに同一ユーザーが未保存ステータスの保険相談レコードを保持の場合" do
      let(:status) { :unsaved }

      before { create(:article, status: :unsaved, user:) }

      it "例外エラーが発生する" do
        expect { subject }.to raise_error(StandardError)
      end
    end

    # context "タイトルの文字数上限の確認" do
    #   let(:content) { "a" * 50 } # コンテンツは50文字

    #   it "エラーメッセージが返る" do
    #     expect( subject ).to be_valid
    #   end
    # end
  end
end
