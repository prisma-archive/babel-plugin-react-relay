import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import RelayLocalSchema from 'relay-local-schema'
import schema from '../schema'

Relay.injectNetworkLayer(
  new RelayLocalSchema.NetworkLayer({ schema })
)

class HelloApp extends React.Component {
  render() {
    return <h1>{this.props.greetings.hello}</h1>
  }
}

HelloApp = Relay.createContainer(HelloApp, {
  fragments: {
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello
      }
    `
  }
})

class HelloRoute extends Relay.Route {
  static routeName = 'Hello'
  static queries = {
    greetings: (Component) => Relay.QL`
      query GreetingsQuery {
        greetings {
          ${Component.getFragment('greetings')}
        }
      }
    `
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={HelloApp}
    route={new HelloRoute()}
  />,
  document.body
)
