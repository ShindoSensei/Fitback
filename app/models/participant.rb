class Participant < ApplicationRecord
  belongs_to :trainee
  belongs_to :training
end
