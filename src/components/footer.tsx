import * as React from 'react';
import { Link } from 'react-router-dom';

interface FilterLinkProps extends React.HTMLProps<HTMLDivElement>{
    filter: string;
}

const FilterLink = (props: FilterLinkProps) => {
    return <Link
        to={props.filter === 'all' ? '' : props.filter}
    >
        {props.children}
    </Link>
};

const Footer = () => {
    return <p>
        Show:
        {""}
        <FilterLink filter='all'> All </FilterLink>
        {", "}
        <FilterLink filter='active'> Active </FilterLink>
        {", "}
        <FilterLink filter='completed'> Completed </FilterLink>
    </p>
};

export default Footer;