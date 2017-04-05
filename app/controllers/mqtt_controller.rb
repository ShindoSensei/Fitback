require 'mqtt'

class MqttController < ApplicationController

  before_action :get_training_id

  def start_training
    # query list of devices and training id
    arr = []
    @participants  = Participant.where(training_id: @training.id)
    @participants.each do |participant|
      @trainee = Trainee.find(participant.trainee_id)
      arr.push(@trainee.topic)
    end

    arr.push(@training.id.to_s)
    MqttJob.set(wait: 2.seconds).perform_later(arr)

    respond_to do |format|
      format.json  { render :json => {:training => @training}}
    end

  end

  def stop_training
    clientOff = MQTT::Client.connect(
    host: 'm11.cloudmqtt.com',
    username: 'fjskjgyl',
    password: 'CLeGjyXtf09p',
    port: 21679,
    ssl: true
    )
    # send training id as stop identifier
    clientOff.publish('startstop', @training.id.to_s , retain=false)
    clientOff.disconnect()

  end

  private

  def get_training_id
      @training = Training.find(params[:id])
  end
end
