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
    client.publish('startstop', 'on', retain=false)
    # to get list of device in params
    # init trg_id variable with training id
    trg_id = args[0].last
    #cache variables
    @trainees = []
    @trainee_devices = []
    @participants  = Participant.where(training_id: trg_id)
    @participants.each do |participant|
      @trainee = Trainee.find(participant.trainee_id)
      @trainees.push(@trainee)
      @trainee_devices.push(@trainee.topic)
    end


    items = args[0].length - 1
    # puts "items: #{items}"
    items.times do |item|
      client.subscribe(args[0][item])
      # puts args[0][item]
    end
    client.subscribe('startstop')
      client.get do |topic,message|
        if (topic === 'startstop') && (message === trg_id.to_s) # compare with trg_id
          puts "client disconnect"
          client.disconnect()
        else
        # puts "#{topic}: #{message}"
        # push to Participant table
        @my_device = @trainee_devices.index(topic)
        @current_participant = @participants[@my_device]
        Participant.update(@current_participant.id, heart_rate: @current_participant.heart_rate.concat([message.to_i]))

        end
      end

  end


end
