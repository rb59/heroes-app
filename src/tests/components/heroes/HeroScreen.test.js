import {mount} from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import HeroScreen from '../../../components/heroes/HeroScreen';
// cd
describe('Pruebas en HeroScreen', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        goBack: jest.fn(),
        length: 10,
    };
    
    test('debe mostrar el redirect si no hay argumentos en el url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>      
                <HeroScreen history={historyMock}/>
            </MemoryRouter>
        );
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });
    
    test('debe mostrar un hero si el parametro existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>      
               <Route path="/hero/:heroId" component={HeroScreen} /> 
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true);
    });
    
    test('debe regresar a la pantalla anterior con push', () => {
        const historyMock = {
            push: jest.fn(),
            replace: jest.fn(),
            goBack: jest.fn(),
            length: 1,
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>      
                <Route  
                    path="/hero/:heroId" 
                    component={() => <HeroScreen history={historyMock} />} 
                /> 
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(historyMock.push).toHaveBeenCalled();
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('debe regresar a la pantalla anterior con goBack', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>      
                <Route  
                    path="/hero/:heroId" 
                    component={() => <HeroScreen history={historyMock} />} 
                /> 
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(historyMock.push).not.toHaveBeenCalled();
        expect(historyMock.goBack).toHaveBeenCalled();
    });

    test('debe llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider3423422']}>      
                <Route  
                    path="/hero/:heroId" 
                    component={() => <HeroScreen history={historyMock} />} 
                /> 
            </MemoryRouter>
        );
        expect(wrapper.text()).toBe('');
    });
    
});
