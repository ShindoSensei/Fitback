require 'mqtt'

class MqttController < ApplicationController

  before_action :get_training_id

  def start_training
    # query list of devices and training id

    MqttJob.set(wait: 2.seconds).perform_later("device1", "device2" ,12345.to_s)
    redirect_to root_path
  end

  def stop_training

    redirect_to root_path

    clientOff = MQTT::Client.connect(
    host: 'm11.cloudmqtt.com',
    username: 'fjskjgyl',
    password: 'CLeGjyXtf09p',
    port: 21679,
    ssl: true
    )
    # to change 'off' to training id
    clientOff.publish('startstop', 'stop', retain=false)
    clientOff.disconnect()

  end

  private

  def get_training_id
      @training = Training.find(params[:id])
  end



end
