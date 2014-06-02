module Api
  class ProjectsController < ApplicationController
    def index
      @projects = current_user.projects
      render json: @projects
    end
    
    def show
      @project = Project.find(params[:id])
      render json: @project
    end
    
    def create
      @project = Project.new(project_params)
      client = Client.find(params[:client_id])
      client.projects << @project
      @project.user = current_user
      
      if @project.save
        render json: @project, status: 200
      else
        render json: @project.errors.full_messages, status: 422
      end
    end
    
    def destroy
    end
    
    def update
      @project = Project.find(params[:id])

      if @project.update_attributes(project_params)
        render json: @project, status: 200
      else
        render json: @project.errors.full_messages, status: 422
      end
    end
    
    private
      def project_params
        params.require(:project).permit(:name, :description, :open, :client_id)
      end
  end
end