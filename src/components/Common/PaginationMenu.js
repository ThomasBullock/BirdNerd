import React, { Component, Fragment } from 'react';
import { instanceOf, object, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { setPaginationPage } from '../../ducks/ui';
import { requestPhotos } from '../../ducks/photos';


class PaginationMenu extends Component {
    checkDisabled = (button, pages) => {
        if(button === 'prev' && this.props[this.props.page] === 0) {
            return true;
        } else if( button === 'next' && this.props[this.props.page] === pages - 1) {
            return true;
        } else {
            return false;
        }
    }

    renderPageButtons = (pages) => {
        const checkActive = (i) => {
            return (this.props[this.props.page] === i) ? "pagination__btn pagination__btn--active" : "pagination__btn"; 
        }
        return pages.map( (page, i) => {
            return(
                <li key={i}><button className={checkActive(i)} onClick={() => this.props.setPaginationPage(i, this.props.page)}>{i+1}</button></li>
            )
        }) 
    }

    render() {
        const pages = Array.apply(null, { length: Math.ceil(this.props.totalPhotos / this.props.photosPerPage) });
        return (
            <div className="pagination">
                <ul>
                    <li>
                        <button disabled={this.checkDisabled('prev', pages.length)} 
                            className="pagination__btn pagination__btn--prev" 
                            onClick={() => this.props.setPaginationPage(this.props[this.props.page] - 1, this.props.page)}>
                            Prev
                        </button></li>
                    <li>
                        <ul>
                            {this.renderPageButtons(pages)}
                        </ul>
                    </li>
                    <li>
                        <button disabled={this.checkDisabled('next', pages.length)} 
                            className="pagination__btn pagination__btn--next" 
                            onClick={() => this.props.setPaginationPage(this.props[this.props.page] + 1, this.props.page)}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        photosPerPage: state.getIn(['ui', 'photosPerPage']),
        feedPage: state.getIn(['ui', 'feedPage']),
        myPhotosPage: state.getIn(['ui', 'myPhotosPage']),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaginationPage: (pageNumber, page) => dispatch(setPaginationPage(pageNumber, page)),        
    };
}

PaginationMenu.propTypes = {
    photosPerPage: number.isRequired,
    totalPhotos: number.isRequired, // the total number of photos that will paginated through,
    page: string.isRequired, // the page the pagination component is being used on ie feedPage or myPhotosPage which refers to ui in state 
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PaginationMenu);