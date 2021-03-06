import store from '@/store';

const threeKnownMembers = (group) => {
  const { id, photo, name, connections } = store.getState();
  const { founders, members, isNew } = group;
  const connsWithMe = [...connections, {
    photo,
    name,
    id,
  }];
  let list = (isNew ? founders : members)
    .map((u) => connsWithMe.find((conn) => conn.id === u))
    .filter(u => u)
    .sort((u1, u2) => founders.includes(u1) ? -1 : 1)
    .slice(0, 3);

  return list;
};

export const groupCirclePhotos = (group) => {
  const { members } = group;

  const photos = threeKnownMembers(group).map((member) => {
    // If a founder isn't in members, that founder hasn't joined yet and
    // their photo will be faded.

    const faded = group.isNew && !members.includes(member.id);

    return { photo: member.photo, faded };
  });
  return photos;
};

export const getGroupName = (group) => {
  return (
    group.name ||
    threeKnownMembers(group)
      .map((member) => member.name.substr(0, 13))
      .join(', ')
  );
};

export const ids2connections = (ids) => {
  const { connections, name, id, photo, score } = store.getState();
  return ids.map((_id) => {
    if (_id === id) {
      return { id, name, photo, score };
    }
    const conn = connections.find((conn) => conn.id === _id);
    if (conn) {
      return conn;
    } else {
      return { id: _id, name: 'Stranger', score: 0 };
    }
  });
};
