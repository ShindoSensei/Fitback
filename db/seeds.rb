# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Trainee.create([
  {first_name: 'Johnny', last_name: 'Cage', contact: '89765432', age: 23, weight: 70.5, height: 180, gender:'MALE', topic:'device1', platoon_num: 1, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Justin', last_name: 'Long', contact: '89764432', age: 21, weight: 60.5, height: 175, gender:'MALE', topic:'device2', platoon_num: 1, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Julian', last_name: 'Lee', contact: '89764232', age: 20, weight: 70.5, height: 178, gender:'MALE', topic:'device3', platoon_num: 1, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Dooly', last_name: 'Lee', contact: '89764235', age: 20, weight: 80.5, height: 174, gender:'MALE', topic:'device4', platoon_num: 1, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Rock', last_name: 'Lee', contact: '89764135', age: 22, weight: 70.5, height: 150, gender:'MALE', topic:'device5', platoon_num: 1, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Brandon', last_name: 'Yong', contact: '89734135', age: 18, weight: 70.5, height: 185, gender:'MALE', topic:'device6', platoon_num: 2, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Loki', last_name: 'Wong', contact: '88734135', age: 19, weight: 65.5, height: 170, gender:'MALE', topic:'device7', platoon_num: 2, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Sam', last_name: 'Long', contact: '80734135', age: 22, weight: 80.5, height: 190, gender:'MALE', topic:'device8', platoon_num: 2, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Greg', last_name: 'Pink', contact: '88034135', age: 19, weight: 90.5, height: 180, gender:'MALE', topic:'device9', platoon_num: 2, created_at: Date.today, updated_at: Date.today},
  {first_name: 'Rayson', last_name: 'Tan', contact: '88034235', age: 19, weight: 50.5, height: 160, gender:'MALE', topic:'device10', platoon_num: 2, created_at: Date.today, updated_at: Date.today}])

Activity.create([
  {activity_type: 'Road March', threshold: 80, created_at: Date.today, updated_at: Date.today},
  {activity_type: 'Rifle Shooting Practice', threshold: 85, created_at: Date.today, updated_at: Date.today},
  {activity_type: 'Night Training', threshold: 85, created_at: Date.today, updated_at: Date.today},
  {activity_type: 'NDP Practice', threshold: 80, created_at: Date.today, updated_at: Date.today},
  {activity_type: 'Jungle Confidence', threshold: 85, created_at: Date.today, updated_at: Date.today},
  {activity_type: 'SOC', threshold: 80, created_at: Date.today, updated_at: Date.today},
  ])
