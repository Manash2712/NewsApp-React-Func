import React, { Component } from 'react'

export default class NewsItem extends Component {
    
    render() {
        let {title,description, imageUrl,newsurl,author,date,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "90%", zIndex:"1"}}>
                            {source}
                    </span>
                    <img src={imageUrl?imageUrl:"https://minerescue.org/wp-content/uploads/2020/03/Marketplace-Lending-News.jpg"}  className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsurl} target="_blank" className="btn btn-sn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
  }
}
