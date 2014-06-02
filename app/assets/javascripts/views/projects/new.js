/*global Freelancer, JST, Backbone, $, console */
Freelancer.Views.NewProject = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },
  
  events: {
    'submit form': 'newProject'
  },
  
  template: JST['projects/_form'],
  
  render: function() {
    var renderedContent = this.template({
      project: new Freelancer.Models.Project(),
      clients: this.collection,
      client: false
    });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  newProject: function(event) {
    event.preventDefault();
    var view = this;
    this.$el.find('button').attr('disabled', 'disabled');
    
    var params = $(event.target).serializeJSON();
    var project = new Freelancer.Models.Project(params.project);
    project.save({}, {
      wait: true,
      success: function(model, response) {
        Freelancer.Collections.projects.add(project);
        Backbone.history.navigate('#/projects/' + project.id, { trigger: true });
      },
      error: function(model, response) {
        view.$el.find('#errors').html(response.responseJSON);
        view.$el.find('button').removeAttr('disabled');
      }
    });
    
  }
});