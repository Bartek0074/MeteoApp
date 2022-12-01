import '../styles/Form.scss'
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

function Form(props) {

	const { formHandle } = props;

    const [input, setInput] = useState('');

	const onClickHandle = (e) => {
		e.preventDefault();
		formHandle(input);
        setInput('')
	};

	return (
		<form className='form'>
			<input value={input} onChange={(e) => setInput(e.target.value)} className='form__input' placeholder='Search'></input>
			<button onClick={onClickHandle} className='form__button'>
				<BsSearch className='icon' />
			</button>
		</form>
	);
}

export default Form;
