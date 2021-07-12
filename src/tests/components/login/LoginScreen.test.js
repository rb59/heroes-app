import {mount} from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import LoginScreen from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

// cd
describe('Pruebas en LoginScreen', () => {
    
    const historyMock = {
        replace: jest.fn(),
    };
    const authValues = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        },
    };
    const wrapper = mount(
        <AuthContext.Provider value={authValues}>
            <LoginScreen history={historyMock} />
        </AuthContext.Provider>
    );

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe realizar el dispatch y la navegación', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();
        expect(authValues.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Ronald',
            },
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/');
        localStorage.setItem('lastPath','/marvel');
        handleClick();
        expect(historyMock.replace).toHaveBeenCalledWith('/marvel');
        
    });
    
});
