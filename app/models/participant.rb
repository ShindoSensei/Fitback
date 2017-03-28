class Participant < ApplicationRecord
  belongs_to :user
  belongs_to :wearable
  belongs_to :gymsession
end
