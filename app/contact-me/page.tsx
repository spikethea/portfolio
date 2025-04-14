import styles from './contact.module.scss';
import '../globals.scss'

const ContactMe = () => {
    return (
        <main className={styles.contact_me}>
            <div className={styles.contact_me__inner}>
                <h1>Contact Me</h1>
                <div className={styles.grid}>
                <figure className={styles.profile}><img src="/images/profile-picture.jpeg" alt="" /></figure>
                <article>
                    <h3>Nice to meet you, my name is Quince Gore-Rodney.</h3>
                    <h4>Im a Software Developer with a specialisation in immersive technologies.</h4>
                    <p>I have worked within Web Developement since November 2020, undertaking projects with professional clients 
                        using ReactJS, Redux, WebGL, GraphQL and more. <br/><br/> I've been employed in web development commercially for almost 3 years
                        now, but in the past 5 years I have created complex applications utilising complex data manipulation, graphics programming
                        & state management.
                    </p>
                </article>
                </div>
                
                
                <h3>My achievements include:</h3>
                <ol>
                    <li>More than 2.5 years’ experience in Web Development, developing for Start-Ups, medium-sized Enterprise, and Global Professional Services companies</li>
                    <li>Commercial Mixed and Augmented Reality experience</li>
                    <li>A Creative Technology background with Interaction Design, Software Development & Full Stack Development skills</li>
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