class UserSerializer < ActiveModel::Serializer
  # プロフィールの表示項目を定義する
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
             :inquiry_telephone_number,
             :created_at

  def sex
    object.sex_i18n
  end

  def generation
    object.generation_i18n
  end

  def family_structure
    object.family_structure_i18n
  end
end
