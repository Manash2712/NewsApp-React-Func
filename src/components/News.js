import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NewsItem from './NewsItem'
import Spinner from './Spinner'

import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonk`;
    }

    async updateNews(){
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;        
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false        
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){  //it will run after render and async func can wait inside its body to get some promises resolved!
        this.updateNews();
    }

    /*handlePrevClick = async() => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae6d707438b14e21843beef9cb2633ab&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page-1});
        this.updateNews();
    }*/

    /*handleNextClick = async() => {
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae6d707438b14e21843beef9cb2633ab&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            // this.setState({
            //     loading: true
            // })
            // let data = await fetch(url);
            // let parsedData = await data.json();
            // this.setState({
            //     page: this.state.page+1,
            //     articles: parsedData.articles,
            //     loading: false
            // }) 
            this.setState({page: this.state.page+1});   
            this.updateNews();
    }*/

    fetchMoreData = async  () => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;        
        
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false        
        })
    }

    render() {
        return (
        <>
            <h2 className='text-center' style={{margin: '35px 0px'}}>NewsMonk - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
            {this.state.loading && <Spinner/>}            

            
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
            >
            {/* {!this.state.loading && this.state.articles.map((element)=>{
                return(
                <div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>)
            })} */}
                <div className="container">
                    <div className="row">
                        {this.state.articles.map((element)=>{
                            return(
                            <div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>)
                        })}                
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
        )
    }
}
