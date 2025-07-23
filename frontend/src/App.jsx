import React, { useRef, useState, useEffect } from 'react'
import MyPhoto from './assets/photo/MY_PHOTO_MAIN.jpg'
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

function App() {
    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const projectsRef = useRef(null)
    const contactRef = useRef(null)

    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [messages, setMessages] = useState([])
    const [showMessages, setShowMessages] = useState(false)

    // Added missing hover state declarations
    const [hoverAbout, setHoverAbout] = useState(false)
    const [hoverProjects, setHoverProjects] = useState(false)
    const [hoverContact, setHoverContact] = useState(false)

    // For tsparticles init
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Send formData to backend API
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                setFormData({ name: '', email: '', message: '' })
                fetchMessages()
            } else {
                alert('Failed to send message')
            }
        } catch (error) {
            alert('Error sending message')
        }
    }

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages`)
            if (response.ok) {
                const data = await response.json()
                setMessages(data)
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <div style={ { backgroundColor: '#1a2238', color: '#d0d4e6', minHeight: '100vh', fontFamily: 'Arial, sans-serif', position: 'relative', overflow: 'hidden' } }>
            {/* Animated Particles Background */ }
            <Particles
                id="tsparticles"
                init={ particlesInit }
                style={ { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 } }
                options={ {
                    fullScreen: { enable: false },
                    background: { color: { value: '#1a2238' } },
                    particles: {
                        number: { value: 110, density: { enable: true, value_area: 1000 } },
                        color: { value: ["#6c63ff", "#00cfff"] },
                        shape: { type: 'circle' },
                        opacity: { value: 0.45, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.15, sync: false } },
                        size: { value: 2.2, random: { enable: true, minimumValue: 0.7 } },
                        move: {
                            enable: true,
                            speed: 0.6,
                            direction: 'none',
                            random: true,
                            straight: false,
                            outModes: { default: 'out' },
                            parallax: { enable: true, force: 20, smooth: 10 },
                        },
                        links: {
                            enable: true,
                            distance: 120,
                            color: ["#6c63ff", "#00cfff"],
                            opacity: 0.18,
                            width: 1,
                        },
                        twinkle: {
                            particles: { enable: true, color: '#fff', frequency: 0.12, opacity: 0.7 },
                            lines: { enable: false }
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: 'repulse' },
                            onClick: { enable: true, mode: 'push' },
                        },
                        modes: {
                            repulse: { distance: 60, duration: 0.7 },
                            push: { quantity: 4 },
                        },
                    },
                    detectRetina: true,
                } }
            />
            <nav style={ {
                position: 'fixed',
                top: '1.2rem',
                left: '40px',
                right: '40px',
                width: 'auto',
                background: 'rgba(44, 62, 112, 0.75)',
                color: '#d0d4e6',
                padding: '0.85rem 2.5rem',
                display: 'flex',
                alignItems: 'center',
                zIndex: 1000,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.08)',
                fontFamily: 'Poppins, Arial, sans-serif',
                transition: 'background 0.3s',
            } }>
                <div style={ { fontWeight: 'bold', fontSize: '1.45rem', fontFamily: 'Poppins, Arial, sans-serif', cursor: 'default', letterSpacing: '2px', color: '#f0f4ff' } }>My Portfolio</div>
                <div style={ { flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '2.2rem' } }>
                    { [{ label: 'Home', ref: homeRef }, { label: 'About', ref: aboutRef }, { label: 'Projects', ref: projectsRef }, { label: 'Contact', ref: contactRef }].map((item, idx) => (
                        <button
                            key={ item.label }
                            onClick={ () => scrollToRef(item.ref) }
                            style={ {
                                background: 'none',
                                border: 'none',
                                color: '#d0d4e6',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1.08rem',
                                padding: '0.4rem 1.1rem',
                                borderRadius: '8px',
                                letterSpacing: '1px',
                                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                                position: 'relative',
                            } }
                            className="nav-btn"
                        >
                            { item.label }
                        </button>
                    )) }
                </div>
                <style>{ `
                    .nav-btn:hover {
                        background: rgba(108, 99, 255, 0.18);
                        color: #f0f4ff;
                        box-shadow: 0 2px 8px #6c63ff33;
                    }
                    .nav-btn:active {
                        background: rgba(108, 99, 255, 0.32);
                        color: #fff;
                    }
                `}</style>
            </nav>

            {/* Home Section */ }
            <div
                ref={ homeRef }
                style={ {
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #283353 60%, #3a4a7a 100%)',
                    animation: 'fadeInScale 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
                    zIndex: 1,
                } }
            >
                <h1
                    style={ {
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #f0f4ff, #6c63ff, #f0f4ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        letterSpacing: '2px',
                        textShadow: '0 4px 24px #1a2238',
                        opacity: 0.95,
                        animation: 'fadeInText 2s 0.2s both',
                    } }
                >
                    Welcome to my profile
                </h1>
                <p style={ { color: '#d0d4e6', fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.85, animation: 'fadeInText 2s 0.6s both' } }>
                    Explore my journey, projects, and get in touch!
                </p>
                <button
                    onClick={ () => scrollToRef(aboutRef) }
                    style={ {
                        background: 'linear-gradient(90deg, #6c63ff, #3a4a7a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        padding: '0.8rem 2.2rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px #1a2238',
                        transition: 'transform 0.2s',
                        marginTop: '1rem',
                        animation: 'fadeInText 2s 1s both',
                    } }
                >
                    ↓ Scroll to About
                </button>
                {/* Keyframes for animation */ }
                <style>{ `
                    @keyframes fadeInScale {
                        0% { opacity: 0; transform: scale(0.95); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes fadeInText {
                        0% { opacity: 0; transform: translateY(30px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>

            <div
                ref={ aboutRef }
                onMouseEnter={ () => setHoverAbout(true) }
                onMouseLeave={ () => setHoverAbout(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2rem',
                    backgroundColor: hoverAbout ? '#3a4a7a' : '#283353',
                    maxWidth: '900px',
                    margin: '3rem auto',
                    borderRadius: '10px',
                    boxShadow: hoverAbout ? '0 10px 20px rgba(58,74,122,0.9)' : '0 6px 12px rgba(0,0,0,0.8)',
                    transition: 'background 0.3s, box-shadow 0.3s',
                } }
            >
                <h1 style={ { color: '#f0f4ff' } }>About</h1>
                <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2rem' } }>
                    <img src={ MyPhoto } alt="Profile" style={ { borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', boxShadow: '0 0 15px #1a2a5a' } } />
                    <div style={ { display: 'flex', flexDirection: 'column' } }>
                        <h2 style={ { color: '#d0d4e6' } }>Kavya Shyopura</h2>
                        <p style={ { color: '#c0c4d6' } }>Bio: Recent engineering graduate with a strong interest in software development, eager to contribute, learn, and grow within a dynamic team environment.</p>
                        <p style={ { color: '#c0c4d6' } }>Skills: ++, Javascript, Python, DSA, Computer Networks.</p>
                        <p style={ { color: '#c0c4d6' } }>
                            Phone: <a href="tel:+917597974095" style={ { color: '#c0c4d6', textDecoration: 'underline' } }>
                                +91 7597974095
                            </a>
                        </p>

                        <p style={ { color: '#c0c4d6' } }>
                            Email: <a href="mailto:kavya02shyopura@gmail.com" style={ { color: '#c0c4d6', textDecoration: 'underline' } }>
                                kavya02shyopura@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={ projectsRef }
                onMouseEnter={ () => setHoverProjects(true) }
                onMouseLeave={ () => setHoverProjects(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2rem',
                    backgroundColor: hoverProjects ? '#3a4a7a' : '#283353',
                    maxWidth: '900px',
                    margin: '2rem auto',
                    borderRadius: '10px',
                    boxShadow: hoverProjects ? '0 10px 20px rgba(58,74,122,0.9)' : '0 6px 12px rgba(0,0,0,0.8)',
                    transition: 'background 0.3s, box-shadow 0.3s',
                } }
            >
                <h1 style={ { color: '#f0f4ff' } }>Projects</h1>
                <div style={ { display: 'flex', flexDirection: 'column', gap: '1.5rem' } }>
                    <div>
                        <h2 style={ { color: '#d0d4e6' } }>Emotion recognition using text</h2>
                        <a href="https://github.com/kavya02shyopura/Emotion-detection-python" target="_blank" rel="noopener noreferrer">
                            <button style={ { padding: '0.5rem 1rem', backgroundColor: '#1a2a5a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' } }>
                                View Project
                            </button>
                        </a>
                    </div>
                    <div>
                        <h2 style={ { color: '#d0d4e6' } }>Portfolio</h2>
                        <a href="https://github.com/kavya02shyopura/Portfolio" target="_blank" rel="noopener noreferrer">
                            <button style={ { padding: '0.5rem 1rem', backgroundColor: '#1a2a5a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' } }>
                                View Project
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div
                ref={ contactRef }
                onMouseEnter={ () => setHoverContact(true) }
                onMouseLeave={ () => setHoverContact(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2rem',
                    backgroundColor: hoverContact ? '#3a4a7a' : '#283353',
                    maxWidth: '900px',
                    margin: '2rem auto 4rem auto',
                    borderRadius: '10px',
                    boxShadow: hoverContact ? '0 10px 20px rgba(58,74,122,0.9)' : '0 6px 12px rgba(0,0,0,0.8)',
                    position: 'relative',
                    transition: 'background 0.3s, box-shadow 0.3s',
                } }
            >
                <h1 style={ { color: '#f0f4ff' } }>Contact</h1>
                <form onSubmit={ handleSubmit } style={ { display: 'flex', flexDirection: 'column', gap: '1rem' } }>
                    <input type="text" name="name" placeholder="Name" value={ formData.name } onChange={ handleInputChange } required style={ { padding: '0.5rem', borderRadius: '5px', border: '1px solid #4a5a8a', backgroundColor: '#1f2a55', color: '#d0d4e6' } } />
                    <input type="email" name="email" placeholder="Email" value={ formData.email } onChange={ handleInputChange } required style={ { padding: '0.5rem', borderRadius: '5px', border: '1px solid #4a5a8a', backgroundColor: '#1f2a55', color: '#d0d4e6' } } />
                    <textarea name="message" placeholder="Message" value={ formData.message } onChange={ handleInputChange } required rows={ 4 } style={ { padding: '0.5rem', borderRadius: '5px', border: '1px solid #4a5a8a', backgroundColor: '#1f2a55', color: '#d0d4e6' } } />
                    <button type="submit" style={ { padding: '0.5rem 1rem', backgroundColor: '#1a2a5a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' } }>Send</button>
                </form>
                { showMessages && (
                    <div>
                        <h2 style={ { marginTop: '2rem', color: '#f0f4ff' } }>Messages</h2>
                        <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
                            { messages.map((msg, index) => (
                                <li key={ index } style={ { backgroundColor: '#2c3e70', padding: '1rem', borderRadius: '5px', marginBottom: '1rem', color: '#d0d4e6' } }>
                                    <p><strong>Name:</strong> { msg.name }</p>
                                    <p><strong>Email:</strong> { msg.email }</p>
                                    <p><strong>Message:</strong> { msg.message }</p>
                                </li>
                            )) }
                        </ul>
                    </div>
                ) }
            </div>
            <button onClick={ () => setShowMessages(!showMessages) } style={ { position: 'fixed', right: '1rem', bottom: '1rem', padding: '0.6rem 1rem', backgroundColor: '#1a2a5a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', zIndex: 1000 } }>
                { showMessages ? 'Hide Messages' : 'Show Messages' }
            </button>
            {/* Stylish Footer */ }
            <footer style={ {
                width: '100%',
                background: 'rgba(44, 62, 112, 0.85)',
                color: '#d0d4e6',
                padding: '1.5rem 0 1rem 0',
                marginTop: '2rem',
                borderTopLeftRadius: '18px',
                borderTopRightRadius: '18px',
                boxShadow: '0 -2px 16px rgba(0,0,0,0.18)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
            } }>
                <div style={ { display: 'flex', gap: '2.5rem', marginBottom: '0.7rem' } }>
                    { ['Home', 'About', 'Projects', 'Contact'].map((label, idx) => (
                        <button
                            key={ label }
                            onClick={ () => {
                                if (label === 'Home') scrollToRef(homeRef);
                                if (label === 'About') scrollToRef(aboutRef);
                                if (label === 'Projects') scrollToRef(projectsRef);
                                if (label === 'Contact') scrollToRef(contactRef);
                            } }
                            style={ {
                                background: 'none',
                                border: 'none',
                                color: '#d0d4e6',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '1rem',
                                letterSpacing: '1px',
                                margin: 0,
                                padding: '0.2rem 0.7rem',
                                borderRadius: '6px',
                                transition: 'background 0.2s, color 0.2s',
                            } }
                            className="footer-link"
                        >
                            { label }
                        </button>
                    )) }
                </div>
                <div style={ { display: 'flex', gap: '1.5rem', marginBottom: '0.7rem' } }>
                    <a href="https://www.linkedin.com/in/kavya-shyopura-b262a6272/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-icon" style={ { color: '#d0d4e6', fontSize: '1.7rem', transition: 'color 0.2s' } }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4V8zm7 0h3.6v1.7h.05c.5-.95 1.7-1.95 3.5-1.95 3.75 0 4.45 2.5 4.45 5.75V20h-4v-5.5c0-1.3-.03-3-1.85-3-1.85 0-2.13 1.45-2.13 2.9V20h-4V8z" /></svg>
                    </a>
                    <a href="https://github.com/kavya02shyopura" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-icon" style={ { color: '#d0d4e6', fontSize: '1.7rem', transition: 'color 0.2s' } }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.1.823 2.22v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
                    </a>
                    <a href="mailto:Kavya02shyopura@gmail.com" aria-label="Email" className="footer-icon" style={ { color: '#d0d4e6', fontSize: '1.7rem', transition: 'color 0.2s' } }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                    </a>
                </div>
                <div style={ { fontSize: '0.98rem', color: '#b0b4c6', letterSpacing: '1px' } }>
                    &copy; { new Date().getFullYear() } Kavya Shyopura. All rights reserved.
                </div>
                <style>{ `
                    .footer-link:hover {
                        background: rgba(108, 99, 255, 0.18);
                        color: #fff;
                    }
                    .footer-icon:hover {
                        color: #6c63ff;
                    }
                `}</style>
            </footer>
        </div>
    )
}

export default App
