class UsersController < ApplicationController
before_action :set_user, only: [:edit, :update]
before_action :authenticate_user!, only: [:edit, :update]

def edit
  @user =  User.find(current_user.id)
  puts @user.password
  puts @user.encrypted_password
  respond_to do |format|
    format.json  { render :json => {
      :user => @user
      }
    }
  end
end


 def update
   update_params = user_params
   puts update_params.inspect
   if update_params[:password].blank?
     update_params.delete :password
     puts update_params.inspect
   end

   if @user.update!(update_params)
     respond_to do |format|
       format.json  { render :json => {
         :update => 'success'
         }
       }
     end
   else
     respond_to do |format|
       format.json  { render :json => {
         :update => 'failure'
         }
       }
     end
   end
 end

private

  def set_user
    @user = User.find(current_user.id)
  end

  def user_params
    params.require(:user).permit(:email,:password,:first_name,:last_name)
  end
end
