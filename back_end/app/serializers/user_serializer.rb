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
             :inquiry_telephone_number,
             :created_at

  # ステータスを日本語変換する時に以下定義をする。定義不要なら削除する
  # def status
  #   object.status_i18n
  # end
end
