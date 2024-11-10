class Article < ApplicationRecord
  belongs_to :user
  has_many :answers

  enum :status, {
    unsaved: 10,
    draft: 20,
    published: 30
  }, _prefix: true

  # 保険相談のステータスが公開中に移行時、バリデーションをする
  with_options if: :published? do
    validates :categories, presence: true
    validates :title, presence: true, length: { maximum: 50 }
    validates :background, presence: true, length: { maximum: 600 }
    validates :content, presence: true, length: { maximum: 100 }
  end

  # 未保存の保険相談が複数存在しないことを確認する
  validate :verify_only_one_unsaved_status_is_allowed

  private

  # 未保存の相談が複数存在しないことを確認する
  def verify_only_one_unsaved_status_is_allowed
    if unsaved? && user.articles.unsaved.present?
      raise StandardError, "未保存の相談は複数保有できません"
    end
  end
end
