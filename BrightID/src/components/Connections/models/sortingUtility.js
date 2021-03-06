// @flow
import { setConnections, setConnectionsSort } from '../../../actions';

export const types = {
  byNameAscending: 'BY_NAME_ASCENDING',
  byNameDescending: 'BY_NAME_DESCENDING',
  byScoreAscending: 'BY_SCORE_ASCENDING',
  byScoreDescending: 'BY_SCORE_DECENDING',
  byDateAddedAscending: 'BY_DATE_ADDED_ASCENDING',
  byDateAddedDescending: 'BY_DATE_ADDED_DESCENDING',
};

const verifiedOrWaiting = (status: string) =>
  status === 'verified' || status === 'waiting';

export const sortByNameAscending = () => (
  dispatch: dispatch,
  getState: getState,
) => {
  const { connections } = getState();
  let list = connections.filter((c) => verifiedOrWaiting(c.status));
  list.sort((a, b) => b.name.localeCompare(a.name));
  dispatch(
    setConnections(
      list.concat(connections.filter((c) => !verifiedOrWaiting(c.status))),
    ),
  );
  dispatch(setConnectionsSort(types.byNameAscending));
};

export const sortByNameDescending = () => (
  dispatch: dispatch,
  getState: getState,
) => {
  const { connections } = getState();
  let list = connections.filter((c) => verifiedOrWaiting(c.status));
  list.sort((a, b) => a.name.localeCompare(b.name));
  dispatch(
    setConnections(
      list.concat(connections.filter((c) => !verifiedOrWaiting(c.status))),
    ),
  );
  dispatch(setConnectionsSort(types.byNameDescending));
};

export const sortByScoreAscending = () => (
  dispatch: dispatch,
  getState: getState,
) => {
  const { connections } = getState();
  let list = connections.filter((c) => verifiedOrWaiting(c.status));
  list.sort((a, b) => a.score - b.score);
  dispatch(
    setConnections(
      list.concat(connections.filter((c) => !verifiedOrWaiting(c.status))),
    ),
  );
  dispatch(setConnectionsSort(types.byScoreAscending));
};

export const sortByScoreDescending = () => (
  dispatch: dispatch,
  getState: getState,
) => {
  const { connections } = getState();
  let list = connections.filter((c) => verifiedOrWaiting(c.status));
  list.sort((a, b) => b.score - a.score);
  dispatch(
    setConnections(
      list.concat(connections.filter((c) => !verifiedOrWaiting(c.status))),
    ),
  );
  dispatch(setConnectionsSort(types.byScoreDescending));
};

export const sortByDateAddedAscending = () => (
  dispatch: dispatch,
  getState: getState,
) => {
  const { connections } = getState();
  let list = connections.filter((c) => verifiedOrWaiting(c.status));
  list.sort((a, b) => a.connectionDate - b.connectionDate);
  dispatch(
    setConnections(
      list.concat(connections.filter((c) => !verifiedOrWaiting(c.status))),
    ),
  );
  dispatch(setConnectionsSort(types.byDateAddedAscending));
};

export const sortByDateAddedDescending = () => (
  dispatch: dispatch,
  getState: getState,
) => {
  const { connections } = getState();
  let list = connections.filter((c) => verifiedOrWaiting(c.status));
  list.sort((a, b) => b.connectionDate - a.connectionDate);
  dispatch(
    setConnections(
      list.concat(connections.filter((c) => !verifiedOrWaiting(c.status))),
    ),
  );
  dispatch(setConnectionsSort(types.byDateAddedDescending));
};

export const defaultSort = () => (dispatch: dispatch, getState: getState) => {
  const { connectionsSort } = getState();
  switch (connectionsSort) {
    case types.byNameAscending:
      dispatch(sortByNameAscending());
      break;
    case types.byNameDescending:
      dispatch(sortByNameDescending());
      break;
    case types.byDateAddedAscending:
      dispatch(sortByDateAddedAscending());
      break;
    case types.byDateAddedDescending:
      dispatch(sortByDateAddedDescending());
      break;
    case types.byScoreAscending:
      dispatch(sortByScoreAscending());
      break;
    case types.byScoreDescending:
      dispatch(sortByScoreDescending());
      break;
    default:
      dispatch(sortByDateAddedDescending());
  }
};
