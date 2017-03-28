class CreateParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :participants do |t|
      t.integer :calories_burnt

      t.timestamps
    end
  end
end
