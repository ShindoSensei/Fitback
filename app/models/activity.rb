class Activity < ApplicationRecord
  # belongs_to :gym
  has_many :gymsessions
end
