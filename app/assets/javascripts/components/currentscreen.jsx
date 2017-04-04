/* globals React */

class CurrentSession extends React.Component {

  startTraining(event){
    event.preventDefault()
  }

  stopTraining(event){
    event.preventDefault()
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 col-sm-offset-2'>
            <h1>Current Session</h1>
            <h3>Activity: {currentSession.activity_type}</h3>
            <h3>Threshold: {currentSession.threshold}</h3>
            <div className='col-sm-12'>
              {}
            </div>
            <div className='col-sm-6 text-center'>
              <a className='' href='#' onClick={this.startTraining.bind(this)}><h1 className=''><i className='fa play-circle-o' /></h1></a>
            </div>
            <div className='col-sm-6 text-center'>
              <a className='' href='#' onClick={this.stopTraining.bind(this)}><h1 className=''><i className='fa stop-circle-o' /></h1></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
