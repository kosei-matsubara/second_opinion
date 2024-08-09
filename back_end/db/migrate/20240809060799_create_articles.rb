class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :categories, comment: "お悩みカテゴリ"
      t.string :title, comment: "タイトル"
      t.text :background, comment: "背景"
      t.text :content, comment: "内容"
      t.integer :status, comment: "ステータス（10:未保存, 20:下書き, 30:公開中）"
      t.references :user, null: false, foreign_key: true, comment: "ユーザーID"

      t.timestamps
    end
  end
end
