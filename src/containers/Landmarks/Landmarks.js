import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { landmarksAreLoaded, loadLandmarks } from 'redux/modules/landmarks';
import { Error, Loader, LandmarkList } from 'components';

@connect(
  state => ({
    landmarks: state.landmarks.ALL,
  }),
  {...landmarkActions})

export default
class Landmarks extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    landmarks: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
  }

  componentDidMount() {
    const headerTitle = 'Landmark';
    this.props.changeHeader(headerTitle);
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!landmarksAreLoaded(getState())) {
      return dispatch(loadLandmarks());
    }
  }

  render() {
    const styles = require('./Landmarks.scss');
    const { landmarks } = this.props;
    const loading = !landmarks || landmarks.loading;
    const error = !landmarks || landmarks.error;
    if (loading) return (<Loader />);
    if (error) return (<Error error={error} />);
    const landmarkItems = landmarks.payload;
    return (
      <div className={styles.landmarks}>
        <DocumentMeta title="Landmark"/>
        <h1>All landmarks</h1>
        <LandmarkList items={landmarkItems} />
      </div>
    );
  }
}
