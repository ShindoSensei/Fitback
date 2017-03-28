class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.integer :threshold
      t.string :activity_type
      t.timestamps
    end
  end
end
