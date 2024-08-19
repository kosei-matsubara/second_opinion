class CurrentUserSerializer < ActiveModel::Serializer
  # ユーザー取得項目を定義する
  attributes :id, :name, :email # 修正：年代や性別を追加するはず
end
