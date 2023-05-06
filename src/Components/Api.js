import { useEffect, useState } from 'react';
import Animation from './Animation';
import { Link } from 'react-router-dom';
export default function Api() {
    const [moviedata, setMoviedata] = useState([])
    const url = `https://api.tvmaze.com/search/shows?q=all`;

    const getMovie = async (url) => {
        try {
            const res = await fetch(url)
            const data = await res.json();
            setMoviedata(data)

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovie(url)
    }, [url])
    return (
        <>
            <div style={{marginLeft:"15em", display: "flex", justifyContent: "center" , flexDirection:"column"}} className='boxdetail'>
                <Animation/>
            <div style={{display:"flex" , flexDirection:"row" , justifyContent:"start" , color:"white" ,height:"100%", gap:"30px" , padding:"3em 0em" , margin:"0 1em"}} className='slider'>
                {moviedata.length > 0 && moviedata.map(((show) =>
                    <div key={show.show.id} style={{ background: "black", height: "auto", width: "16em" ,borderRadius:"15px", flexShrink:"0" , scrollSnapAlign:"start" , display:"flex" , flexDirection:'column', justifyContent:"center" , alignItems:"center" , boxShadow:"0px 4px 4px black" , padding:"0.5em 0.5em"}} className='card'>
                        <div > 
                        {show.show.image && <img src={show.show.image.medium || show.show.image.original} alt="" />}
                        </div>
                        <p style={{fontSize:"20px" , fontFamily:"cursive" }}>{show.show.name}</p>
                        <Link to={`/next/${show.show.id}`}><button style={{ borderRadius:"15px" , fontSize:"16px" , border:"none"  , width:"auto" , padding:"0.5em 0.5em" , boxShadow:"5px 5px 16px #383838, -5px -5px 16px #000" , fontWeight:"600"}} className='button' >Book show</button></Link>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}
