import React, { useRef, useState, useEffect } from 'react'
import MyPhoto from './assets/photo/MY_PHOTO_MAIN.jpg'
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

function App() {
    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const projectsRef = useRef(null)
    const blogRef = useRef(null)
    const contactRef = useRef(null)

    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [messages, setMessages] = useState([])
    const [showMessages, setShowMessages] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [showBlogModal, setShowBlogModal] = useState(false)

    // Added missing hover state declarations
    const [hoverAbout, setHoverAbout] = useState(false)
    const [hoverProjects, setHoverProjects] = useState(false)
    const [hoverBlog, setHoverBlog] = useState(false)
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
            const response = await fetch(`http://localhost:5000/api/contact`, {
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
            const response = await fetch(`http://localhost:5000/api/messages`)
            if (response.ok) {
                const data = await response.json()
                setMessages(data)
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    }

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/blogs`)
            if (response.ok) {
                const data = await response.json()
                setBlogs(data)
            }
        } catch (error) {
            console.error('Error fetching blogs:', error)
        }
    }

    const openBlogModal = async (blogId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`)
            if (response.ok) {
                const blog = await response.json()
                setSelectedBlog(blog)
                setShowBlogModal(true)
            }
        } catch (error) {
            console.error('Error fetching blog:', error)
        }
    }

    useEffect(() => {
        fetchMessages()
        fetchBlogs()
    }, [])

    return (
        <div style={ { backgroundColor: '#1a2238', color: '#d0d4e6', minHeight: '100vh', fontFamily: 'Inter, Montserrat, Arial, sans-serif', position: 'relative', overflow: 'hidden' } }>
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
                    { [{ label: 'Home', ref: homeRef }, { label: 'About', ref: aboutRef }, { label: 'Projects', ref: projectsRef }, { label: 'Blog', ref: blogRef }, { label: 'Contact', ref: contactRef }].map((item, idx) => (
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
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    overflow: 'hidden',
                } }
            >
                {/* Gradient overlay for hero section */ }
                <div style={ {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 60% 40%, #6c63ff33 0%, #1a223800 80%)',
                    zIndex: 0,
                } } />
                {/* Removed profile photo and name from Home section */ }
                <h1
                    style={ {
                        fontSize: '3.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #f0f4ff, #6c63ff, #00cfff, #f0f4ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        letterSpacing: '2px',
                        textShadow: '0 4px 24px #1a2238',
                        opacity: 0.98,
                        animation: 'fadeInText 2s 0.2s both',
                        fontFamily: 'Montserrat, Inter, Arial, sans-serif',
                        zIndex: 1,
                    } }
                >
                    Welcome to my profile
                </h1>
                <p style={ { color: '#d0d4e6', fontSize: '1.35rem', marginBottom: '2.5rem', opacity: 0.88, animation: 'fadeInText 2s 0.6s both', zIndex: 1, fontFamily: 'Inter, Arial, sans-serif' } }>
                    Explore my journey, projects, and get in touch!
                </p>
                <button
                    onClick={ () => scrollToRef(aboutRef) }
                    style={ {
                        background: 'linear-gradient(90deg, #6c63ff, #00cfff)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        padding: '0.9rem 2.5rem',
                        fontSize: '1.15rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px #1a2238',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        marginTop: '1.2rem',
                        animation: 'fadeInText 2s 1s both',
                        zIndex: 1,
                        fontFamily: 'Montserrat, Inter, Arial, sans-serif',
                    } }
                >
                    ↓ Scroll to About
                </button>
                {/* Animated scroll indicator */ }
                <div style={ {
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } }>
                    <div style={ {
                        width: '28px',
                        height: '48px',
                        border: '2.5px solid #6c63ff',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        background: 'rgba(26,34,56,0.7)',
                        boxShadow: '0 2px 8px #6c63ff22',
                        marginBottom: '0.5rem',
                    } }>
                        <div className="scroll-dot" style={ {
                            width: '7px',
                            height: '7px',
                            background: '#6c63ff',
                            borderRadius: '50%',
                            margin: '7px auto',
                            animation: 'scrollDot 1.4s infinite',
                        } } />
                    </div>
                    <span style={ { color: '#6c63ff', fontSize: '0.95rem', opacity: 0.7, fontFamily: 'Inter, Arial, sans-serif' } }>Scroll</span>
                </div>
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
                    @keyframes scrollDot {
                        0% { opacity: 0.7; transform: translateY(0); }
                        50% { opacity: 1; transform: translateY(22px); }
                        100% { opacity: 0.7; transform: translateY(0); }
                    }
                `}</style>
            </div>

            <div
                ref={ aboutRef }
                onMouseEnter={ () => setHoverAbout(true) }
                onMouseLeave={ () => setHoverAbout(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2.5rem 2rem',
                    background: 'rgba(44, 62, 112, 0.55)',
                    maxWidth: '1200px',
                    margin: '3rem auto',
                    borderRadius: '22px',
                    boxShadow: hoverAbout ? '0 12px 32px 0 #6c63ff55' : '0 6px 18px 0 #1a223855',
                    transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    transform: hoverAbout ? 'scale(1.025)' : 'scale(1)',
                } }
            >
                <h1 style={ { color: '#f0f4ff', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: '1.2rem' } }>About</h1>
                <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' } }>
                    <img src={ MyPhoto } alt="Profile" style={ { borderRadius: '50%', width: '160px', height: '160px', objectFit: 'cover', boxShadow: '0 0 24px #6c63ff55', border: '4px solid #fff2', transition: 'transform 0.4s', transform: hoverAbout ? 'scale(1.08)' : 'scale(1)' } } />
                    <div style={ { display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'Inter, Arial, sans-serif' } }>
                        <h2 style={ {
                            color: '#6c63ff',
                            fontWeight: 800,
                            fontSize: '2.3rem',
                            margin: 0,
                            background: 'linear-gradient(90deg, #6c63ff, #00cfff, #f0f4ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '2px',
                            fontFamily: 'Montserrat, Arial, sans-serif',
                            textShadow: '0 2px 16px #1a2238',
                            lineHeight: 1.1,
                        } }>
                            Kavya Shyopura
                        </h2>
                        <p style={ { color: '#c0c4d6', margin: 0 } }><span style={ { fontWeight: 600 } }>Bio:</span> Recent engineering graduate with a strong interest in software development, eager to contribute, learn, and grow within a dynamic team environment.</p>
                        <div style={ { display: 'flex', alignItems: 'center', gap: '0.7rem', margin: '0.2rem 0' } }>
                            <span style={ { fontWeight: 600, color: '#c0c4d6' } }>Skills:</span>
                            <span style={ { color: '#d0d4e6', fontWeight: 500, fontSize: '1.08rem' } }>C++</span>
                            <span style={ { color: '#d0d4e6', fontWeight: 500, fontSize: '1.08rem' } }>JavaScript</span>
                            <span style={ { color: '#d0d4e6', fontWeight: 500, fontSize: '1.08rem' } }>Python</span>
                            <span style={ { color: '#d0d4e6', fontWeight: 500, fontSize: '1.08rem' } }>DSA</span>
                            <span style={ { color: '#d0d4e6', fontWeight: 500, fontSize: '1.08rem' } }>Computer Networks</span>
                        </div>
                        <div style={ { display: 'flex', alignItems: 'center', gap: '0.7rem' } }>
                            <span style={ { fontWeight: 600, color: '#c0c4d6' } }>Phone:</span>
                            <a href="tel:+917597974095" style={ { color: '#c0c4d6', textDecoration: 'underline', fontWeight: 500 } }>
                                +91 7597974095
                            </a>
                        </div>
                        <div style={ { display: 'flex', alignItems: 'center', gap: '0.7rem' } }>
                            <span style={ { fontWeight: 600, color: '#c0c4d6' } }>Email:</span>
                            <a href="mailto:kavya02shyopura@gmail.com" style={ { color: '#c0c4d6', textDecoration: 'underline', fontWeight: 500 } }>
                                kavya02shyopura@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={ projectsRef }
                onMouseEnter={ () => setHoverProjects(true) }
                onMouseLeave={ () => setHoverProjects(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2.5rem 2rem',
                    background: 'rgba(44, 62, 112, 0.55)',
                    maxWidth: '1200px',
                    margin: '2rem auto',
                    borderRadius: '22px',
                    boxShadow: hoverProjects ? '0 12px 32px 0 #00cfff55' : '0 6px 18px 0 #1a223855',
                    transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    transform: hoverProjects ? 'scale(1.025)' : 'scale(1)',
                } }
            >
                <h1 style={ { color: '#f0f4ff', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: '1.2rem' } }>Projects</h1>
                <div style={ { display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' } }>
                    {/* Project Card 1 */ }
                    <div style={ {
                        background: 'rgba(108,99,255,0.13)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 18px #6c63ff22',
                        padding: '1.5rem 1.2rem',
                        minWidth: '260px',
                        maxWidth: '340px',
                        flex: '1 1 260px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        transition: 'transform 0.25s, box-shadow 0.25s',
                        border: '1.5px solid #6c63ff33',
                        position: 'relative',
                    } } className="project-card">
                        <span style={ { fontSize: '2.1rem', color: '#6c63ff' } }>🤖</span>
                        <h2 style={ { color: '#d0d4e6', fontWeight: 600, fontSize: '1.18rem', margin: 0 } }>Emotion recognition using text</h2>
                        <a href="https://github.com/kavya02shyopura/Emotion-detection-python" target="_blank" rel="noopener noreferrer">
                            <button style={ { padding: '0.5rem 1.1rem', background: 'linear-gradient(90deg,#6c63ff,#00cfff)', color: 'white', border: 'none', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter,Arial', fontSize: '1rem', boxShadow: '0 2px 8px #6c63ff22', transition: 'background 0.2s' } }>
                                View Project
                            </button>
                        </a>
                    </div>
                    {/* Project Card 2 */ }
                    <div style={ {
                        background: 'rgba(0,207,255,0.13)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 18px #00cfff22',
                        padding: '1.5rem 1.2rem',
                        minWidth: '260px',
                        maxWidth: '340px',
                        flex: '1 1 260px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        transition: 'transform 0.25s, box-shadow 0.25s',
                        border: '1.5px solid #00cfff33',
                        position: 'relative',
                    } } className="project-card">
                        <span style={ { fontSize: '2.1rem', color: '#00cfff' } }>🌐</span>
                        <h2 style={ { color: '#d0d4e6', fontWeight: 600, fontSize: '1.18rem', margin: 0 } }>Portfolio</h2>
                        <a href="https://github.com/kavya02shyopura/Portfolio" target="_blank" rel="noopener noreferrer">
                            <button style={ { padding: '0.5rem 1.1rem', background: 'linear-gradient(90deg,#00cfff,#6c63ff)', color: 'white', border: 'none', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter,Arial', fontSize: '1rem', boxShadow: '0 2px 8px #00cfff22', transition: 'background 0.2s' } }>
                                View Project
                            </button>
                        </a>
                    </div>
                </div>
                <style>{ `
                    .project-card:hover {
                        transform: translateY(-8px) scale(1.035);
                        box-shadow: 0 8px 32px #6c63ff44, 0 2px 8px #00cfff33;
                    }
                `}</style>
            </div>

            <div
                ref={ blogRef }
                onMouseEnter={ () => setHoverBlog(true) }
                onMouseLeave={ () => setHoverBlog(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2.5rem 2rem',
                    background: 'rgba(44, 62, 112, 0.55)',
                    maxWidth: '1200px',
                    margin: '2rem auto',
                    borderRadius: '22px',
                    boxShadow: hoverBlog ? '0 12px 32px 0 #6c63ff55' : '0 6px 18px 0 #1a223855',
                    transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    transform: hoverBlog ? 'scale(1.025)' : 'scale(1)',
                } }
            >
                <h1 style={ { color: '#f0f4ff', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: '1.2rem' } }>Blog</h1>
                <div style={ { display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' } }>
                    { blogs.map((blog, index) => (
                        <div key={ blog.id } style={ {
                            background: 'rgba(108,99,255,0.13)',
                            borderRadius: '16px',
                            boxShadow: '0 4px 18px #6c63ff22',
                            padding: '1.5rem 1.2rem',
                            minWidth: '280px',
                            maxWidth: '380px',
                            flex: '1 1 280px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            transition: 'transform 0.25s, box-shadow 0.25s',
                            border: '1.5px solid #6c63ff33',
                            position: 'relative',
                            cursor: 'pointer',
                        } } className="blog-card" onClick={ () => openBlogModal(blog.id) }>
                            <div style={ { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' } }>
                                <span style={ { fontSize: '1.2rem', color: '#6c63ff' } }>📝</span>
                                <span style={ { color: '#6c63ff', fontSize: '0.9rem', fontWeight: 600, backgroundColor: 'rgba(108,99,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '12px' } }>{ blog.category }</span>
                            </div>
                            <h2 style={ { color: '#d0d4e6', fontWeight: 600, fontSize: '1.18rem', margin: 0, lineHeight: '1.4' } }>{ blog.title }</h2>
                            <p style={ { color: '#b0b4c6', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' } }>{ blog.excerpt }</p>
                            <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto' } }>
                                <span style={ { color: '#6c63ff', fontSize: '0.85rem', fontWeight: 500 } }>{ blog.date_posted }</span>
                                <span style={ { color: '#00cfff', fontSize: '0.85rem', fontWeight: 500 } }>{ blog.read_time }</span>
                            </div>
                        </div>
                    )) }
                </div>
                <style>{ `
                    .blog-card:hover {
                        transform: translateY(-8px) scale(1.035);
                        box-shadow: 0 8px 32px #6c63ff44, 0 2px 8px #00cfff33;
                    }
                `}</style>
            </div>

            {/* Blog Modal */ }
            { showBlogModal && selectedBlog && (
                <div style={ {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000,
                    padding: '2rem',
                } } onClick={ () => setShowBlogModal(false) }>
                    <div style={ {
                        background: 'rgba(44, 62, 112, 0.95)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        maxWidth: '800px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        position: 'relative',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid #6c63ff33',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    } } onClick={ (e) => e.stopPropagation() }>
                        <button onClick={ () => setShowBlogModal(false) } style={ {
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            color: '#d0d4e6',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            transition: 'background 0.2s',
                        } }>✕</button>

                        <div style={ { marginBottom: '1.5rem' } }>
                            <div style={ { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' } }>
                                <span style={ { fontSize: '1.2rem', color: '#6c63ff' } }>📝</span>
                                <span style={ { color: '#6c63ff', fontSize: '0.9rem', fontWeight: 600, backgroundColor: 'rgba(108,99,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '12px' } }>{ selectedBlog.category }</span>
                            </div>
                            <h1 style={ { color: '#f0f4ff', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' } }>{ selectedBlog.title }</h1>
                            <div style={ { display: 'flex', gap: '1rem', marginBottom: '1.5rem' } }>
                                <span style={ { color: '#6c63ff', fontSize: '0.9rem', fontWeight: 500 } }>{ selectedBlog.date_posted }</span>
                                <span style={ { color: '#00cfff', fontSize: '0.9rem', fontWeight: 500 } }>{ selectedBlog.read_time }</span>
                            </div>
                        </div>

                        <div style={ {
                            color: '#d0d4e6',
                            fontSize: '1.05rem',
                            lineHeight: '1.7',
                            textAlign: 'justify'
                        } }>
                            { selectedBlog.content.split('\n').map((paragraph, index) => (
                                <p key={ index } style={ { marginBottom: '1rem' } }>{ paragraph }</p>
                            )) }
                        </div>
                    </div>
                </div>
            ) }

            <div
                ref={ contactRef }
                onMouseEnter={ () => setHoverContact(true) }
                onMouseLeave={ () => setHoverContact(false) }
                style={ {
                    scrollMarginTop: '90px',
                    padding: '2.5rem 2rem',
                    background: 'rgba(44, 62, 112, 0.55)',
                    maxWidth: '1200px',
                    margin: '2rem auto 4rem auto',
                    borderRadius: '22px',
                    boxShadow: hoverContact ? '0 12px 32px 0 #00cfff55' : '0 6px 18px 0 #1a223855',
                    position: 'relative',
                    transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                    backdropFilter: 'blur(12px)',
                    transform: hoverContact ? 'scale(1.025)' : 'scale(1)',
                } }
            >
                <h1 style={ { color: '#f0f4ff', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: '1.2rem' } }>Contact</h1>
                <form onSubmit={ handleSubmit } style={ { display: 'flex', flexDirection: 'column', gap: '1.1rem', fontFamily: 'Inter, Arial, sans-serif' } }>
                    <div style={ { display: 'flex', alignItems: 'center', gap: '0.7rem' } }>
                        <span style={ { fontSize: '1.2rem', color: '#6c63ff' } }>👤</span>
                        <input type="text" name="name" placeholder="Name" value={ formData.name } onChange={ handleInputChange } required style={ { flex: 1, padding: '0.7rem', borderRadius: '7px', border: '1.5px solid #6c63ff44', backgroundColor: '#232e4a', color: '#d0d4e6', fontSize: '1rem', fontFamily: 'inherit', outline: 'none', transition: 'border 0.2s' } } />
                    </div>
                    <div style={ { display: 'flex', alignItems: 'center', gap: '0.7rem' } }>
                        <span style={ { fontSize: '1.2rem', color: '#00cfff' } }>✉️</span>
                        <input type="email" name="email" placeholder="Email" value={ formData.email } onChange={ handleInputChange } required style={ { flex: 1, padding: '0.7rem', borderRadius: '7px', border: '1.5px solid #00cfff44', backgroundColor: '#232e4a', color: '#d0d4e6', fontSize: '1rem', fontFamily: 'inherit', outline: 'none', transition: 'border 0.2s' } } />
                    </div>
                    <div style={ { display: 'flex', alignItems: 'flex-start', gap: '0.7rem' } }>
                        <span style={ { fontSize: '1.2rem', color: '#6c63ff', marginTop: '0.3rem' } }>💬</span>
                        <textarea name="message" placeholder="Message" value={ formData.message } onChange={ handleInputChange } required rows={ 4 } style={ { flex: 1, padding: '0.7rem', borderRadius: '7px', border: '1.5px solid #6c63ff44', backgroundColor: '#232e4a', color: '#d0d4e6', fontSize: '1rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border 0.2s' } } />
                    </div>
                    <button type="submit" style={ { padding: '0.7rem 1.5rem', background: 'linear-gradient(90deg,#6c63ff,#00cfff)', color: 'white', border: 'none', borderRadius: '9px', cursor: 'pointer', fontWeight: 600, fontFamily: 'Montserrat,Inter,Arial', fontSize: '1.08rem', boxShadow: '0 2px 8px #6c63ff22', transition: 'background 0.2s, transform 0.2s', alignSelf: 'flex-end' } }>Send</button>
                </form>
                { showMessages && (
                    <div style={ { marginTop: '2.5rem' } }>
                        <h2 style={ { color: '#f0f4ff', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: '1.3rem', marginBottom: '1.1rem' } }>Messages</h2>
                        <ul style={ { listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' } }>
                            { messages.map((msg, index) => (
                                <li key={ index } style={ { background: 'rgba(44,62,112,0.55)', padding: '1.1rem', borderRadius: '14px', color: '#d0d4e6', boxShadow: '0 2px 8px #6c63ff22', border: '1.5px solid #6c63ff22', fontFamily: 'Inter,Arial', display: 'flex', flexDirection: 'column', gap: '0.3rem', transition: 'box-shadow 0.2s' } }>
                                    <span style={ { fontWeight: 600, color: '#6c63ff', fontSize: '1.05rem' } }>👤 { msg.name }</span>
                                    <span style={ { fontWeight: 500, color: '#00cfff', fontSize: '0.98rem' } }>✉️ { msg.email }</span>
                                    <span style={ { color: '#d0d4e6', fontSize: '1.01rem' } }>💬 { msg.message }</span>
                                </li>
                            )) }
                        </ul>
                    </div>
                ) }
            </div>
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
                    { ['Home', 'About', 'Projects', 'Blog', 'Contact'].map((label, idx) => (
                        <button
                            key={ label }
                            onClick={ () => {
                                if (label === 'Home') scrollToRef(homeRef);
                                if (label === 'About') scrollToRef(aboutRef);
                                if (label === 'Projects') scrollToRef(projectsRef);
                                if (label === 'Blog') scrollToRef(blogRef);
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
                {/* Show Messages button moved to bottom right of footer */ }
                <button onClick={ () => setShowMessages(!showMessages) } style={ { position: 'absolute', right: '1.5rem', bottom: '1.2rem', padding: '0.6rem 1rem', backgroundColor: '#1a2a5a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', zIndex: 1000, boxShadow: '0 2px 8px #6c63ff22', fontWeight: 600, fontFamily: 'Inter, Arial, sans-serif', fontSize: '1rem', transition: 'background 0.2s' } }>
                    { showMessages ? 'Hide Messages' : 'Show Messages' }
                </button>
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
