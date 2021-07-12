import {mount}from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';
// cd
describe('Pruebas en PrivateRoute', () => {

    const props = {
        location:{
            pathname: '/marvel',
        },
    };
    Storage.prototype.setItem = jest.fn();
    test('debe mostrar el componente si está autenticado y guardar localStorage', () => {
        
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={true}
                    component={() => <span>Listo</span>}
                    {...props}
                /> 
            </MemoryRouter>
        );
        
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath',props.location.pathname);
    });
    test('debe bloquear el componente si no está autenticado', () => {
        
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={false}
                    component={() => <span>Listo</span>}
                    {...props}
                /> 
            </MemoryRouter>
        );
        
        expect(wrapper.find('span').exists()).toBe(false);
    });
    
});
