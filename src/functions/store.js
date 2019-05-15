import createStore from "unistore";
import _ from "lodash";

const store = createStore({
  zip: false
});

const isJSON = name =>
  name.substring(name.lastIndexOf(".") + 1, name.length) === "json";

const actions = store => ({
  dropData(state, zip) {
    return {
      zip,
      reactions: undefined,
      messages: undefined,
      friends: undefined
    };
  },
  extractFriends(state) {
    console.log("Processing Friends");
    try {
      state.zip
        .file("friends/friends.json")
        .async("text")
        .then(json => {
          store.setState({ friends: JSON.parse(json).friends });
        });
    } catch (e) {
      store.setState({ friends: false });
      console.log(e);
    }
  },
  extractMessages(state) {
    console.log("Processing Messages");
    try {
      const messages = [];
      state.zip.folder("messages/inbox").forEach((relativePath, file) => {
        if (!file.dir && isJSON(file.name)) {
          messages.push(
            file.async("text").then(result => {
              return JSON.parse(result).messages;
            })
          );
        }
      });

      Promise.all(messages).then(results => {
        if (results.length) {
          store.setState({ messages: _.flatten(results) });
        } else {
          store.setState({ messages: false });
        }
      });
    } catch (e) {
      store.setState({ messages: false });
      console.log(e);
    }
  },
  extractWords(state) {
    const messages = [];
    try {
      state.zip.folder("messages/inbox").forEach((relativePath, file) => {
        if (!file.dir && isJSON(file.name)) {
          messages.push(
            file.async("text").then(result => JSON.parse(result).messages)
          );
        }
      });
      Promise.all(messages).then(results => {
        store.setState({ words: _.flatten(results) });
      });
    } catch (e) {
      console.log(e);
    }
  },
  extractReactions(state) {
    console.log("Processing Reactions");
    try {
      state.zip
        .file("likes_and_reactions/posts_and_comments.json")
        .async("text")
        .then(json => {
          store.setState({ reactions: JSON.parse(json).reactions });
        });
    } catch (e) {
      store.setState({ reactions: false });
      console.log(e);
    }
  }
});

export { actions, store };
