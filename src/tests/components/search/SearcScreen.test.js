import {mount} from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';
// cd
describe('Pruebas en SearchScreen', () => {
    
    const history = {
        push: jest.fn(),
    };
    test('debe mostrarse correctamente con valores por defecto', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route 
                    path="/search" 
                    component={() => <SearchScreen /> } 
                />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('debe mostrar el heroe y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    path="/search" 
                    component={() => <SearchScreen /> } 
                />
            </MemoryRouter>
        );
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('debe mostrar un error si no se encuentra el hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman1234']}>
                <Route 
                    path="/search" 
                    component={() => <SearchScreen /> } 
                />
            </MemoryRouter>
        );
        expect(wrapper.find('.alert-warning').exists()).toBe(true);
        expect(wrapper.find('.alert-warning').text().trim()).toBe('There is no hero');
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe llamar el push del history', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route 
                    path="/search" 
                    component={() => <SearchScreen history={history} /> } 
                />
            </MemoryRouter>
        );
        wrapper.find('input').simulate('change',{
            target: {
                name: 'search',
                value: 'batman',
            },
        });
        const submit = wrapper.find('button').prop('onClick');
        // console.log(submit);
        submit({
            preventDefault(){},
        });
        expect(history.push).toHaveBeenCalledWith('?q=batman')
    });
    
});
