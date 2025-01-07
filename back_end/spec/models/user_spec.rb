require "rails_helper"

RSpec.describe User, type: :model do
  describe "Deviseの認証をテストする" do
    context "factoryのデフォルト設定の場合" do
      let(:user) { create(:user) }

      it "認証済userレコードを新規作成する" do
        expect(user).to be_valid
        expect(user).to be_confirmed
      end

      it "認証済userレコードを作成できない場合はエラーとなる" do
        expect(user).to be_valid
        expect(user).to be_confirmed
      end
    end
  end

  describe "enumをテストする" do
    context "user_division" do
      it "policyholderが定義通りである" do
        expect(User.user_divisions[:policyholder]).to eq(10)
      end

      it "insurance_agentが定義通りである" do
        expect(User.user_divisions[:insurance_agent]).to eq(20)
      end
    end

    context "sex" do
      it "maleが定義通りである" do
        expect(User.sexes[:male]).to eq(10)
      end

      it "femaleが定義通りである" do
        expect(User.sexes[:female]).to eq(20)
      end
    end

    context "generation" do
      it "teensが定義通りである" do
        expect(User.generations[:teens]).to eq(10)
      end

      it "twentiesが定義通りである" do
        expect(User.generations[:twenties]).to eq(20)
      end

      it "thirtiesが定義通りである" do
        expect(User.generations[:thirties]).to eq(30)
      end

      it "fortiesが定義通りである" do
        expect(User.generations[:forties]).to eq(40)
      end

      it "fiftiesが定義通りである" do
        expect(User.generations[:fifties]).to eq(50)
      end

      it "sixties_and_aboveが定義通りである" do
        expect(User.generations[:sixties_and_above]).to eq(60)
      end
    end

    context "family_structure" do
      it "singleが定義通りである" do
        expect(User.family_structures[:single]).to eq(10)
      end

      it "coupleが定義通りである" do
        expect(User.family_structures[:couple]).to eq(20)
      end

      it "couple_with_childrenが定義通りである" do
        expect(User.family_structures[:couple_with_children]).to eq(30)
      end
    end
  end

  describe "validateをテストする" do
    context "factoryのデフォルト設定の場合" do
    end
  end
end
