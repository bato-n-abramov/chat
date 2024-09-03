import React from 'react';
import './styles.scss';

const introPrompts = [
    {
        icon: '',
        title: 'Text Generation',
        text: 'How can i make web page?',

    },
    {
        icon: '',
        title: 'Image Generation',
        text: 'Generate unicorn image',
    },
    {
        icon: '',
        title: 'Market Analysis',
        text: 'What is the bitcoin forecast?',
    }
];


const Intro = () => {
    return (
        <div className='intro'>
            <div className='intro-wrapper'>
                <div className='intro-logo'></div>
                <h1 className='intro-title'>Censorship-Resistant Intelligence</h1>
                <div className='intro-version'>v0.1 alpha</div>
                <div className='intro-prompts'>
                    {introPrompts.map((prompt, index) => (
                            <div key={index} className='intro-prompt'>
                                {prompt.icon && <img src={prompt.icon} alt={`${prompt.title} icon`} className='intro-icon' />}
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
