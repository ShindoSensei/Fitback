class Training < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  belongs_to :activity
  belongs_to :location
  has_many :participants

end
