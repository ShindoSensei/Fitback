require 'mqtt'

class FakerController < ApplicationController


  def fake

    FakeMqttJob.set(wait: 2.seconds).perform_later("device1", "device2")
    redirect_to root_path
  end

  def fakeOff
    clientOff = MQTT::Client.connect(
    host: 'm11.cloudmqtt.com',
    username: 'fjskjgyl',
    password: 'CLeGjyXtf09p',
    port: 21679,
    ssl: true
    )
    # to change 'off' to training id
    clientOff.publish('startstop', 'stop')
    clientOff.disconnect()
    redirect_to root_path

  end

end
