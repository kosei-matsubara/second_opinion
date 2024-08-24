class CurrentUserSerializer < ActiveModel::Serializer
  # サインイン取得項目およびプロフィールの更新項目を定義する
  attributes :id,
             :email,
             :user_division,
             :name,
             :sex,
             :generation,
             :family_structure,
             :prefectures,
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
