import { MovieCard } from "@/components/mov_thumbn";
import { Select, SelectContent,SelectGroup,SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useEffect, useContext } from "react";
import Stylesheet from "reactjs-stylesheet";
import { MovieListContext } from "@/App";


const SelectBar = ({genres,languages,countries,onDataChange, filterGenre}) => {
  const [formData, setFormData] = useState({
    genre: '',
    language: '',
    country: ''
  });

  useEffect(() => {
    if (filterGenre === undefined || filterGenre === null){
      return 
    }

    console.log("settign to : ",filterGenre)
    setFormData((prevData) => ({...prevData,genre:filterGenre}));
    submitForm();   
  },[filterGenre])

  const onReset = () => {
    setFormData({
      genre: '',
      language: '',
      country: ''
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = () => {
    // Log to console
    let fd=''
    for (const [key, value] of Object.entries(formData)) {
      if (value !== '') {
        fd+=`${key}=${value}&`
      }
    }
    console.log(fd);

    fetch(`${import.meta.env.VITE_BHOST}/movie/filter?`+fd, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          onDataChange(data);
          console.log('API Response:', data);
          // Handle the API response as needed
        })
        .catch(error => {
          console.error('API Error:', error);
          // Handle the error
        });
  };

  return (
    <div style={styles.selectbar}>
      <form className=" w-full flex items-center justify-center mb-8 gap-4">
        <div className="w-60 p-2">
          <select
            className="w-full mx-2 p-2 text-black"
            name="genre"
            onChange={handleSelectChange}
            value={formData.genre}>
            <option value="">Genre</option>
            {genres.map((start_year) => (
              <option value={start_year}>{start_year}</option>
            ))}
          </select>
        </div>
        <div className="w-60 p-2">
          <select
            className="w-full mx-2 p-2 text-black"
            name="language"
            onChange={handleSelectChange}
            value={formData.language}>
            <option value="">Language</option>
            {languages.map((start_year) => (
              <option value={start_year}>{start_year}</option>
            ))}
          </select>
        </div>
        <div className="w-60 p-2">
          <select
            className="w-full mx-2 p-2 text-black"
            name="country"
            onChange={handleSelectChange}
            value={formData.country}>
            <option value="">Country</option>
            {countries.map((start_year) => (
              <option value={start_year}>{start_year}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="button"
            className=" bg-secondary rounded text-secondary-foreground w-20 px-4 py-2 "
            onClick={submitForm}>
            Filter
          </button>
        </div>
        <div>
          <button
            type="button"
            className=" bg-secondary rounded text-secondary-foreground w-20 px-4 py-2 "
            onClick={onReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  ); 
}


const MovieList = ({filterGenre}) => {

  const {genre} = useContext(MovieListContext);
  const [loading, setLoading] = useState(true);
  const [movData, setMovData] = useState([]);
  const [fromSearch, setFromSearch] = useState(false);
  const [genres,SetGenres] = useState([]);
  const [languages,SetLanguages] = useState([]);
  const [countries,SetCountries] = useState([]);

  useEffect(() => {
    let val ;
    const movielist = JSON.parse(localStorage.getItem('movieList'))?.semantic || '';
    if(movielist){
      if(movielist.length > 0){
        console.log('from Movielis')
        setMovData(movielist);
        setFromSearch(true);
        setLoading(false);
        val = true;
    // localStorage.removeItem('movieList');
      }
    }

    if(!val){
      fetch(`${import.meta.env.VITE_BHOST}/movie/`)
        .then(response => response.json())
        .then(data => {
          setMovData(data);
          setLoading(false);
          console.log('Success fetching Movie Data:', data);
        })
        .catch(error => {
          console.error('Error fetching Movie Data:', error);
          setLoading(false);
          Toast.error('Error Fetching Movie Data');
        });
    } 
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/genrelist`)
    .then(response => response.json())
    .then(data => {
        SetGenres(data);
        // setLoading(false);
        console.log('Success fetching Movie Data:', data);
      })
      .catch(error => {
        console.error('Error fetching Movie Data:', error);
        // setLoading(false);
        Toast.error('Error Fetching Movie Data');
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/languages`)
    .then(response => response.json())
    .then(data => {
        SetLanguages(data);
        // setLoading(false);
        console.log('Success fetching Movie Data:', data);
      })
      .catch(error => {
        console.error('Error fetching Movie Data:', error);
        // setLoading(false);
        Toast.error('Error Fetching Movie Data');
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/countries`)
    .then(response => response.json())
    .then(data => {
        SetCountries(data);
        // setLoading(false);
        console.log('Success fetching Movie Data:', data);
      })
      .catch(error => {
        console.error('Error fetching Movie Data:', error);
        // setLoading(false);
        Toast.error('Error Fetching Movie Data');
      });
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <SelectBar
        filterGenre={genre || null}
        genres={genres}
        languages={languages}
        countries={countries}
        onDataChange={setMovData}
      />
      {!!movData && (
        <div style={styles.movieBox}>
          {movData?.map((item, index) => (
            <MovieCard data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;

const styles = Stylesheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight:'100vh'
  },
  selectbar: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    color: 'white',
    margin: 10,
    alignItems: 'center',
  },
  movieBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10
  }
})
