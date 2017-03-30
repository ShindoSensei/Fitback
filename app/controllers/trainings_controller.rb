class TrainingsController < ApplicationController
  before_action :set_training, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  def index
    @training_all = Training.all
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
    @training_new = Training.new(training_params)
    @activity = Activity.find_by(activity_type: params[:training][:activity_type])
    @training_new.activity_id = @activity.id
    @training_new.instructor_id = current_user.id
    @training_new.save

    #Creating participants for this new training session

    #Finding all trainees from chosen platoon in form
    @trainees = Trainee.find(:all, :conditions =>{ :platoon_num => params[:training][:platoon_num]})

    #Creating participants for training
    @trainees.each do |trainee|
      Participant.create(trainee_id: trainee.id, training_id: @training_new.id)
    end

  end

  def after_action_review
    # Find training id of current session
    # Populate after_action_review of found @training with text input
  end

  def update
    @training.update(training_params)
  end

  def destroy
    @training.destroy
  end

  private

  def set_training
    @training = Training.find(params[:id])
  end

  def training_params
    params.require(:training).permit(:activity_type, :date, :time, :location, :platoon_num)
  end
end
