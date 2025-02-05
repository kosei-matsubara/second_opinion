module DeviseHackFakeSession
  extend ActiveSupport::Concern

  class FakeSession < Hash
    # セッションを無効にする
    def enabled?
      false
    end

    # セッションの削除を無効化する
    def destroy; end
  end

  included do
    before_action :set_fake_session

    private

    def set_fake_session
      # RailsがAPIモードで動作する場合に処理を実行する
      if Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only
        # APIモードではrack.sessionは存在しないがDeviseがrack.sessionを要求する場合があるため、それを回避するために代わりにFakeSessionを設定する
        request.env["rack.session"] ||= ::DeviseHackFakeSession::FakeSession.new
      end
    end
  end
end
