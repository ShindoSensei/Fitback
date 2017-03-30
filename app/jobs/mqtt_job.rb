require 'mqtt'

class MqttJob < ApplicationJob
  queue_as :default

  def perform(*args)

    client = MQTT::Client.connect(
    host: 'm11.cloudmqtt.com',
    username: 'fjskjgyl',
    password: 'CLeGjyXtf09p',
    port: 21679,
    ssl: true
    )
    # client.publish('startstop', 'on', retain=false)
    # to get list of device in params
    # init trg_id variable with training id
    trg_id = args.last
    items = args.length - 1
    items.times do |item|
      client.subscribe(args[item])
      puts args[item]
      # client.subscribe( 'device1', 'device2', 'startstop')
    end
    client.subscribe('startstop')
      client.get do |topic,message|
        if (topic === 'startstop') && (message === trg_id) # compare with trg_id
          puts "client disconnect"

          client.disconnect()
        else
        puts "#{topic}: #{message}"
        end
      end

  end

end
