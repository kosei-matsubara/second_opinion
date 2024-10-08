class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :article

  scope :by_article, ->(article_id) { where(article_id: article_id) }

  # 保険相談の回答時にバリデーションをする
  validates :content, presence: true, length: { maximum: 600 }
end
