import {authReducer} from '../../auth/authReducer';
import { types } from '../../types/types';
describe('Pruebas en authReducer', () => {
   
    const user = {
        name:'Ronald',
        logged:true,
    }
    test('debe retornar el estado por defecto', () => {
        const state = authReducer(user,{});
        expect(state).toEqual(user);
    });
    
    test('debe autenticar y colocar el name del usuario', () => {
        const state = authReducer({},{
            type: types.login,
            payload: user,
        });
        expect(state).toEqual(user);
    });
    
    test('debe borrar el name y logged en false', () => {
        const state = authReducer(user,{
            type: types.logout,
        });
        expect(state).toEqual({logged:false});
    });
    
});
