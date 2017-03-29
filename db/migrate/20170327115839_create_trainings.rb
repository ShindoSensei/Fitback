class CreateTrainings < ActiveRecord::Migration[5.0]
  def change
    create_table :trainings do |t|
      t.integer :duration
      t.integer :success
      t.float :avgcal
      t.date :training_date
      t.time :training_time
      t.string :location
      t.text :AAR
      t.belongs_to :activity, foreign_key: true
      t.references :instructor, index: true
      t.timestamps
    end
  end
end
