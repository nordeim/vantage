# app/models/user.rb
class User < ApplicationRecord
  # Devise modules
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # ═══════════════════════════════════════════════════════════════════════════
  # VALIDATIONS
  # ═══════════════════════════════════════════════════════════════════════════
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :name, length: { maximum: 255 }, allow_blank: true
  validates :company_name, length: { maximum: 255 }, allow_blank: true

  # ═══════════════════════════════════════════════════════════════════════════
  # INSTANCE METHODS
  # ═══════════════════════════════════════════════════════════════════════════
  
  # Display name for the UI
  def display_name
    name.presence || email.split('@').first
  end

  # Initials for avatar
  def initials
    if name.present?
      name.split.map(&:first).join.upcase[0, 2]
    else
      email[0, 2].upcase
    end
  end
end
