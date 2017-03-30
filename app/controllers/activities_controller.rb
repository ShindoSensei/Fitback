class ActivitiesController < ApplicationController

  def index
    @activities = Activity.all
    respond_to do |format|
      format.json  { render :json => @activities }
    end
  end

  def show
    @activity = Activity.find(params[:id])
    respond_to do |format|
      format.json  { render :json => @activity }
    end
  end

end
