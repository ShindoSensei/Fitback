# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170328023952) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer  "threshold"
    t.string   "activity_type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "participants", force: :cascade do |t|
    t.integer  "calories_burnt"
    t.integer  "heart_rate",     default: [],              array: true
    t.integer  "training_id"
    t.integer  "trainee_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["trainee_id"], name: "index_participants_on_trainee_id", using: :btree
    t.index ["training_id"], name: "index_participants_on_training_id", using: :btree
  end

  create_table "trainees", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "contact"
    t.integer  "age"
    t.decimal  "weight"
    t.decimal  "height"
    t.string   "gender"
    t.string   "topic"
    t.integer  "platoon_num"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "trainings", force: :cascade do |t|
    t.integer  "duration"
    t.integer  "success"
    t.float    "avgcal"
    t.date     "training_date"
    t.time     "training_time"
    t.string   "location"
    t.text     "AAR"
    t.integer  "activity_id"
    t.integer  "instructor_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["activity_id"], name: "index_trainings_on_activity_id", using: :btree
    t.index ["instructor_id"], name: "index_trainings_on_instructor_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "isAdmin",                default: false
    t.boolean  "isInstructor",           default: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "participants", "trainees"
  add_foreign_key "participants", "trainings"
  add_foreign_key "trainings", "activities"
end
