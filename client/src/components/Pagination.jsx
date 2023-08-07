import React from "react";
import { useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import useStyles from './styles';

const Paginate = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={Math.floor(posts.ids.length / 6)}
            page={1}
            variant="primary"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`}/>
            )}
        />
    )
};

export default Paginate;