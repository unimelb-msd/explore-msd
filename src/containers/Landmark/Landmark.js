import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
// import {} from 'components';

export default class Landmark extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
  }

  componentDidMount() {
    const headerTitle = 'Landmark';
    this.props.changeHeader(headerTitle);
  }
  render() {
    // const styles = require('./Landmark.scss');
    return (
      <div>
        <h1>Landmark</h1>
        <DocumentMeta title="Landmark"/>
        <p>This is a landmark</p>
      </div>
    );
  }
}
