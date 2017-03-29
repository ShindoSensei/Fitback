require 'mqtt'
class WearablesController < ApplicationController
  before_action :set_wearable, only: [:show, :edit, :update, :destroy]

  # GET /wearables
  # GET /wearables.json
  def index
    @wearable = Wearable.all
  end

  # GET /wearables/1.json
  def show
    #Determine topic of this wearable id at wearables/:id,e.g. device 1
    #Get data from MQTT server
    doMQTT
  end

  def doMQTT
    @wearable = Wearable.find(2)
    MQTT::Client.connect(
      host: 'm11.cloudmqtt.com',
      username: 'fjskjgyl',
      password: 'CLeGjyXtf09p',
      port: 21679,
      ssl: true
    ) do |client|
        client.get('device1') do |topic,message|
          puts "@wearable is #{@wearable.heart_rate}"
          @wearable.heart_rate.push(message.to_i)
          @wearable.save
          puts "#{topic}: #{message}"
        end
        # client.disconnect
      end
  end

  # GET /wearables/new
  def new
    @wearable = Wearable.new
  end

  # GET /wearables/1/edit
  def edit
  end

  # POST /wearables
  # POST /wearables.json
  def create
    @wearable = Wearables.new(wearable_params)

    respond_to do |format|
      if @wearable.save
        format.json { render :show, status: :created, location: @wearable }
      else
        format.json { render json: @wearable.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wearables/1
  # PATCH/PUT /wearables/1.json
  def update
    respond_to do |format|
      if @wearable.update(model_params)
        format.json { render :show, status: :ok, location: @wearable }
      else
        format.json { render json: @wearable.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wearables/1
  # DELETE /wearables/1.json
  def destroy
    @wearable.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wearable
      @wearable = Wearable.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wearable_params
      params.require(:wearable).permit(:Wearable, :topic, :heart_rate)
    end
end
