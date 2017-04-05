/* globals React $*/

class FixedFooter extends React.Component {

  submitupcomingScreen (event) {
    event.preventDefault()
    this.props.setRenderScreen('upcoming')
  }
  submithistoryScreen (event) {
    event.preventDefault()
    this.props.setRenderScreen('history')
  }
  submitcurrentScreen (event) {
    event.preventDefault()
    this.props.setRenderScreen('current')
  }
  submituserScreen (event) {
    event.preventDefault()
    $.ajax({
      url: '/user_edit',
      method: 'GET',
      success: function (json) {
        this.props.setRenderScreen('user', json)
      }.bind(this)
    })
  }
  render () {
    return (
      <footer>
        <nav className='navbar navbar-default navbar-fixed-bottom'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-3 text-left'>
                <a onClick={this.submitupcomingScreen.bind(this)} className={'button-clear text-white ' + this.props.footerBtnsDisabled}>
                  <i className='fa fa-home fa-4x' aria-hidden='true' />
                </a>
              </div>
              <div className='col-xs-2 text-left'>
                <a onClick={this.submithistoryScreen.bind(this)} className={'button-clear text-white ' + this.props.footerBtnsDisabled}>
                  <i className='fa fa-history fa-4x' aria-hidden='true' />
                </a>
              </div>
              <div className='col-xs-2 text-center'>
                <a onClick={this.submitcurrentScreen.bind(this)} className={'button-clear text-white ' + this.props.footerBtnsDisabled}>
                  <i className='fa fa-heartbeat fa-4x' aria-hidden='true' />
                </a>
              </div>
              <div className='col-xs-2 text-right'>
                <a onClick={this.submituserScreen.bind(this)} className={'button-clear text-white ' + this.props.footerBtnsDisabled}>
                  <i className='fa fa-user fa-4x' aria-hidden='true' />
                </a>
              </div>
              <div className='col-xs-3 text-right'>
                <a rel='nofollow' data-method='delete' href='/users/sign_out' className={'button-clear text-white ' + this.props.footerBtnsDisabled}><i className={'fa fa-sign-out fa-4x text-white ' + this.props.footerBtnsDisabled} aria-hidden='true' /></a>
              </div>
            </div>
          </div>
        </nav>
      </footer>
    )
  }
}
FixedFooter.propTypes = {
  setRenderScreen: React.PropTypes.func
}
