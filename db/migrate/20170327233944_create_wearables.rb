class CreateWearables < ActiveRecord::Migration[5.0]
  def change
    create_table :wearables do |t|
      t.string :topic
      t.integer :heart_rate, array: true, default: []

      t.timestamps
    end
  end
end
