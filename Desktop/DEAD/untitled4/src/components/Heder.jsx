import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/Heder.css';

export default function HederMenu(){
    return (
        <div className="HederMenu">
            <Link to="/" >Главная</Link>
            <Link to="/About">Обо мне</Link>
            <Link to="/Portfolio">Мое портфолио</Link>
            <Link to="/Contacts">Контакты</Link>
        </div>
    )
}