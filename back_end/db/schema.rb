# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_08_19_115340) do
  create_table "articles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "categories", comment: "お悩みカテゴリ"
    t.string "title", comment: "タイトル"
    t.text "background", comment: "背景"
    t.text "content", comment: "内容"
    t.integer "status", comment: "ステータス（10:未保存, 20:下書き, 30:公開中）"
    t.bigint "user_id", null: false, comment: "ユーザーID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_division", comment: "ユーザー区分（10:保険契約者, 20:保険営業者）"
    t.integer "sex", comment: "性別（10:男性, 20:女性）"
    t.integer "generation", comment: "年代（10:10代, 20:20代, 30:30代, 40:40代, 50:50代, 60:60代以降）"
    t.integer "family_structure", comment: "家族構成（10:独身, 20:夫婦, 30:夫婦＋子供）"
    t.string "prefectures", comment: "都道府県"
    t.string "belong", comment: "所属"
    t.string "address", comment: "住所"
    t.text "self_introduction", comment: "自己紹介"
    t.text "my_strength", comment: "わたしの強み"
    t.text "career", comment: "経歴"
    t.text "message", comment: "相談者へのメッセージ"
    t.text "access", comment: "アクセス"
    t.string "website", comment: "ホームページ"
    t.string "inquiry_opening_time", comment: "問い合わせ_受付時間"
    t.string "inquiry_telephone_number", comment: "問い合わせ_電話番号"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "articles", "users"
end
