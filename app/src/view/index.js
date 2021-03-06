import React from 'react'
import { route } from '../controller'
import { Header, History, Monitor, Information, Tutorial, Map, Modal } from './container/'

const { hash } = route

export default class App extends React.Component {

  componentWillMount() {
    
    const { model } = this.props
    const { state, dispatch } = model
    const { session, config, log, dialog } = state
    const { support, navigator } = session
    const { routes } = config

    window.onhashchange = function(event) {
      dispatch.route({ hash: location.hash })
    }

    if (state.session.informed) hash.replace()
    else {
      hash.replace(routes.instructions)()
      localStorage.setItem('informed', true)
      dispatch.session({ informed: true })
    }

    // console.log(navigator)
    for (const key in navigator) {
      if (navigator[key]) document.body.classList.add(key)
    }

    const dispatchError = errorLog(dispatch, log.error)
    if (!support.webGL) dispatchError({
      content: dialog('map', 'error', 'webGL'), 
      route: hash.push(routes.information, 'help'),
    })

  }

  componentWillReceiveProps({ model }) {

    const { state, dispatch } = model
    const { sensor, location, log, config, dialog } = state
    const { routes } = config

    const dispatchError = errorLog(dispatch, log.error)
        
    if (sensor.error) {
      dispatch.sensor({ measurement: null, error: null })
      dispatchError({
        content: dialog('measurement', 'error', 'support'), 
        route: hash.push(routes.information, 'help'),
      })
    }

    if (location.error) {
      dispatch.location({ data: null, loading: false, error: null})
      dispatchError({
        content: dialog('location', 'error', 'unknown'), 
        route: hash.push(routes.information, 'help'),
      })
    }
    
  }

  render() {
    const { model } = this.props
    return <div>
      <Header {...model}/>
      <Monitor {...model}/>
      <Map {...model}/>
      <Modal {...model}/>
      <Tutorial {...model}/>
      <Information {...model}/>
      <History {...model}/>
    </div>
  }

}

function errorLog(dispatch, data) {
  return item => dispatch.log({ error: data.concat(item) })
} 