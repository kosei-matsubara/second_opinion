class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  belongs_to :user, serializer: UserSerializer
  belongs_to :article, serializer: ArticleSerializer
end
