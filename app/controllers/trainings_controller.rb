class TrainingsController < ApplicationController
  before_action :set_training, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

  def index
    @training_all = Training.where("training_date >= ? and status='new' and instructor_id = ?" , Date.today, current_user.id).order('training_date ASC')
    @activities_all = Activity.all
    @training_hist = Training.select("trainings.*,activities.activity_type").joins(:activity).where("training_date < ? and status='completed' and instructor_id=?", Date.today, current_user.id).order(training_date: :desc)
    @trainees_all = Trainee.all
    @participants_all = Participant.all
    respond_to do |format|
      format.json  { render :json => {:training_all => @training_all,
                                  :activities_all => @activities_all,
                                  :training_hist => @training_hist }}
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
    #Pick out just one trainee id from list of participants
    @one_trainee_id = @training.participants[0].trainee_id
    #Find this trainee and extract out the platoon_num
    @platoon_num = (Trainee.find(@one_trainee_id)).platoon_num

    respond_to do |format|
      format.json  { render :json => {
        :training => @training,
        :platoon_num => @platoon_num
        }
      }
    end
  end

  def update
    #Check if platoon number is same as in database
    if @training.platoon_num == params[:training][:platoon_num]
    #If same as database , just update params
      @training.update(training_params)
    else
      #If platoon num different, find all old participants and destroy them
      @participants = Participant.where(:training_id => params[:training][:trainingId])
      @participants.each do |participant|
        participant.destroy
      end
      #Then update training_params
      @training.update(training_params)
      @trainees = Trainee.where(:platoon_num => params[:training][:platoon_num])
      #Then create new participants
      @trainees.each do |trainee|
        Participant.create(trainee_id: trainee.id, training_id: @training.id)
      end
    end
  end

  def destroy
    @training.destroy
    #Do something here
  end

  private

  def set_training
    @training = Training.find(params[:id])
  end

  def training_params
    params.require(:training).permit(:activity_id, :training_date, :training_time, :location, :duration, :platoon_num)
  end
end
