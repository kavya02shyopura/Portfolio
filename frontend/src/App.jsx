import React, { useRef, useState, useEffect } from 'react'
import MyPhoto from './assets/photo/MY_PHOTO_MAIN.jpg'

function App() {
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
        <div style={ { backgroundColor: '#1a2238', color: '#d0d4e6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' } }>
            <nav style={ { position: 'fixed', top: 0, width: '100%', background: '#2c3e70', color: '#d0d4e6', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', zIndex: 1000, boxShadow: '0 2px 6px rgba(0,0,0,0.8)' } }>
                <div style={ { fontWeight: 'bold', fontSize: '1.25rem', fontFamily: 'Arial, sans-serif', cursor: 'default' } }>My Portfolio</div>
                <div style={ { flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '1.5rem' } }>
                    <button onClick={ () => scrollToRef(aboutRef) } style={ { background: 'none', border: 'none', color: '#d0d4e6', cursor: 'pointer', fontWeight: 'bold' } }>About</button>
                    <button onClick={ () => scrollToRef(projectsRef) } style={ { background: 'none', border: 'none', color: '#d0d4e6', cursor: 'pointer' } }>Projects</button>
                    <button onClick={ () => scrollToRef(contactRef) } style={ { background: 'none', border: 'none', color: '#d0d4e6', cursor: 'pointer' } }>Contact</button>
                </div>
                <div style={ { width: '100px' } }></div>
            </nav>

            {/* Social Icons Bottom Left */ }
            <div style={ {
                position: 'fixed',
                bottom: '1rem',
                left: '1rem',
                display: 'flex',
                gap: '1rem',
                zIndex: 1000,
            } }>
                <a href="https://www.linkedin.com/in/kavya-shyopura-b262a6272/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={ { color: '#d0d4e6', textDecoration: 'none' } }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4V8zm7 0h3.6v1.7h.05c.5-.95 1.7-1.95 3.5-1.95 3.75 0 4.45 2.5 4.45 5.75V20h-4v-5.5c0-1.3-.03-3-1.85-3-1.85 0-2.13 1.45-2.13 2.9V20h-4V8z" />
                    </svg>
                </a>
                <a href="https://github.com/kavya02shyopura" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={ { color: '#d0d4e6', textDecoration: 'none' } }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.1.823 2.22v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </a>
                <a href="mailto:Kavya02shyopura@gmail.com" aria-label="Email" style={ { color: '#d0d4e6', textDecoration: 'none' } }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                </a>
            </div>

            <div
                ref={ aboutRef }
                onMouseEnter={ () => setHoverAbout(true) }
                onMouseLeave={ () => setHoverAbout(false) }
                style={ {
                    padding: '2rem',
                    backgroundColor: hoverAbout ? '#3a4a7a' : '#283353',
                    maxWidth: '900px',
                    margin: '3rem auto',
                    borderRadius: '10px',
                    boxShadow: hoverAbout ? '0 10px 20px rgba(58,74,122,0.9)' : '0 6px 12px rgba(0,0,0,0.8)',
                    transition: 'all 0.3s ease',
                } }
            >
                <h1 style={ { color: '#f0f4ff' } }>About</h1>
                <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2rem' } }>
                    <img src={ MyPhoto } alt="Profile" style={ { borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', boxShadow: '0 0 15px #1a2a5a' } } />
                    <div style={ { display: 'flex', flexDirection: 'column' } }>
                        <h2 style={ { color: '#d0d4e6' } }>Kavya Shyopura</h2>
                        <p style={ { color: '#c0c4d6' } }>Bio: A fresh engineering graduate excited to begin the career in the Software Engineering, passionate to learn and take on to the new challenges. Looking forward to contributing and developing skills as a part of the team.</p>
                        <p style={ { color: '#c0c4d6' } }>Email: kavya02shyopura@gmail.com</p>
                    </div>
                </div>
            </div>

            <div
                ref={ projectsRef }
                onMouseEnter={ () => setHoverProjects(true) }
                onMouseLeave={ () => setHoverProjects(false) }
                style={ {
                    padding: '2rem',
                    backgroundColor: hoverProjects ? '#3a4a7a' : '#283353',
                    maxWidth: '900px',
                    margin: '2rem auto',
                    borderRadius: '10px',
                    boxShadow: hoverProjects ? '0 10px 20px rgba(58,74,122,0.9)' : '0 6px 12px rgba(0,0,0,0.8)',
                    transition: 'all 0.3s ease',
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
                        <a href="https://github.com/kavya02shyopura" target="_blank" rel="noopener noreferrer">
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
                    padding: '2rem',
                    backgroundColor: hoverContact ? '#3a4a7a' : '#283353',
                    maxWidth: '900px',
                    margin: '2rem auto 4rem auto',
                    borderRadius: '10px',
                    boxShadow: hoverContact ? '0 10px 20px rgba(58,74,122,0.9)' : '0 6px 12px rgba(0,0,0,0.8)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
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
        </div>
    )
}

export default App
