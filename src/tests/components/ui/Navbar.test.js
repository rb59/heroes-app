import {mount} from 'enzyme';
import '@testing-library/jest-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';
// cd
describe('Pruebas en Navbar', () => {
    const contextValues = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Ronald',
        },
    };

    const historyMock = {
        push: jest.fn(),
        location: {},
        replace: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValues}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(contextValues.user.name);
    });

    test('debe llamar el logout y usar el history', () => {
        
        wrapper.find('button').simulate('click');
        expect(contextValues.dispatch).toHaveBeenCalledWith({
            type: types.logout,
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });

});
