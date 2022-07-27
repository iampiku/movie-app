import axios from 'axios';

export default class MovieService {
	async getPopularMovies() {
		if ('caches' in window) {
			const hasCaches = await caches.has('popular_movies')
			if (hasCaches) {
				let response = await caches.match('popular_movies');
				return response.json();
			} else {
				let response = await axios.get(`${process.env.VUE_APP_API_URL}movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`);
				const cache = await caches.open('popular_movies');

				cache.put('popular_movies', new Response(JSON.stringify(response?.data?.results), {
					headers: {
						'content-type': 'application/json',
					}
				}))
				return response?.data?.results;
			}
		}
	}

	async getLatestMovie() {
		const response = await axios.get(
			`${process.env.VUE_APP_API_URL}movie/latest?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
		);
		return response?.data?.results;
	}
}
