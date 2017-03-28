class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :isAdmin, :boolean, default: false
    add_column :users, :isInstructor, :boolean, default: false
  end
end
