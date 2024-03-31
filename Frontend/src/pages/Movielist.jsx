import { MovieCard } from "@/components/mov_thumbn";
import { Select, SelectContent,SelectGroup,SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import Stylesheet from "reactjs-stylesheet";


const SelectBar = () => {

  const filters = ['Country','Language','Genre'];
  const [genre,setGenre] = useState('');
  const [language,setLanguage] = useState(''); 
  const [country,setCountry] = useState('');

  const handleUpdate = (filter,val) => {
    if(filter == 'Country'){
      setCountry(val);
    }else if(filter == 'Language'){
      setLanguage(val);
    }else if(filter == 'Genre'){
      setGenre(val);
    }
  }

  return (
    <div style={styles.selectbar}>
      {filters.map((item,index) => (
        <div style={styles.filter}>
          <Select className='select' onValueChange={(el) => handleUpdate(item,el)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={item} />
            </SelectTrigger>
            <SelectContent className='selectItem'>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ) 
}


const MovieList = () => {
  const [movData, setMovData] = useState([]);
  const [fromSearch, setFromSearch] = useState(false);

  useEffect(() => {
    let val ;
    const movielist = JSON.parse(localStorage.getItem('movieList'))?.semantic || '';
    if(movielist){
      if(movielist.length > 0){
        console.log('from Movielis')
        setMovData(movielist);
        setFromSearch(true);
        val = true;
    // localStorage.removeItem('movieList');
      }
    }

    if(!val){
      fetch(`${import.meta.env.VITE_BHOST}/movie/`)
        .then(response => response.json())
        .then(data => {
          setMovData(data);
          console.log('Success fetching Movie Data:', data);
        })
        .catch(error => {
          console.error('Error fetching Movie Data:', error);
          Toast.error('Error Fetching Movie Data');
        });
    } 
  }, []);


  return (
    <div style={styles.container}>
      <SelectBar />
      {!!movData && <div style={styles.movieBox}>
         {movData?.map((item,index) => (
          <MovieCard data={item} />
        ))}
      </div>}
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
  filter : {
    paddingLeft: 30
  },
  movieBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10
  }
})
