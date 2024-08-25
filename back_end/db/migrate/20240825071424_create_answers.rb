class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.text :content, comment: "内容"
      t.bigint :article_id, null: false, comment: "保険相談ID"
      t.bigint :user_id, null: false, comment: "ユーザーID"

      t.timestamps
    end

    # 外部キー制約を追加
    add_foreign_key :answers, :articles, column: "article_id"
    add_foreign_key :answers, :users, column: "user_id"

    # インデックスを追加
    add_index :answers, :article_id
    add_index :answers, :user_id
  end
end
