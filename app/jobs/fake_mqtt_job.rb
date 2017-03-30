require 'mqtt'

class FakeMqttJob < ApplicationJob

  queue_as :default

  def perform(*args)

        client = MQTT::Client.connect(
        host: 'm11.cloudmqtt.com',
        username: 'fjskjgyl',
        password: 'CLeGjyXtf09p',
        port: 21679,
        ssl: true
        )
        client.publish('startstop', 'start')

        items = args.length
        items.times do |item|
          client.subscribe(args[item])
          puts args[item]
        end
        client.subscribe('startstop')

        client.get do |topic,message|
          if (topic == 'startstop') && (message == 'stop')
            client.disconnect()
            puts "client disconnect"
          else
            puts "#{topic}: #{message}"
          end
        end

end




end
