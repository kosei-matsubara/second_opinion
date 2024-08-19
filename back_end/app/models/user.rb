# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  # ユーザー削除時（退会時）に保険相談は削除せず、引き続き他のユーザーが閲覧可能にする。
  # （「articles dependent: :destroy」を定義しない。）
  has_many :articles

  # 修正：性別やユーザー区分追加時に定義
  # enum :status, { unsaved: 10, draft: 20, published: 30 }, _prefix: true

  # 修正：ユーザー項目を保存時にバリデーションをするja.yml（日本語変換にも追加）
  # with_options if: :published? do
  #   validates :categories, presence: true
  #   validates :title, presence: true, length: { maximum: 50 }
  #   validates :background, presence: true, length: { maximum: 600 }
  #   validates :content, presence: true, length: { maximum: 100 }
  # end
end
