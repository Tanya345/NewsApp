import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{top:"-8px", right:"0px",     lineHeight: "1.2", padding:"0.25em 0.7em"}}>{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text my-2"><small className="text-muted">By {author == null ? "unknown" : author} on {new Date(date).toUTCString()} </small></p>
                        <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
// 3e4df5a2a5ed43e59ba1fa91e4d17877