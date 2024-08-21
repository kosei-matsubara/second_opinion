class CurrentUserSerializer < ActiveModel::Serializer
  # サインイン時の取得項目を定義する
  attributes :id, :name, :email
end
