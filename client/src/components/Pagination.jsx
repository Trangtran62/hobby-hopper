import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import useStyles from './styles';
import { fetchPosts } from '../reducers/posts';
import * as api from '../api';

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [numberOfPages, setNumberOfPages] = useState(1);

    api.fetchPosts(page)
        .then((res) => {
            setNumberOfPages(res.data.numberOfPages);
        })
    
    useEffect(() => {
        if (page) {
            dispatch(fetchPosts(page));
        }
    }, [dispatch, page]);


    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )}
        />
    )
};

export default Paginate;