var ListViewDataTable;

ListViewDataTable = (function(){
  function ListViewDataTable(el) {
    this.el = $(el);
    this._setup();
    return this;
  }

  ListViewDataTable.prototype._setup = function(){
    if( this.el.length > 0 ){
      this.dataTable = this.el.DataTable( {
          // destroy: true,
          dom: 'Bfrtip',
          buttons: [
              {
                  extend: 'colvis',
                  columns: ':not(:first-child)'
              }
          ],
          "paging":   false,
          "info":     false,
          stateSave: true,
          responsive: true
      } );
      this.statusColumn = this.dataTable.column(':contains(Status)');
      this._events();
      this.prepList();
    }
  }

  ListViewDataTable.prototype._events = function(){
    var self = this;
    this.el.on('dataTableView:canceled', function(){
      self.viewCanceled();
    });
    this.el.on('dataTableView:pending', function(){
      self.viewPending();
    });
    this.el.on('dataTableView:completed', function(){
      self.viewCompleted();
    });
    this.el.on('dataTableView:all', function(){
      self.viewAll();
    });
  }

  ListViewDataTable.prototype.viewPending = function(){
    this.statusColumn.search('Waiting for review from').draw();
  }

  ListViewDataTable.prototype.viewCanceled = function(){
    this.statusColumn.search('Canceled').draw();
  }

  ListViewDataTable.prototype.viewAll = function(){
    this.statusColumn.search('').draw();
  }

  ListViewDataTable.prototype.viewCompleted = function(){
    this.statusColumn.search('Completed').draw();
  }

  ListViewDataTable.prototype.hideExtraCols = function(){
    for(i = 0; i < this.dataTable.columns()[0].length; i++){
      var colCount = this.dataTable.column(i);
      if(i > 5){
        colCount.visible(false);
      }
    }
  }
  ListViewDataTable.prototype.prepList = function(){
    if (typeof(Storage) !== "undefined") {
      if ( localStorage.getItem('savedColState') !== undefined && localStorage.savedColState == "setup" ){
      } else {
        this.hideExtraCols();
        localStorage.setItem('savedColState', 'setup');
      }
    } else {
      this.hideExtraCols();
    }
  }

  return ListViewDataTable;

}());

window.ListViewDataTable = ListViewDataTable;
