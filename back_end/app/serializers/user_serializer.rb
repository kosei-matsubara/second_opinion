class UserSerializer < ActiveModel::Serializer
  # プロフィールの表示項目を定義する
  attributes :user_division,
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

  # ステータスを日本語変換する
  # def status
  #   object.status_i18n
  # end
end
