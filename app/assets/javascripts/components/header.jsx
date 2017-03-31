/* globals React */

class FixedHeader extends React.Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 col-md-offset-3 text-center'><h1>Pulse</h1></div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
