class ParticipantsController < ApplicationController

  def index
    puts "params[:trainingId] is #{params[:trainingId]}"
    #Return only participants who are currently selected
    @participants = Participant.where(:training_id => params[:trainingId])

    respond_to do |format|
      format.json  { render :json => @participants }
    end
  end

  def show
    @participant = Participant.find(params[:id])
    respond_to do |format|
      format.json  { render :json => @participant }
    end
  end

end
