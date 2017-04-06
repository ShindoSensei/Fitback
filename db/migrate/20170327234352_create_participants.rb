class CreateParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :participants do |t|
      t.integer :calories_burnt
      t.integer :heart_rate, array: true, default: [0]
      t.belongs_to  :training, foreign_key: true
      t.belongs_to  :trainee, foreign_key: true

      t.timestamps
    end
  end
end
