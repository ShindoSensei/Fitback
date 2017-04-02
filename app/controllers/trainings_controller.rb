class TrainingsController < ApplicationController
  before_action :set_training, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  def index
    @training_all = Training.all
    @activities_all = Activity.all
    respond_to do |format|
      format.json  { render :json => @training_all }
      format.html {render :index}
    end
  end

  def show
    respond_to do |format|
      format.json  { render :json => @training }
    end
  end

  def create
    #Creating new training session
    @training_new = Training.new(training_params)
    @training_new.instructor_id = current_user.id
    @training_new.save

    # #Creating participants for this new training session
    # #Finding all trainees from chosen platoon in form
    @trainees = Trainee.where(:platoon_num => params[:training][:platoon_num])

    # #Creating participants for training
    @trainees.each do |trainee|
      Participant.create(trainee_id: trainee.id, training_id: @training_new.id)
    end
  end

  def after_action_review
    # Find training id of current session
    # Populate after_action_review of found @training with text input
  end

  def edit

  end

  def update
    #Find all participants of this training and .destroy

    @training.destroy
    create
    # @training.update(training_params)
    #Check if same platoon as previous. If same platoon no change.
    # @training.participants
    #If platoon changed, remove participants of this training who were from old platoon.

    #Find all trainees of new platoon and create replacement participants for this training

    # @trainees = Trainee.where(:platoon_num => params[:training][:platoon_num])
    #
    # # #Creating replacement participants for training
    # @trainees.each do |trainee|
    #   Participant.create(trainee_id: trainee.id, training_id: @training_new.id)
    # end
  end

  def destroy
    @training.destroy
  end

  private

  def set_training
    @training = Training.find(params[:id])
  end

  def training_params
    params.require(:training).permit(:activity_id, :training_date, :training_time, :location, :duration)
  end
end
