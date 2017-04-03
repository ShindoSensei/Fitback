/* globals React */

class History extends React.Component {
  render () {
    let trainingHistory = this.props.trainingHist.map(function (train, index) {
      let mytime = new Date(train.training_time)

      return (
        <div key={index} className="col-md-12 col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 className="panel-title">Activity: {train.activity_type}</h1>
            </div>
            <div className="panel-body">
              <div className="col-md-6">
                <p>Date: {train.training_date}</p>
                <p>Time: {("0" + (mytime.getUTCHours())).slice(-2)   + ":" +
                  ("0" + mytime.getMinutes()).slice(-2)}</p>
                <p>AAR: {train.AAR}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }.bind(this))

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>Training History</h2>
          </div>
          <div className="col-sm-4">
            <a className="" href="#"><h1 className="pull-right"><i className="fa fa-plus-square-o"></i></h1></a>
          </div>
        </div>
          <div className="row">
            {trainingHistory}
        </div>
      </div>
    )
  }
}
