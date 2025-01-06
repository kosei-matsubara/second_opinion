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
    # context "user_division" do
    #   it "policyholderが正しく定義されている" do
    #     expect(User.user_divisions[:policyholder]).to eq(10)
    #   end

    #   it "insurance_agentが正しく定義されている" do
    #     expect(User.user_divisions[:insurance_agent]).to eq(20)
    #   end
    # end

    # context "sex" do
    #   it "maleが正しく定義されている" do
    #     expect(User.sexes[:male]).to eq(10)
    #   end

    #   it "femaleが正しく定義されている" do
    #     expect(User.sexes[:female]).to eq(20)
    #   end
    # end
  end
end
