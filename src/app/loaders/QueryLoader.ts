import {type UseQueryResult} from '@tanstack/react-query'
import React, { ReactElement } from 'react';

interface QueryLoader{
    query: any;
    params: Record<string, string>;
    children: ReactElement
}

const QueryLoader = ({
    query,
    params,
    children
}: QueryLoader)=>{
    
    const {
        data,
        error,
        loading
    } = query(params);

    return (
        {children(data: any, {
            error,
            loading
        }: any)}  
    )
}

/*
<QueryLoader query={useGetProducts} params={query}>
{
    (data)=>{
        return <Products products={data}/>
    }
}
</QueryLoader>
*/

// component tests
// DOM - jsdom - fetch - mock fetch

// <Products products={products}/>