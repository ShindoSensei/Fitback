class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :trainings, class_name: 'Training', foreign_key:'instructor_id'
  has_many :instructors, through: :trainings, source: :instructor
end
