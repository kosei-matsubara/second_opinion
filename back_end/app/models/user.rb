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

  enum :user_division, {
    policyholder: 10,
    insurance_agent: 20
  }, _prefix: true

  enum :sex, {
    male: 10,
    female: 20
  }, _prefix: true

  enum :generation, {
    teens: 10,
    twenties: 20,
    thirties: 30,
    forties: 40,
    fifties: 50,
    sixties_and_above: 60
  }, _prefix: true

  enum :family_structure, {
    single: 10,
    couple: 20,
    couple_with_children: 30
  }, _prefix: true

  # ユーザー区分が保険営業者の場合のみバリデーションをする
  with_options if: :user_division_insurance_agent? do
    validates :name, presence: true
    validates :belong, presence: true
    validates :address, presence: true
    # 任意項目で文字入力した場合の入力文字数を制限する
    validates :self_introduction, length: { maximum: 600 }
    validates :my_strength, length: { maximum: 600 }
    validates :career, length: { maximum: 400 }
    validates :message, length: { maximum: 400 }
    validates :access, length: { maximum: 400 }
    validates :website, length: { maximum: 80 }
  end

  # ユーザー区分が保険営業者の場合にtrueを返す
  def user_division_insurance_agent?
    user_division == 'insurance_agent'
  end
end
