import axios from 'axios';

export default class MovieService {
	async getPopularMovies() {
		if ('caches' in window) {
			caches.has('popular_movies').then((hasCache) => {
				if (hasCache) {
					caches.match('popular_movies').then((response) => {
						return response.json();
					});
				} else {
					caches.open('popular_movies').then(async (cache) => {
						let response = await axios.get(
							`${process.env.VUE_APP_API_URL}movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
						);
						cache.put(
							'POPULARMOVIES',
							new Response(
								JSON.stringify(response?.data?.results),
								{
									headers: {
										'content-type': 'application/json',
									},
								}
							)
						);
						return response?.data?.results;
					});
				}
			});
		}
	}

	async getLatestMovie() {
		const response = await axios.get(
			`${process.env.VUE_APP_API_URL}movie/latest?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
		);
		return response?.data?.results;
	}
}
