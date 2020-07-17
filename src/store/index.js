import Vuex from 'vuex';
import axios from 'axios';

const cancelToken = axios.CancelToken;
let cancelSource = cancelToken.source();

export default Vuex.createStore({
  state: {
    tvShows: [],
    error: null,
    searchString: ''
  },
  mutations: {
    updateState: (state, payload) => {
      state[payload.key] =  payload.value;
    },
  },
  actions: {
    async loadTvShows({commit}) {
      commit('updateState', {key: 'error', value: 'Loading...'});
      axios.get(`/shows`)
        .then((res) => {
          const { data } = res;
          commit('updateState', {key: 'tvShows', value: data});
          commit('updateState', {key: 'error', value: null});
        });
    },

    async updateTvShows({commit}, payload) {
      commit('updateState', {key: 'error', value: 'Loading...'});
      cancelSource.cancel();
      cancelSource = cancelToken.source();

      axios.get(`/search/shows?q=${payload}`, { cancelToken: cancelSource.token })
        .then((res) => {
          let { data } = res;
          data = data.map(d => d.show)
          commit('updateState', {key: 'tvShows', value: data});
          commit('updateState', {key: 'searchString', value: payload});
          if(data.length === 0){
            commit('updateState', {key: 'error', value: 'No records found.'});
          } else {
            commit('updateState', {key: 'error', value: null});
          }
        }).catch(() => {});
    }
      
  },
  modules: {
  }
});
``