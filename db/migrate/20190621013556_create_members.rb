class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|

      t.timestamps
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
    end
  end
end
