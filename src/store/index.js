import Vue from 'vue';
import Vuex from 'vuex';

import MovieService from '@/service/MovieService';
const movieService = new MovieService();

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		popularMovies: [],
		latestMovies: [],
	},
	getters: {
		getPopularMovies(state) {
			return state.popularMovies;
		},

		getLatestMovies(state) {
			return state.latestMovies;
		},
	},
	mutations: {
		setPopularMovies(state, popularMovies) {
			state.popularMovies = popularMovies;
		},

		setLatestMovies(state, latestMovies) {
			state.latestMovies = latestMovies;
		},
	},
	actions: {
		async popularMovies({ commit }) {
			const response = await movieService.getPopularMovies();
			commit('setPopularMovies', response);
		},

		async latestMovies({ commit }) {
			const response = await movieService.getLatestMovie();
			commit('setLatestMovies', response);
		},
	},
	modules: {},
});
