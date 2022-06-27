import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'

import NewsItem from './NewsItem'
import Spinner from './Spinner'

import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    


    const capitalizeFirstLetter = (str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;        
        
        setloading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonk`;
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    // const handlePrevClick = async() => {
    //     setpage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async() => { 
    //         setpage(page+1)  
    //         updateNews();
    // }

    const fetchMoreData = async  () => {
        const url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;        
        setpage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    }

        return (
        <>
            <h2 className='text-center' style={{margin: '35px 0px',marginTop:'90px'}}>NewsMonk - Top Headlines from {capitalizeFirstLetter(props.category)}</h2>
            {loading && <Spinner/>}           
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
            {/* {!loading && articles.map((element)=>{
                return(
                <div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>)
            })} */}
                <div className="container">
                    <div className="row">
                        {articles.map((element)=>{
                            return(
                            <div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>)
                        })}                
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page+1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;
