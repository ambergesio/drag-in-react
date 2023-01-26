import { useEffect, useState, useRef } from 'react';
import style from './main.module.scss';

const defaultWidth = 50;
const defaultHeight = 50;
const defaultColor = 'rgb(225, 211, 184)';
const transpColor = 'rgba(225, 211, 184, 0)';
const colors = ['red', 'orange', 'green', 'purple', 'grey', 'blue' ];
const defaultBorder = 'solid 2px white';
const defaultRadius = 0;

const App = () => {

    const box = useRef();
    const slide = useRef();

    const [ pantX, setPantX ] = useState();    
    const [ pantY, setPantY ] = useState();    
    const [ mouseX, setMouseX ] = useState();    
    const [ mouseY, setMouseY ] = useState();
    const [ posx, setPosx ] = useState();    
    const [ posy, setPosy ] = useState();

    const [ width, setWidth ] = useState(defaultWidth);
    const [ height, setHeight ] = useState(defaultHeight);

    const [ divColor, setDivColor ] = useState(defaultColor);
    const [ divRadius, setDivRadius ] = useState(defaultRadius);
    
    const mousePosition = (e) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        setPantX(e.screenX)
        setPantY(e.screenY)
    };

    const prevent = (e) => {
        e.preventDefault();
        box.current.style.backgroundColor = transpColor;
        box.current.style.border = 'none';
        box.current.style.borderRadius = '0%';
        box.current.style.clipPath = `circle(${width*2}%)`;
        box.current.style.color = 'rgba(0,0,0,0)';
    }

    const changePosition = () => {
        box.current.style.backgroundColor = divColor;
        box.current.style.border = defaultBorder;
        box.current.style.borderRadius = `${divRadius}%`;
        setPosx(mouseX - width / 2);
        setPosy(mouseY - height / 2);
        box.current.style.color = 'rgba(0,0,0,1)';
    }

    const handleRangeValue = (e) => {
        const value = e.target.value;
        setWidth(value);
        setHeight(value);
        box.current.style.width = `${width}px`;
        box.current.style.height = `${height}px`;
        box.current.style.fontSize = `${value * 0.3}px`;
    };

    const handleColor = (color) => {
        setDivColor(color);
        box.current.style.backgroundColor = `${divColor}`;
    };

    const handleRadius = (e) => {
        const value = e.target.value;
        setDivRadius(value);
        box.current.style.borderRadius = `${divRadius}%`;
    };

    useEffect(() => {
        setPosx(mouseX)
        setPosy(mouseY)
    }, [mouseX, mouseY])

    
    return (
        <main>
            <div
                draggable
                ref={box}
                onDragOver={prevent}
                onDrag={mousePosition}
                onDragEnd={changePosition}
                onTouchEnd={changePosition}
                className={style.cuadrado}
                style={{width: `${width}px`, height: `${height}px`, borderRadius: divRadius , border: 'solid 2px white', backgroundColor: divColor, top: `${posy}px`, left: `${posx}px`}}
            >DRAG ME
            </div>
            <p>div size: {width} px</p>
            <input className={style.slider} ref={slide} type='range' min={20} max={200} value={width} onChange={handleRangeValue} onInput={handleRangeValue} />
            <p>div radius: {divRadius}%</p>
            <input className={style.slider} ref={slide} type='range' min={0} max={50} value={divRadius} onChange={handleRadius} onInput={handleRadius} />
            <div className={style.colors}>
                {
                    colors.map((color) => {
                        return <button key={color} style={{backgroundColor: `${color}`}} onClick={() => handleColor(`${color}`)} />
                    })
                }
            </div>
            <div>
                <ul>
                    <li>posicion del div en eje x al arrastrar: {posx}</li>
                    <li>posicion del div en eje y al arrastrar: {posy}</li>
                    <li>posicion del mouse en x al arrastrar: {mouseX}</li>
                    <li>posicion del mouse en y al arrastrar: {mouseY}</li>
                    <li>posicion de pantalla en x: {pantX}</li>
                    <li>posicion de pantalla en y: {pantY}</li>
                </ul>
            </div>
        </main>
    );
}

export default App;
