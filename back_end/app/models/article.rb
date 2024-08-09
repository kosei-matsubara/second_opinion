class Article < ApplicationRecord
  belongs_to :user
  enum :status, { unsaved: 10, draft: 20, published: 30 }, _prefix: true

  # 記事が公開済の場合にバリデーションをする
  with_options if: :published? do
    validates :title, presence: true, length: { maximum: 50 }
    validates :background, presence: true, length: { maximum: 600 }
    validates :content, presence: true, length: { maximum: 100 }
  end

  validate :verify_only_one_unsaved_status_is_allowed

  private

    # 未保存の相談が複数存在しないことを確認する
    def verify_only_one_unsaved_status_is_allowed
      if unsaved? && user.articles.unsaved.present?
        raise StandardError, "未保存の相談は複数保有できません"
      end
    end
end
