import { useState,useEffect } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Trendingmovie from './components/Trendingmovie';
import { getTrendingMovie, updtaeSearchCount } from './appWrite';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method:'GET',
  headers: {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
}
}
const App = () => {
  const [searchTearm, setSearchTerm] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [depounceSearch, setDepounceSearch] = useState('');
  const [istrending, setIstrending] = useState([]);

  useDebounce(() => {
    setDepounceSearch(searchTearm)
},2000,[searchTearm])

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    seterrormessage('');
    try{
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error('faild tp fetch movie');
      }
      
      const data = await response.json();
      setMovies(data.results || []);

      /*//here appwrite */
      if (query && data.results.length > 0) {
        await updtaeSearchCount(query , data.results[0])
      }

    }catch(error){
      console.error(`Error featching movies:${error}`);
      seterrormessage('errore');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovie();
      console.log('Trending movies:', movies); // ✅ Log it
    setIstrending(Array.isArray(movies) ? movies : []); 
    } catch (error) {
      console.log(error);
      setIstrending([])
    }
  }
  useEffect(() => {
    fetchMovies(depounceSearch)
  }, [depounceSearch]);

  useEffect(() => {
    loadTrendingMovies()
  },[])
  return(
    <main>
      <Navbar />
      <div className='patern'>
        
      </div>

      <div className='wrapper'>
        <Header/>
        <Search searchTearm={searchTearm} setSearchTerm={setSearchTerm}/>
          <section id='trending' className='trending '>
            <h2 className='py-3'>Trnding Movies</h2>
            {istrending.length === 0 ? (
              <p>No trending movies found.</p>
            ) : (
                <ul className=' mt-4 flex flex-row overflow-y-auto hide-scrollbar gap-5 -mt-10 w-full '>
                  {istrending.map((movie, index) => (
                    <Trendingmovie key={movie.$id} movie={movie} index={ index} />
                        ))}
                </ul>
            ) }
          </section>
        
        
        <section className='my-3 ' id="papular">
          <h2 className='py-3'>All movies</h2>
          {isloading ? (
            <Spinner />
          ) : errormessage ?
            (
              <p>{errormessage}</p>
            ) : (
              <ul className='img-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                  {movies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
              
                })}

              </ul>
            )
          }
          
        </section>
      </div>
    </main>
  );
}

export default App
//rafce