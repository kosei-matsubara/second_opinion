class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string "user_division", comment: "ユーザー区分"
      t.string "sex", comment: "性別"
      t.string "generation", comment: "年代"
      t.string "family_structure", comment: "家族構成"
      t.string "prefectures", comment: "都道府県"
      t.string "name", comment: "名前"
      t.string "belong", comment: "所属"
      t.string "address", comment: "住所"
      t.string "self_introductio", comment: "自己紹介"
      t.string "my_strength", comment: "わたしの強み"
      t.string "career", comment: "経歴"
      t.string "message", comment: "相談者へのメッセージ"
      t.string "access", comment: "アクセス"
      t.string "website", comment: "ホームページ"
      t.string "inquiry_opening_time", comment: "問い合わせ_受付時間"
      t.string "inquiry_telephone_number", comment: "問い合わせ_受付時間"
    end

    add_index :users, :user_division
    add_index :users, :sex
    add_index :users, :prefectures
    add_index :users, :name
    add_index :users, :website

  end
end
