import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { landmarkIsLoaded, loadLandmark } from 'redux/modules/landmarks';
import { Error, Loader, SnippetList } from 'components';

@connect(
  state => ({
    landmarks: state.landmarks,
  }),
  {...landmarkActions})

export default
class Landmark extends Component {
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
    const state = getState();
    const landmarkId = state.router.params.slug;
    if (!landmarkIsLoaded(state, landmarkId)) {
      return dispatch(loadLandmark(landmarkId));
    }
  }

  render() {
    // const styles = require('./Landmark.scss');
    const landmarkId = this.props.params.slug;
    const landmark = this.props.landmarks[landmarkId];
    const loading = !landmark || landmark.loading;
    const error = !landmark || landmark.error;
    if (loading) return (<Loader />);
    if (error) return (<Error error={error} />);
    const { location } = this.props;
    const { title, description, snippets } = landmark.payload;
    return (
      <div>
        <DocumentMeta title="Landmark"/>
        <h1>{title}</h1>
        <p>{description}</p>
        <SnippetList items={snippets} location={location} />
      </div>
    );
  }
}
