class Training < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  belongs_to :activity
  has_many :participants

end
