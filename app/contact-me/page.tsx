import styles from './contact.module.scss';
import '../globals.scss'

const ContactMe = () => {
    return (
        <main className={styles.contact_me}>
            <div className={styles.contact_me__inner}>
                <h1>Contact Me</h1>
                <div className={styles.profile}><img src="/profile.jpg" alt="" /></div>
                
                <h3>Hi, my name is Quince Gore-Rodney</h3>
                <h4>Im a Web Developer with a specialisation in immersive web technologies.</h4>
                <p>Ive been working in Web Developement since November 2020, with professional clients undertaking projects
                    with ReactJS, Redux, WebGL, GraphQL and more. <br/><br/> I've been employed in web development commercially for almost 3 years
                    now, but for the past 5 years I have completed multiple complex applications, creating three-dimensional tools
                    & entertainment.
                </p>
                <h4>My achievements include:</h4>
                <ol>
                    <li>More than 2 1/2 years’ experience in Web Development</li>
                    <li>Commercial Mixed Reality and Augmented Reality experience</li>
                    <li>A Creative Technology degree background which includes many of the skills and </li>
                    <li>Experience and qualifications in 3D modelling for WebGL e.g retopology and texture optimisation (Blender, 3ds Max, and Photoshop)</li>
                </ol>

                <p>if you would like to email me, feel free to reach me at <a href="mailto:quince.gore-rodney@hotmail.com">quince.gorerodney@hotmail.com</a></p>

                <p>Or you can find me through one of my social media links:</p>
                <ul className="social-media">
                    <li>
                        <a href="https://www.linkedin.com/in/quince-gore-rodney-41b3081b6/">
                            <img src="/images/svg/linkedin.svg"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/UCNzbjdOHAKSBD-3XRIy2QgA/featured">
                            <img src="/images/svg/youtube.svg"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/spikethea">
                            <img src="/images/svg/github.svg"/>
                        </a>
                    </li>
                </ul>
            </div>
        </main>
    )
}

export default ContactMe;