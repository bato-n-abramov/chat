import React from 'react';
import './styles.scss';
import Logo from '../ui/Icons/Logo';
import Book from '../ui/Icons/Book';
import Stars from '../ui/Icons/Starts';
import Crypto from '../ui/Icons/Crypto';

const introPrompts = [
    {
        icon: <Book/>,
        title: 'Text Generation',
        text: 'How can i make web page?',

    },
    {
        icon: <Stars/>,
        title: 'Image Generation',
        text: 'Generate unicorn image',
    },
    {
        icon: <Crypto />,
        title: 'Market Analysis',
        text: 'What is the bitcoin forecast?',
    }
];


const Intro = () => {
    return (
        <div className='intro'>
            <div className='intro-wrapper'>
                <div className='intro-logo'>
                    <Logo />
                </div>
                <h1 className='intro-title'>Censorship-Resistant Intelligence</h1>
                <div className='intro-version'>v0.1 alpha</div>
                <div className='intro-prompts'>
                    {introPrompts.map((prompt, index) => (
                            <div key={index} className='intro-prompt'>
                                {prompt.icon && prompt.icon}
                                <h2 className='intro-prompt-title'>{prompt.title}</h2>
                                <p className='intro-prompt-text'>{prompt.text}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}


export default Intro;
