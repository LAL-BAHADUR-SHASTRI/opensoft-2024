import { Select, SelectContent,SelectGroup,SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
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
  return (
    <div style={styles.container}>
      <SelectBar />
    </div>
  );
}

export default MovieList;

const styles = Stylesheet.create({
  container: {
    display: 'flex',
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
  }
})
