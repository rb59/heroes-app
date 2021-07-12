import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';
// cd
export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ''} = queryString.parse(location.search)
    const [searchValues,handleInputChange] = useForm({
        search: q,
    });
    const {search} = searchValues;
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]) ;
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('sirvo');
        history.push(`?q=${search}`);
    };

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>
                    <form>
                        <input 
                            type="search"
                            placeholder="Find your hero"
                            autoComplete="off"
                            className="form-control"
                            name="search"
                            value={search}
                            onChange={handleInputChange}
                        />
                        <div className="m-1 d-grid gap-2">
                            <button 
                                type="submit"
                                className="btn btn-outline-primary"
                                onClick={handleSearch}
                            >
                                Search...
                            </button>
                        </div>
                        
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {
                        ((q==='') && 
                        <div className="alert alert-info">
                            Search a hero
                        </div>) ||
                        ((q!=='' && heroesFiltered.length === 0) && 
                        <div className="alert alert-warning">
                            There is no hero
                        </div>)
                    }
                    {
                        heroesFiltered.map( hero => (
                            <HeroCard key={hero.id} {...hero}/>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};
