class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :user_division, :integer, comment: "ユーザー区分（10:保険契約者, 20:保険営業者）"
    add_column :users, :sex, :integer, comment: "性別（10:男性, 20:女性）"
    add_column :users, :generation, :integer, comment: "年代（10:10代, 20:20代, 30:30代, 40:40代, 50:50代, 60:60代以降）"
    add_column :users, :family_structure, :integer, comment: "家族構成（10:独身, 20:夫婦, 30:夫婦＋子供）"
    add_column :users, :prefectures, :string, comment: "都道府県"
    add_column :users, :belong, :string, comment: "所属"
    add_column :users, :address, :string, comment: "住所"
    add_column :users, :self_introduction, :text, comment: "自己紹介"
    add_column :users, :my_strength, :text, comment: "わたしの強み"
    add_column :users, :career, :text, comment: "経歴"
    add_column :users, :message, :text, comment: "相談者へのメッセージ"
    add_column :users, :access, :text, comment: "アクセス"
    add_column :users, :website, :string, comment: "ホームページ"
    add_column :users, :inquiry_opening_time, :string, comment: "問い合わせ_受付時間"
    add_column :users, :inquiry_telephone_number, :string, comment: "問い合わせ_電話番号"
  end
end
