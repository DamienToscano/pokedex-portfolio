import { useGLTF, Environment, Float, PresentationControls, ContactShadows, Html, Text, OrbitControls, Bounds } from '@react-three/drei'
import { useState, useEffect } from 'react'

export default function Experience() {

    const portfolio = 'https://pokedex-dev.vercel.app/'

    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    const phone = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf')

    const pokeball = useGLTF('./pokeball.glb')

    const [isMobile, setIsMobile] = useState(window.innerWidth < 900)

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 900);
        };

        // Event listener for window resize
        window.addEventListener('resize', updateIsMobile);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', updateIsMobile);
        };
    }, []);

    return <>

        <Environment preset="city" />

        <color attach="background" args={['#241a1a']} />

        {/* <OrbitControls makeDefault /> */}

        <PresentationControls
            // Allow the user to move it from anywhere in the scene
            global
            // Set the initial position
            rotation={
                isMobile
                    ? [-0.1, -0.5, 0]
                    : [0.13, 0.1, 0]
            }
            // Set the limits
            // Vertical limit
            polar={[-0.4, 0.2]}
            // Horizontal limit
            azimuth={[-1, 0.75]}
            // Spring settings
            /* Define how the drag will act */
            config={{ mass: 2, tension: 400 }}
            /* How the object will return to initial position */
            snap={{ mass: 4, tension: 400 }}

        >
            <Float
                rotationIntensity={0.4}
            >
                {/* Make a light so that the screen of the laptop seems to lighten the scene */}
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color="#FFC042"
                    rotation={[0.5, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />
                <Bounds fit clip observe margin={1.2}>
                    <primitive
                        object={isMobile ? phone.scene : computer.scene}
                        position-y={isMobile ? -1.2 : -1.2}
                        scale={isMobile ? 0.6 : 1}
                    >
                        <Html
                            /* Transform the html to match the 3d scene */
                            transform
                            /* Define a wrapper class to use in css */
                            wrapperClass='html-screen'
                            /* Make it farther than the screen */
                            distanceFactor={1.17}
                            position={
                                isMobile
                                    ? [0.17, 1.32, 0.075]
                                    : [0, 1.56, -1.4]
                            }
                            rotation-x={isMobile ? 0 : -0.256}
                        >
                            <iframe
                                src={portfolio}
                            />
                        </Html>
                    </primitive>
                    <Text
                        font='./bangers-v20-latin-regular.woff'
                        fontSize={isMobile ? 0.5 : 0.75}
                        position={
                            isMobile
                                ? [0, 1.2, 0]
                                : [2, 0.75, 0.75]
                        }
                        rotation-y={-0.7}
                        maxWidth={2}
                        textAlign='center'
                    >
                        DAMIEN'S POKEDEX
                    </Text>
                </Bounds>
            </Float>

            {/* Pokeball */}
            <Float>
                <primitive
                    object={pokeball.scene}
                    position={
                        isMobile
                        ? [-1, 0, -0.4]
                        :[3.5, -1.2, 0.5]
                    }
                    scale={ isMobile ? 0.3 : 0.5}
                    rotation={[-0.2, -0.5, 0]}
                />
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />

    </>
}