class UserSerializer < ActiveModel::Serializer
  # 保険営業者のプロフィールに表示する項目を定義する
  attributes :name,
             :belong,
             :address,
             :self_introduction,
             :my_strength,
             :career,
             :message,
             :access,
             :website,
             :inquiry_opening_time,
             :inquiry_telephone_number
end
