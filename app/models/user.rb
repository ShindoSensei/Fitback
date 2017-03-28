class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :participants
  has_many :trainingsessions, class_name: 'TrainingSession', foreign_key:'instructor_id'
  has_many :instructors, through: :trainingsessions, source: :instructor
end
