/* eslint-disable import/no-anonymous-default-export */
const API_KEY = '383847002959bd228e1a987afd7940bb';
const API_BASE = 'https://api.themoviedb.org/3';


const basicfetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
};

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais',
                items: await basicfetch(`/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&language=pt-US&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicfetch(`/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'ficção',
                title: 'Ficção científica',
                items: await basicfetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicfetch (`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicfetch (`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicfetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicfetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            };
        };
        return info;
    }
};

// https://api.themoviedb.org/3/discover/movie?certification_country=BR&certification.lte=G&sort_by=popularity.desc&api_key=383847002959bd228e1a987afd7940bb