// С помщью хуков реализовать компонент кликера.
// BASIC LEVEL
// По нажатию на кнопку "Добавить" добавлять 1 единицу к счётчику
// Отображать НАСКОЛЬКО единиц будет кнопка добавлять значение в счёт в отдельном элементе (Сколько добавляется за один клик)
// Сделать возможность настраивать текущий шаг ( кол-во единиц, которые добавляются в счёт )
// Сделать два режима: добавление шага и отнимание шага от счёта. Кнопка для изменения счёта должна быть одна.
// ADVANCED LVL 
// Создать кнопку autoClick и по нажатию автоматически с определенной частотой увеличивать счетчик. Частоту автонажатий разрешить регулировать. (например инпутом)
// При запуске приложения сразу запускать автоклик.

import { useState, useEffect} from 'react';
import styles from './Clicker.module.scss';

const Clicker = () => {
  const [count, setCount] = useState(0);
  const [addUnit, setAddUnit] = useState(1);
  const [isIncriment, setIsIncriment] = useState(true);
  const [interval, setInterval] = useState(1000);
  const [isAutoClick, setIsAutoClick] = useState(true);
  const [isReset, setIsReset] = useState(false);
  
  useEffect(() => {
    handleAutoClick();
  },[]);

  useEffect(() => {
    let timerId;
    if(isAutoClick) {
      timerId = setTimeout(() => {
        handleClicker();
      }, interval);
    }
    return () => clearInterval(timerId);
  });

  const handleClicker = () => {
    setCount( isIncriment ? count + addUnit : count - addUnit);
  };

  const handleAutoClick = () => {
    setIsAutoClick(() => !isAutoClick);
  };

  const handleChange = (e) => {
    const {
      target: {value},
    } = e;
    const number = +value;
    if(!isNaN(number) && number !== Infinity){
      setAddUnit(number);
    }
  }

  const handleChangeInterval = (e) => {
    const {
      target: {value},
    } = e;
    const number = +value;
    if(!isNaN(number) && number !== Infinity){
      setInterval(+value);
    }
  };

  const handleReset = () => {
    setIsReset(() => !isReset);
    setCount((count) => count = 0);
  }

  return (
    <article className={styles.wrapperClickerper}>
      <div className={styles.wrapperScreen}>
        <p className={styles.screen}>
        Clicks: {count}
        </p>
        <p className={styles.text}>
            Interval: {interval}
        </p>
      </div>
      <div className={styles.wrapperButtonsInput}>
        <div className={`${styles.wrapperButtons}`}>
          <input className={styles.inputs} type="input" value={addUnit} onChange={handleChange}/>
          <button className={styles.button} onClick={handleClicker}>
          {isIncriment ? 'Add' : 'Del'} point(s)
          </button>
          <button className={styles.button} onClick={() => setIsIncriment(() => !isIncriment)}>Add/Delete</button>
        </div>
        <div className={styles.wrapperButtons}>
          <input className={styles.inputs} type="input" value={interval} onChange={handleChangeInterval}/>
          <button className={styles.button} onClick={() => setIsAutoClick (() => !isAutoClick)}>Autoclick: {isAutoClick ? 'ON' : 'OFF'}</button>
        <button className={styles.button} onClick={handleReset}>Reset</button>
        </div>
      </div>
    </article>
  );
}

export default Clicker;
