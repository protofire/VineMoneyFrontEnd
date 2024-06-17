import ReactDOM from 'react-dom/client'
import { useState } from 'react';
import styles from './index.module.scss'


let dom = null;
const message = {
    success({ content, duration }) {
        dom = document.createElement('div');
        const JSXdom = (<Message content={content} duration={duration} type='success'></Message>);
        ReactDOM.createRoot(
            dom
        ).render(JSXdom);
        document.body.appendChild(dom);
    },
    error({ content, duration }) {
        dom = document.createElement('div');
        const JSXdom = (<Message content={content} duration={duration} type='error'></Message>);
        ReactDOM.createRoot(
            dom
        ).render(JSXdom);
        document.body.appendChild(dom);
    },
};

function Message(props) {
    const { content, duration, type } = { ...props };
    const [open, setOpen] = useState(true);
    setTimeout(() => {
        setOpen(false);
    }, duration);
    return <div className="space_center">

        {
            open ? (
                <div className='message'>
                    <div className={type}>
                        <div className={styles.msgMain} >
                            <div>{type == "success" ? <img src='/icon/icon_s.svg' alt='close'></img> : <img src='/icon/icon_e.svg' alt='close'></img>}
                                <p>{content}</p></div>
                            <img className={styles.close} onClick={() => setOpen(false)} src='/icon/close.svg' alt='close'></img>
                        </div>
                    </div>
                </div>

            ) : null
        }
    </div>
}

export default message;