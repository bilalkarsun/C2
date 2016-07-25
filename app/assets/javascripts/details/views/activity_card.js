var ActivityCardController;

ActivityCardController = (function(){

  function ActivityCardController(el, opts){
    $.extend(this, new ViewHelper());
    this.defaultSetup(el,opts);
    return this;
  }

  ActivityCardController.prototype._setConstants = function(el,opts){
    var self = this;
    this.el = typeof el === "string" ? $(el) : el;
    this.proposalId = $("#proposal_id").attr("data-proposal-id");
    this.updateUrl = "/activity-feed/" + this.proposalId + "/update_feed";
    this.updateEvent = "activity-card:update";
    this.updateCallback = this.setCommentForm;
    this.laddaButton = $(self.buttonSelector).ladda();
    this.submitUrl = "/proposals/" + self.proposalId + "/comments";
    this.buttonSelector = "#add_a_comment";
    this.contentSelector = "#comment_text_content";
  }

  ActivityCardController.prototype._events = function(){
    var self = this;
    this.initButton();
    this._setupUpdateEvent();
    this._setupCommentListToggle();
  }

  ActivityCardController.prototype._setupCommentListToggle = function(){
    var self = this;

    this.el.on('click','.status-contract-action, .status-expand-action', function(){
      var classes = ".status-contracted, .status-contract-action, .status-expand-action";
      self.el.find(classes).toggle();
      return false;
    });
  }

  ActivityCardController.prototype.setCommentForm = function(opts){
    var self = this;
    opts = opts || {focus: false};
    if (opts.focus){
      this.el.find(self.contentselector).focus();
    }
    this.el.find(self.buttonSelector).attr('disabled', true);
    this.el.find(self.contentselector).on('input',function(){
      this.el.find(self.buttonSelector).attr('disabled', false);
    });
    self.laddaButton.ladda( 'stop' );
  }


  return ActivityCardController;

}());
window.ActivityCardController = ActivityCardController;
