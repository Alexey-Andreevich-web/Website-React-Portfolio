import HederMenu from "../components/Heder";
import Footer from "../components/Footer";
import '../styles/Home.css';


function Home() {

    return (
        <div className="home">
            <HederMenu/>
            <p className="bio_text">
                <p className="title">Привет, я Алексей!</p>
                Фронтенд-разработчик, специализируюсь на React, JavaScript и веб-дизайне.
                Стремлюсь создавать удобные и эстетичные интерфейсы.
                Посмотрите мои проекты и свяжитесь со мной, если вам интересно сотрудничество.
            </p>

        </div>
    );
}

export default Home;