class CreateTrainees < ActiveRecord::Migration[5.0]
  def change
    create_table :trainees do |t|
      t.string :first_name
      t.string :last_name
      t.string :contact
      t.integer :age
      t.decimal :weight
      t.decimal :height
      t.string :gender
      t.string :topic
      t.integer :platoon_num

      t.timestamps
    end
  end
end
