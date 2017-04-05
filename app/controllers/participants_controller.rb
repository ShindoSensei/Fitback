class ParticipantsController < ApplicationController

  def index
    @participants = Participant.all

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
