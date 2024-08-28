class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  belongs_to :user, serializer: UserSerializer
  belongs_to :article, serializer: ArticleSerializer

  # 回答作成日をフォーマットする
  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end
