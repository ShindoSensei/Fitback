class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.integer :maxsize
      t.integer :intensity
      t.string :type
      # t.belongs_to :gym, foreign_key: true 
      t.timestamps
    end
  end
end
