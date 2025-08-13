import { Player } from '@lottiefiles/react-lottie-player';
import "./style.scss"

interface AiVoiceAssitantProps {
    onClick ?: () => void;
    isSPeaking ?: boolean;
}

export function AiVoiceAssitant({ isSPeaking=true, onClick } : AiVoiceAssitantProps){
    return(
        <div className={`voice-asssitant-container ${isSPeaking ? "speak" : ""}`} onClick={onClick}>
            <div className="blob-voice">
            <Player
                autoplay
                loop
                src="https://lottie.host/5685a641-d486-418a-821a-05cb1f6406ed/QEFc3vi7BE.json"
                style={{ height: '75px', width: '75px' }}
                background='transparent'
                >
             </Player>
            </div>
        </div>
    )
}