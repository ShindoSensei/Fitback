/* globals React */

class FixedHeader extends React.Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 col-md-offset-3 text-center logo'>
                <a href="/" title="Pulse">
                  <img src="/assets/pulse.png" width="200" height="70" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
