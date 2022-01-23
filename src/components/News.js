import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    titleCase = (str) => {
        let s = str.split(" ");
        for (let i = 0; i < s.length; i++) {
            s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
        }
        return s.join(" ");
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTime`;
    }

    async updateNews() {
        this.props.setProgress(15);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(45);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    // handlePrevClick = async (page) => {
    //     this.setState({ page: page + 1 });
    //     this.updateNews();
    // }
    // handleNextClick = async (page) => {
    //     this.setState({ page: page + 1 });
    //     this.updateNews();
    // }

     fetchMoreData = async () => {
         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
         this.setState({ page: this.state.page + 1 });
         let data = await fetch(url);
         let parsedData = await data.json();
         this.setState({
             articles: this.state.articles.concat(parsedData.articles),
             totalResults: parsedData.totalResults
            })
        }
             render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: "35px", marginTop: "90px" }}>NewsTime - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
               {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row d-flex justify-content-center">
                        {/*this.state.loading ? <Spinner /> : */this.state.articles.map((e) => {
                            return <div className="col-md-4 d-flex justify-content-center" key={e.url}>
                                <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={this.titleCase(e.source.name.toLowerCase())} />
                            </div>
                        })}
                    </div>
                    </div>

                </InfiniteScroll>

                {/* {!this.state.loading && <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={() => this.handlePrevClick(this.state.page)}> &larr; Previous</button>
                    <button type="button" disabled={Math.ceil(this.state.page + 1 > this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={() => this.handleNextClick(this.state.page)}>Next &rarr;</button>
                </div>} */}
            </>
        )
    }
}

export default News
