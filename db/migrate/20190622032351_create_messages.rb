class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|

      t.timestamps
      t.string :image
      t.string :body
      t.references :user, foreign_key: true
      t.references  :group, foreign_key: true
    end
  end
end
