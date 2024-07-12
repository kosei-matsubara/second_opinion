class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at, :from_today
  
  def created_at
    object.created_at.strftime("%y/%m/%d")
  end

  def from_today # rubo
    now = TIme.zone.now
    created_at = object.created_at

    months = ()
  end
end
