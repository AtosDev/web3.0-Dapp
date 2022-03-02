//custom useFetch hook
import { useState, useEffect } from 'react';

const APIKEY = import.meta.env.VITE_GIPHY_API_KEY; // importing api key from env file

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
        try {
          const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);  //limit=1 is to get only one gif at a time
          //console.log(response);
          const { data } = await response.json();  // data is the object which contains the gif url and the title

          //console.log(data);
          setGifUrl(data[0]?.images?.downsized_medium?.url); // set the gif url in the state variable 

        } catch (error) {
            console.log(error);
            setGifUrl('https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif'); // if there is an error then set the gif url to this url
        }
    };

    useEffect(() => { // useEffect is a hook that runs after every render
        if (keyword) { // if keyword is not empty
            fetchGifs(); // fetch the gifs
        } 
    }, [keyword]); // useEffect will run only if keyword changes

    return gifUrl; // return the url of the gif
}

export default useFetch;

// what is import.meta.env
// import.meta.env is a special object that contains the environment variables that were defined in the webpack configuration.
// vite automatically defines the environment variables when we write import.meta.env.name
// what is keyword.split(" ").join("")
// keyword.split(" ").join("") is a function that splits the keyword by space and joins the words without space
// if a user types something with space then it would be converted to a string without space
// what is data[0]? ?
// data[0]? is a conditional operator that checks if data is not empty and if it is not empty then it will return the first element of the data array