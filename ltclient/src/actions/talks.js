import { when, commonFetch } from '../utils';


let url = 'http://localhost:3000/api/Talks?filter[order]=voteCount%20DESC&filter[include]=submitter';

function requestTalkList() {
  return {
    type: 'REQUEST_TALKLIST',
  };
}

function receiveTalkList(json) {
  // preprocessing
  let talks = json.map(item => {
    return {
      title: item.title,
      speaker: item.speaker,
      cover: item.cover,
      description: item.description,
      submitter: item.submitter.username,
      createdAt: when(item.createdAt),
      upvote: item.voteCount,
    };
  });

  return {
    type: 'RECEIVE_TALKLIST',
    talks,
  };
}

function failTalkList() {
  return {
    type: 'FAIL_TALKLIST',
  };
}

function fetchTalks() {
  return dispatch => {
    dispatch(requestTalkList());
    return commonFetch(url)
      .then(res => res.json())
      .then(json => dispatch(receiveTalkList(json)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failTalkList());
      });
  };
}

export { fetchTalks };